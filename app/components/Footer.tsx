const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-2 border-t border-gray-300">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <a href="/legal/privacyPolicy" className="text-sm hover:underline">Privacy Policy</a>
          <a href="/legal/termsOfServices" className="text-sm hover:underline">Terms of Service</a>
          <a href="/legal/securityPolicy" className="text-sm hover:underline">Security</a>
          <a href="/feedbackForm" className="text-sm hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
