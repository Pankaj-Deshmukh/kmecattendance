"use client";

import 'react-circular-progressbar/dist/styles.css';

export default function Attendance() {
  const handleSubmit = (formData:FormData) => {
    const rollno = formData.get("rollno") as string;

    const errors = {
      rollno: ""
    };

    // Validate rollno number
    if (!/^\d{12}$/.test(rollno)) {
      errors.rollno = "Enter a valid 12-digit roll number";
    }

    // Check if there are errors before proceeding
    if (errors.rollno) {
      console.log("Validation errors:", errors);
      return;
    }

    // Process form data
    localStorage.setItem("rollno", rollno);
    window.location.reload();
  };

  return (
    <form action={handleSubmit} className="flex justify-between p-1 w-fit mx-auto border rounded top-2 right-2 shadow-[-3px_3px_10px_rgba(0,0,0,0.1)] bg-gray-50">
            <input
                type="text"
                name="rollno"
                placeholder="enter your roll no."
                className="p-1 border rounded bg-gray-50"
                required
                pattern="\d{12}"
                title="Enter a valid 12-digit rollno number"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                GET
            </button>
        </form>
  );
}
