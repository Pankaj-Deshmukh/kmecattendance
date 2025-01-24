import axios from "axios";
import { NextResponse } from "next/server";

interface AttendanceResponse {
    data:{
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
    }
}

export async function GET(req:Request){
    let rollno:number = 0;
    const orgRollno = req.headers.get('rollno');
    if(Number(orgRollno?.substring(4,6))==22){
        if(Number(orgRollno?.substring(6,9))===748){
            rollno = 2022392 + Number(orgRollno?.substring(9,12));
        }
        else{
            console.error("Enter a valid Roll number.");
        }
    }
    try{
        const res:AttendanceResponse = await axios.post(`${process.env.ATTENDANCE_URI}`,{
            method: 314,
            rollno
        });
        return NextResponse.json(res.data);
    }
    catch(e){
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
