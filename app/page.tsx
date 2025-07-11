"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceTable from "./components/AttendanceTable";
import Counter from "./components/Counter";
import Footer from "./components/Footer";
import InputBox from "./components/InputBox";
import "./globals.css";
import SubjectAttendanceTable from "./components/SubjectAttendanceTable";

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

interface Subject {
  subjectname: string;
  percentage: number | string;
  practical: number | string;
  colorcode1: string | null;
  colorcode2: string | null;
}

export default function Home() {
  const [attendance, setAttendance] = useState<number>(0);
  const [rollno, setRollno] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [session, setSession] = useState<DayObject[]>([]);
  const [subAttendance, setSubAttendance] = useState<Subject[]>([]);

  useEffect(() => {
    // Initialize rollno from localStorage
    const storedRollno = localStorage.getItem("rollno");
    const password = localStorage.getItem("pwd");
    if (storedRollno) {
      setRollno(storedRollno);
      setPwd(password);
    }
  }, [rollno]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("/api/attendance", {
          headers: { rollno, pwd },
        });

        const data = res.data;
        if (data?.overallattperformance && data?.attandance?.dayobjects) {
          setAttendance(data.overallattperformance.totalpercentage);
          setSession(data.attandance.dayobjects);
          setSubAttendance(data.overallattperformance.overall);
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

    if (rollno) {
      fetchAttendance();
    }
  }, [rollno]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50 mx-auto">
      <h1 className="text-center font-thin mt-2 mb-2 bg-gray-100 text-gray-700 pb-1 border-b border-gray-300">
        Keshav Memorial Engineering College Attendance Tracker!
      </h1>
      <InputBox setRollno={setRollno} />
      {rollno && <AttendanceTable data={session} />}
      {rollno && <SubjectAttendanceTable overall={subAttendance} />}
      {rollno && (
        <Counter
          targetNumber={attendance}
          duration={1000}
          rollnumber={rollno}
        />
      )}
      {!rollno && (
        <Counter
          targetNumber={100}
          duration={0}
          rollnumber={"Enter your Roll number."}
        />
      )}
      <p className="text-center font-thin font-sans">
        <a href="https://www.linkedin.com/in/pankaj-deshmukh-142573329/">
          powered by{" "}
          <strong className="font-semibold text-red-600">
            Pankaj Deshmukh
          </strong>
          .
        </a>
      </p>
      <Footer />
    </div>
  );
}
