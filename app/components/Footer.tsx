import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-2 border-t border-gray-300">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link href="/legal/privacyPolicy" className="text-sm hover:underline">Privacy Policy </Link>
          <Link href="/legal/termsOfServices" className="text-sm hover:underline">Terms of Service</Link>
          <Link href="/legal/securityPolicy" className="text-sm hover:underline">Security</Link>
          <Link href="/feedbackForm" className="text-sm hover:underline">FeedBack</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
