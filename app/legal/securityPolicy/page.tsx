"use client";
// Security.js
import PasswordPopup from "@/app/components/PasswordPopup";
import { useState } from "react";

const Security = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [erasebtn, setErasebtn] = useState<String>("Erase Password");
  const onClose = () => {
    setPopup(false);
  };
  const onSubmit = (password: string) => {
    localStorage.setItem("pwd", password);
    setPopup(false);
    setErasebtn("Erase Password");
  };
  const onErase = () => {
    localStorage.removeItem("pwd");
    setErasebtn("Erased ✔️");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Security</h1>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        Security is a top priority for us. This page outlines the measures we
        take to protect your information and ensure a secure user experience.
      </p>
      <h2 className="text-xl font-semibold mb-2">Our Security Practices</h2>
      <ul className="list-disc ml-6 text-sm mb-4">
        <li>
          Encryption: All sensitive data is encrypted using industry-standard
          methods.
        </li>
        <li>
          Regular Audits: We conduct regular security assessments to identify
          and mitigate risks.
        </li>
        <li>
          Access Control: Only authorized personnel have access to sensitive
          information.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">How You Can Stay Safe</h2>
      <p className="text-gray-700 text-sm leading-relaxed">
        Protect your account by using strong passwords and avoiding sharing
        sensitive information in insecure environments. Contact us immediately
        if you suspect any security breaches.
      </p>
      <button className="p-1 bg-blue-100" onClick={() => setPopup(true)}>
        set password in localstorage
      </button>
      {popup && <PasswordPopup onClose={onClose} onSubmit={onSubmit} />}
      <button
        className="p-1 bg-gray-200 border border-gray-400"
        onClick={onErase}
      >
        {erasebtn}
      </button>
    </div>
  );
};

export default Security;
