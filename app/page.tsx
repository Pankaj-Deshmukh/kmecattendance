'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import InputBox from "./components/InputBox";

export default function Home() {
  const [attendance, setAttendance] = useState<number>(0); // Ensure type is a number
  const [rollno, setRollno] = useState<string | null>(null); // State for storing rollno

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
          setAttendance(res.data); // Set attendance from API response
        } catch (err) {
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
      {rollno && <Counter targetNumber={attendance} duration={1500} rollnumber={rollno} />}
      {!rollno && <Counter targetNumber={0} duration={1500} rollnumber={"Enter your Roll number."} />}
      <p className="text-center font-thin font-sans">
        powered by <strong className="font-semibold text-red-600">Pankaj Deshmukh</strong>.
      </p>
    </div>
  );
}
