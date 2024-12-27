// TermsOfService.js

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        These Terms of Service govern your use of our website. By accessing or using our services, you agree to be bound by these terms. Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
      <ul className="list-disc ml-6 text-sm mb-4">
        <li>You must not use this platform for any unlawful or inappropriate purposes.</li>
        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>You agree not to misuse our services or interfere with their operation.</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Limitations of Liability</h2>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        We are not liable for any damages resulting from your use of our services. This includes, but is not limited to, data loss, service interruptions, or unauthorized access.
      </p>
      <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
      <p className="text-gray-700 text-sm leading-relaxed">
        We reserve the right to update these terms at any time. Continued use of the website after changes are made constitutes acceptance of the new terms.
      </p>
    </div>
  );
};

export default TermsOfService;
