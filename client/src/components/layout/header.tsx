import { Link } from "wouter";

export function Header() {
  return (
    <header className="bg-[#09090B] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.03-1.74 1.11-4.93 3.24-.47.32-.89.48-1.27.47-.42-.01-1.21-.24-1.81-.43-.73-.24-1.32-.36-1.27-.77.03-.21.3-.43.83-.66 3.27-1.42 5.46-2.36 6.57-2.81 3.12-1.27 3.77-1.49 4.19-1.5.09 0 .3.03.43.13.11.08.14.19.15.27-.01.06.01.22 0 .26z" />
          </svg>
          <span className="ml-2 text-xl font-semibold">Telegram AI Chart Analysis Bot</span>
        </div>
        {/* Navigation links removed */}
      </div>
    </header>
  );
}
