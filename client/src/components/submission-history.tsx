import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BotSubmission } from "@shared/schema";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface SubmissionHistoryProps {
  latestSubmission: BotSubmission | null;
}

export function SubmissionHistory({ latestSubmission }: SubmissionHistoryProps) {
  const { data: submissions, isLoading, error } = useQuery<BotSubmission[]>({
    queryKey: ["/api/submissions"],
  });

  // Get top 5 most recent submissions
  const recentSubmissions = submissions 
    ? [...submissions].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      }).slice(0, 5)
    : [];

  // Count instruments for each submission
  const countInstruments = (submission: BotSubmission) => {
    const equityCount = submission.equityIndices ? (submission.equityIndices as string[]).length : 0;
    const forexCount = submission.forex ? (submission.forex as string[]).length : 0;
    const commoditiesCount = submission.commodities ? (submission.commodities as string[]).length : 0;
    
    return equityCount + forexCount + commoditiesCount;
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-border">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Recent Submissions</h2>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#0088cc]" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-gray-700">Failed to load submission history</p>
            <p className="text-sm text-gray-500">{(error as Error).message || "Unknown error"}</p>
          </div>
        ) : recentSubmissions.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="mt-4 text-gray-700">No submission history</p>
            <p className="text-sm text-gray-500">Your recent requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div 
                key={submission.id} 
                className="border border-border rounded-md p-3 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">{submission.requesterName}</h3>
                    <p className="text-xs text-gray-600">{countInstruments(submission)} instruments selected</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(submission.status)}`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Submitted on {format(new Date(submission.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
