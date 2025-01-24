'use client';
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttendanceTable from "./components/AttendanceTable";
import Counter from "./components/Counter";
import Footer from "./components/Footer";
import InputBox from "./components/InputBox";
import './globals.css';

interface SessionData {
  session1: "0" | "1" | "2";
  session2: "0" | "1" | "2";
  session3: "0" | "1" | "2";
  session4: "0" | "1" | "2";
  session5: "0" | "1" | "2";
  session6: "0" | "1" | "2";
  session7: "0" | "1" | "2";
}

interface DayObject {
  day?: string;
  date: string;
  updatedon?: string;
  holiday: "true" | "false";
  sessions: SessionData;
}

interface Quote {
  q: string,
  a: string,
  h: string
}


export default function Home() {
  const [attendance, setAttendance] = useState<number>(0);
  const [adminRollno, setAdminRollno] = useState<string | null>(null);
  const [rollno, setRollno] = useState<string | null>(null);
  const [displayRollno, setDisplayRollno] = useState<string | null>(null);
  const [session, setSession] = useState<DayObject[] | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize rollno from localStorage
    const storedRollno = localStorage.getItem("rollno");
    if (storedRollno) {
      setRollno(storedRollno);
      setDisplayRollno(storedRollno); // Use the value directly
    }
    // Extract and set adminRollno from searchParams
    const admin = searchParams.get('admin');
    if (admin){
      setAdminRollno(admin);
      setDisplayRollno(`245522748${admin}`)
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const targetRollno = adminRollno ? `245522748${adminRollno}` : rollno;
        const apiEndpoint = adminRollno ? "/api/adminAttendance" : "/api/attendance";
        const res = await axios.get(apiEndpoint, {
          headers: { rollno: targetRollno },
        });

        const data = res.data;
        if (data?.overallattperformance && data?.attandance?.dayobjects) {
          setAttendance(data.overallattperformance.totalpercentage);
          setSession(data.attandance.dayobjects);
        } else {
          console.warn("API response missing expected fields:", data);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 500) {
          alert(error.response.data.error);
        } else {
          console.error("Error fetching attendance:", error);
        }
      }
    };

    if (rollno || adminRollno) {
      fetchAttendance();
    }
  }, [rollno, adminRollno]);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.get("/api/quote");
        if (Array.isArray(res.data) && res.data[0]) {
          setQuote(res.data[0]);
        }
      } catch (error) {
        console.error("Error occurred while fetching the quote:", error);
      }
    };

    getQuote();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <h1 className="text-center font-thin mt-2 mb-2 bg-gray-100 text-gray-700 pb-1 border-b border-gray-300">
        Keshav Memorial Engineering College Attendance Tracker!
      </h1>
      <InputBox />
      {rollno && <AttendanceTable data={session} />}
      {rollno && <Counter targetNumber={attendance} duration={1000} rollnumber={displayRollno} />}
      {!rollno && <Counter targetNumber={100} duration={0} rollnumber={"Enter your Roll number."} />}
      {quote && <p className="text-center text-lg font-semibold mb-3">&quot;{quote.q}&quot; – <span className="font-light">{quote.a}</span></p>}
      <p className="text-center font-thin font-sans mt-5">
        <a href="https://www.linkedin.com/in/pankaj-deshmukh-142573329/">
          powered by <strong className="font-semibold text-red-600">Pankaj Deshmukh</strong>.
        </a>
      </p>
      <Footer />
    </div>
  );
}
