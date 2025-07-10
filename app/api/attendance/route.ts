import axios from "axios";
import { NextResponse } from "next/server";

interface AttendanceResponse {
  data: {
    attendance: {
      dayobjects: Array<{
        day?: string;
        date: string;
        sessions?: Record<string, string>;
      }>;
      twoweeksessions: {
        present: number;
        absent: number;
        nosessions: number;
      };
    };
    overallattperformance: {
      totalpercentage: number;
    };
  };
}

// 245522748075
// cs 2nd year 245523753001 63
// 2022199 - cse 3rd year 193
// 2022392 - csm 3rd year 128
// 2022530 - cse 2nd year 193
// 2022723 - csm 2nd year 128
// 2022849 - cs  2nd year  ?
// 2023071 - cse 1st year 256
// 2022944 - csm 1st year 128  ???

export async function GET(req: Request) {
  let rollno: number = 0;
  const orgRollno = req.headers.get("rollno");
  const password = req.headers.get("pwd");
  if (
    orgRollno === "245522748075" ||
    orgRollno === "245522748073" ||
    orgRollno === "245522748115"
  ) {
    if (password !== process.env.PASSWORD)
      return NextResponse.json(
        {
          error: `Something went wrong while fetching attendance for :${orgRollno}`,
        },
        { status: 500 }
      );
  }
  if (Number(orgRollno?.substring(4, 6)) == 22) {
    if (Number(orgRollno?.substring(6, 9)) === 748) {
      rollno = 2022392 + Number(orgRollno?.substring(9, 12));
    } else if (Number(orgRollno?.substring(6, 9)) === 733) {
      rollno = 2022199 + Number(orgRollno?.substring(9, 12));
    } else {
      console.error("Enter a valid Roll number.");
    }
  } else if (Number(orgRollno?.substring(4, 6)) === 23) {
    if (Number(orgRollno?.substring(6, 9)) === 748) {
      rollno = 2022723 + Number(orgRollno?.substring(9, 12));
    } else if (Number(orgRollno?.substring(6, 9)) === 733) {
      rollno = 2022530 + Number(orgRollno?.substring(9, 12));
    } else if (Number(orgRollno?.substring(6, 9)) === 753) {
      rollno = 2022849 + Number(orgRollno?.substring(9, 12));
    } else {
      console.error("Enter a valid Roll number.");
    }
  } else if (Number(orgRollno?.substring(4, 6)) === 24) {
    if (Number(orgRollno?.substring(6, 9)) === 733) {
      rollno = 2023071 + Number(orgRollno?.substring(9, 12));
    } else if (Number(orgRollno?.substring(6, 9)) === 748) {
      rollno = 2022943 + Number(orgRollno?.substring(9, 12));
    } else {
      console.error("Enter a valid Roll number.");
    }
  } else console.error("Enter a valid Roll number.");

  try {
    const res: AttendanceResponse = await axios.post(
      `${process.env.ATTENDANCE_URI}`,
      {
        method: 314,
        rollno,
      }
    );
    return NextResponse.json(res.data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
