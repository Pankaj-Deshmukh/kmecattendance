'use client'
import Image from "next/image";
import React, { useState } from "react";

type SessionData = {
  date: string;
  holiday: string;
  sessions: {
    session1: string;
    session2: string;
    session3: string;
    session4: string;
    session5: string;
    session6: string;
    session7: string;
  };
};

type Props = {
  data: SessionData[] | null;
};

const AttendanceTable: React.FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const renderSessionIcon = (session: string) => {
    switch (session) {
      case "0":
        return (
          <span className="text-red-500">
            <Image
              src="/cross.png"
              width={20}
              height={20}
              alt="✖️"
            />
          </span>
        ); // Red cross
      case "1":
        return (
          <span className="text-green-500">
            <Image
              src="/check.png"
              width={23}
              height={23}
              alt="✔️"
            />
          </span>
        ); // Green tick
      case "2":
        return (
          <span className="text-gray-500">
            <Image
              src="/empty.png"
              width={20}
              height={20}
              alt="o"
            />
          </span>
        ); // Gray circle
      default:
        return <span>?</span>;
    }
  };

  if (!data) {
    return <div className="flex w-screen justify-center items-center mt-4">Loading...</div>; // Show loading state if data is null
  }

  return (
    <div className="mx-auto p-4">
      <div className="max-w-sm overflow-hidden shadow-lg bg-white">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Sessions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dayObject, index) =>
              index === 0 || expanded ? (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                  onClick={() => index === 0 && setExpanded(!expanded)} // Toggle visibility on first row click
                >
                  {/* Date Column */}
                  <td className="border-b border-r border-gray-300 px-4 py-2 font-medium cursor-pointer truncate">
                    {dayObject.date}
                  </td>

                  {/* Sessions Column */}
                  <td className="flex justify-around border-b border-gray-300 px-4 py-3">
                    {Object.values(dayObject.sessions).map((session, i) => (
                      <span key={i} className="mr-2">
                        {renderSessionIcon(session)}
                      </span>
                    ))}
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

export default AttendanceTable;
