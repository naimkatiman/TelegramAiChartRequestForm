import { TelegramBotForm } from "@/components/telegram-bot-form";
import { StatusDisplay } from "@/components/status-display";
import { SubmissionHistory } from "@/components/submission-history";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { BotSubmission } from "@shared/schema";
import { motion } from "framer-motion";
import { MessageSquareCode, SendHorizonal, BotMessageSquare, Bot, Settings, BarChart3 } from "lucide-react";

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
            <div className="bg-gray-200 p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-[#0088cc] rounded-full text-white"
                >
                  <Bot size={24} />
                </motion.div>
                <motion.h1 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold text-black"
                >
                  Telegram Bot Customization Request - IB
                </motion.h1>
              </div>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-black"
              >
                Configure your trading bot with preferred instruments and indicators
              </motion.p>
              
              <motion.div 
                className="absolute -right-10 -bottom-10 flex flex-wrap gap-2 opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <MessageSquareCode size={40} />
                <SendHorizonal size={40} />
                <BotMessageSquare size={40} />
                <Settings size={40} />
                <BarChart3 size={40} />
              </motion.div>
            </div>
            
            <TelegramBotForm 
              onSubmissionSuccess={handleSubmissionSuccess}
              onSubmissionError={handleSubmissionError}
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StatusDisplay latestSubmission={latestSubmission} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SubmissionHistory latestSubmission={latestSubmission} />
          </motion.div>
          
          {/* Help & Resources Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] mt-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gray-200 p-4 rounded-t-lg flex items-center gap-2">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <MessageSquareCode size={20} className="text-[#0088cc]" />
              </motion.div>
              <h2 className="text-lg font-semibold text-black">Help & Resources</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-lg text-black mb-2 flex items-center gap-2">
                    <BarChart3 size={16} className="text-[#0088cc]" />
                    Available Symbols
                  </h3>
                  <a href="https://doc.chart-img.com/#tradingview-symbols" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-[#0088cc] hover:underline flex items-center gap-2">
                    <SendHorizonal size={14} />
                    View supported symbols
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-lg text-black mb-2 flex items-center gap-2">
                    <Settings size={16} className="text-[#0088cc]" />
                    Available Indicators
                  </h3>
                  <a href="https://doc.chart-img.com/#tradingview-chart-indicators" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-[#0088cc] hover:underline flex items-center gap-2">
                    <SendHorizonal size={14} />
                    View supported indicators
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
