// PrivacyPolicy.js

const PrivacyPolicy = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          Welcome to our Privacy Policy page. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy or our practices, please contact us.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with the terms of this policy, please do not use our website.
        </p>
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6 text-sm mb-4">
          <li>Personal Data: Includes user provided Roll Number and other information provided to us voluntarily.</li>
          <li>Usage Data: Automatically collected information such as your IP address, browser type, and website interactions.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-6 text-sm mb-4">
          <li>To provide and maintain our services.</li>
          <li>To improve the user experience and website functionality.</li>
          <li>To communicate with you regarding updates or inquiries.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Your Privacy Rights</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          You have the right to access, update, or delete your personal information. To exercise these rights, please contact us.
        </p>
      </div>
    );
  };

  export default PrivacyPolicy;
