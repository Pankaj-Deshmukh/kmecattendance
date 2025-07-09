"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Subject {
  subjectname: string;
  percentage: number | string;
  practical: number | string;
  colorcode1: string | null;
  colorcode2: string | null;
}

interface AttendanceData {
  overall: Subject[];
}

const SubjectAttendanceTable: React.FC<AttendanceData> = ({ overall }) => {
  const [expanded, setExpanded] = useState(false);

  if (!overall) {
    return (
      <div className="flex w-screen justify-center items-center mt-4">
        Loading...
      </div>
    ); // Show loading state if data is null
  }

  return (
    <div className="mx-auto">
      <div className="max-w-sm overflow-hidden shadow-lg bg-white">
        <button
          className="bg-gray-50 border border-gray-300 px-20 py-2 text-center"
          onClick={() => setExpanded(!expanded)} // Toggle visibility on first row click
        >
          Subject-Wise Attendance
        </button>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            {expanded ? (
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Subject
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Percentage
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Practical
                </th>
              </tr>
            ) : null}
          </thead>
          <tbody>
            {overall.map((subject, index) =>
              expanded ? (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  {/* name Column */}
                  <td className="border-b border-r border-gray-300 px-2 py-2 font-medium cursor-pointer truncate">
                    {subject.subjectname}
                  </td>

                  {/* Percentage Column */}
                  <td
                    className="text-center border-r border-b border-gray-300 py-2"
                    style={{ color: subject.colorcode1 || "#000" }}
                  >
                    {subject.percentage}
                  </td>

                  {/* Practicle column */}
                  <td
                    className="text-center border-b border-gray-300 py-2"
                    style={{ color: subject.colorcode2 || "#000" }}
                  >
                    {subject.practical}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectAttendanceTable;
