'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceTable from "./components/AttendanceTable";
import Counter from "./components/Counter";
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
  const [attendance, setAttendance] = useState<number>(0); // Ensure type is a number
  const [rollno, setRollno] = useState<string | null>(null); // State for storing rollno
  const [session, setSession] = useState<DayObject[] | null>(null); // state for storing session data
  const [quote, setQuote] = useState<Quote | null>(null); // state for storing the generated quote
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Check for rollno after the component mounts
    const storedRollno = localStorage.getItem("rollno");
    if (storedRollno) {
      setRollno(storedRollno); // Set rollno in state
    }
  }, []); // This will run only once after the component mounts

  useEffect(() => {
    if (rollno) {
      const fetchAttendance = async () => {
        try {
          const res = await axios.get("/api/attendance", {
            headers: {
              rollno,
            },
          });
          setAttendance(res.data.overallattperformance.totalpercentage); // Set attendance from API response
          setSession(res.data.attandance.dayobjects);
        } catch (err) {
          alert("Your Class data will be available soon. Try later :)");
          console.error("Error fetching attendance:", err);
        }
      };
      fetchAttendance();
    }
    setIsClient(true);
  }, [rollno]);

  useEffect(()=>{
    if (isClient) {
      const getQuote = async () => {
        try {
          const res = await axios.get("/api/quote");
          setQuote(res.data[0]); // Set quote from API response
          console.log(res.data[0]);
        } catch (error) {
          console.error("Error occurred while fetching the quote:", error);
        }
      };
      getQuote();
    }
  }, [isClient, rollno]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <h1 id="caveat" className="text-center font-bold mt-2 mb-3">Welcome to Keshav Memorial Engineering College Attendance Tracker!</h1>
      <InputBox />
      {/* Only render Counter once rollno is available */}
      {rollno && <AttendanceTable data={session}/>}
      {rollno && <Counter targetNumber={attendance} duration={1500} rollnumber={rollno} />}
      {!rollno && <Counter targetNumber={0} duration={1500} rollnumber={"Enter your Roll number."} />}
      {quote && <p className="text-center text-lg font-semibold mb-3"> &quot;{quote.q}&quot; &ndash; <span className="font-light">{quote.a}</span></p>}
      <p className="text-center font-thin font-sans mt-5">
        <a href="https://www.linkedin.com/in/pankaj-deshmukh-142573329/">
          powered by <strong className="font-semibold text-red-600">Pankaj Deshmukh</strong>.
        </a>
      </p>
    </div>
  );
}
