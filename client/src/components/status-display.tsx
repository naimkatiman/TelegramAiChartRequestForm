import { BotSubmission } from "@shared/schema";
import { format } from "date-fns";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface StatusDisplayProps {
  latestSubmission: BotSubmission | null;
}

export function StatusDisplay({ latestSubmission }: StatusDisplayProps) {
  // If there's no submission, show the no submission status
  if (!latestSubmission) {
    return (
      <div className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] mb-6 hover:shadow-lg transition-shadow duration-300">
        <div className="bg-gray-200 p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold text-black">Request Status & Recent Submissions</h2>
        </div>
        <div className="p-4">
          <div className="text-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-4 text-gray-700">No request submitted yet</p>
            <p className="text-sm text-gray-500">Your submission status will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  // Determine status icon and color based on submission status
  let StatusIcon = Info;
  let statusColor = "text-gray-400 bg-gray-100";
  let statusTitle = "Processing";
  let statusMessage = "Your request is being processed";

  if (latestSubmission.status === "completed") {
    StatusIcon = CheckCircle;
    statusColor = "text-white bg-green-500";
    statusTitle = "Request Completed";
    statusMessage = "Your bot customization request has been completed";
  } else if (latestSubmission.status === "pending") {
    StatusIcon = Info;
    statusColor = "text-white bg-[#0088cc]";
    statusTitle = "Request Submitted";
    statusMessage = "Your bot customization request has been received";
  } else if (latestSubmission.status === "failed") {
    StatusIcon = AlertCircle;
    statusColor = "text-white bg-red-500";
    statusTitle = "Request Failed";
    statusMessage = "There was an issue with your request";
  }

  // Format the timestamp
  const timestamp = latestSubmission.createdAt 
    ? format(new Date(latestSubmission.createdAt), "MMMM d, yyyy 'at' h:mm a") 
    : "-";

  return (
    <div className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gray-200 p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold text-black">Request Status & Recent Submissions</h2>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className={`flex-shrink-0 h-8 w-8 rounded-full ${statusColor} flex items-center justify-center mr-3`}>
            <StatusIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{statusTitle}</h3>
            <p className="text-sm text-gray-600">{statusMessage}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>Submitted on {timestamp}</p>
        </div>
      </div>
    </div>
  );
}
