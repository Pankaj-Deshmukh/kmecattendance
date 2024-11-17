'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceTable from "./components/AttendanceTable";
import Counter from "./components/Counter";
import InputBox from "./components/InputBox";

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


export default function Home() {
  const [attendance, setAttendance] = useState<number>(0); // Ensure type is a number
  const [rollno, setRollno] = useState<string | null>(null); // State for storing rollno
  const [session, setSession] = useState<DayObject[] | null>(null); // state for storing session data

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
  }, [rollno]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <InputBox />
      {/* Only render Counter once rollno is available */}
      {rollno && <AttendanceTable data={session}/>}
      {rollno && <Counter targetNumber={attendance} duration={1500} rollnumber={rollno} />}
      {!rollno && <Counter targetNumber={0} duration={1500} rollnumber={"Enter your Roll number."} />}
      <p className="text-center font-thin font-sans">
        powered by <strong className="font-semibold text-red-600">Pankaj Deshmukh</strong>.
      </p>
    </div>
  );
}
