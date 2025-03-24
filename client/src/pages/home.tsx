import { TelegramBotForm } from "@/components/telegram-bot-form";
import { StatusDisplay } from "@/components/status-display";
import { SubmissionHistory } from "@/components/submission-history";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BotSubmission } from "@shared/schema";

export default function Home() {
  const [latestSubmission, setLatestSubmission] = useState<BotSubmission | null>(null);
  const { toast } = useToast();

  const handleSubmissionSuccess = (submission: BotSubmission) => {
    setLatestSubmission(submission);
    toast({
      title: "Success",
      description: "Your bot customization request has been submitted successfully.",
      variant: "default",
    });
  };

  const handleSubmissionError = (error: Error) => {
    toast({
      title: "Error",
      description: error.message || "Failed to submit bot customization request.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
            <div className="bg-accent text-white p-6">
              <h1 className="text-2xl font-semibold mb-2">🤖 Telegram Bot Customization Request</h1>
              <p className="text-gray-300">Configure your trading bot with preferred instruments and indicators</p>
            </div>
            
            <TelegramBotForm 
              onSubmissionSuccess={handleSubmissionSuccess}
              onSubmissionError={handleSubmissionError}
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <StatusDisplay latestSubmission={latestSubmission} />
          <SubmissionHistory latestSubmission={latestSubmission} />
          
          {/* Help & Resources Section */}
          <div className="bg-white rounded-lg shadow-md border border-border mt-6">
            <div className="bg-accent text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold">Help & Resources</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0088cc]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <a href="#" className="text-accent hover:text-[#0088cc] transition-colors">Bot Documentation</a>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0088cc]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <a href="#" className="text-accent hover:text-[#0088cc] transition-colors">Trading Indicators Guide</a>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0088cc]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <a href="#" className="text-accent hover:text-[#0088cc] transition-colors">FAQ</a>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0088cc]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  <a href="#" className="text-accent hover:text-[#0088cc] transition-colors">Contact Support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
