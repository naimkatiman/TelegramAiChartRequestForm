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
          <div className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gray-200 p-6">
              <h1 className="text-3xl font-bold mb-2 text-black">🤖 Telegram Bot Customization Request</h1>
              <p className="text-black">Configure your trading bot with preferred instruments and indicators</p>
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
          <div className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] mt-6 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gray-200 p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold text-black">Help & Resources</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-black mb-2">Available Symbols</h3>
                  <a href="https://doc.chart-img.com/#tradingview-symbols" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-[#0088cc] hover:underline">
                    View supported symbols
                  </a>
                </div>
                
                <div>
                  <h3 className="text-lg text-black mb-2">Available Indicators</h3>
                  <a href="https://doc.chart-img.com/#tradingview-chart-indicators" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-[#0088cc] hover:underline">
                    View supported indicators
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
