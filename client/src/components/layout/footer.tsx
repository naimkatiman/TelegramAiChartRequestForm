import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#09090B] text-white py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Telegram Bot Customization. All rights reserved.</p>
          </div>
          {/* Footer Links Removed */}
        </div>
      </div>
    </footer>
  );
}
