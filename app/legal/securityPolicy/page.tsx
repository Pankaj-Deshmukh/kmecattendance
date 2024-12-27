// Security.js

const Security = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Security</h1>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        Security is a top priority for us. This page outlines the measures we take to protect your information and ensure a secure user experience.
      </p>
      <h2 className="text-xl font-semibold mb-2">Our Security Practices</h2>
      <ul className="list-disc ml-6 text-sm mb-4">
        <li>Encryption: All sensitive data is encrypted using industry-standard methods.</li>
        <li>Regular Audits: We conduct regular security assessments to identify and mitigate risks.</li>
        <li>Access Control: Only authorized personnel have access to sensitive information.</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">How You Can Stay Safe</h2>
      <p className="text-gray-700 text-sm leading-relaxed">
        Protect your account by using strong passwords and avoiding sharing sensitive information in insecure environments. Contact us immediately if you suspect any security breaches.
      </p>
    </div>
  );
};

export default Security;
