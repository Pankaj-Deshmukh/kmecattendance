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

// 245522748075
// 2022199 - cse
// 2022392 - csm
export async function GET(req:Request){
    let rollno:number = 0;
    const orgRollno = req.headers.get('rollno');
    if(Number(orgRollno?.substring(6,9))===748){
        rollno = 2022392 + Number(orgRollno?.substring(9,12));
    }
    else if(Number(orgRollno?.substring(6,9))===733){
        rollno = 2022199 + Number(orgRollno?.substring(9,12));
    }
    else{
        console.error("Enter a valid Roll number.");
    }
    try{
        const res:AttendanceResponse = await axios.post(`http://teleuniv.net.in:81/netra/api.php`,{
            method: 314,
            rollno
        });
        return NextResponse.json(res.data.overallattperformance.totalpercentage);
    }
    catch(e){
        console.error(e);
    }
}
