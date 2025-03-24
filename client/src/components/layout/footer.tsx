import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#09090B] text-white py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Telegram Bot Customization. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-[#0088cc] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#0088cc] transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#0088cc] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
