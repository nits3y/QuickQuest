"use client";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useState } from "react";

// Student Join Exam Dialog Component  
export function StudentJoinDialog({ children }: { children?: React.ReactNode }) {
  const [fullName, setFullName] = useState("");
  const [examId, setExamId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate joining exam process - replace with actual logic
    setTimeout(() => {
      console.log("Student joining exam:", { fullName, examId });
      setIsLoading(false);
      // Handle successful join (redirect to exam waiting room, show success message, etc.)
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            Join as Student 📝
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              📝
            </div>
            Join Exam Session
          </DialogTitle>
          <DialogDescription>
            Enter your full name and exam ID provided by your teacher to join the exam session.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleJoinExam} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
            <p className="text-xs text-muted-foreground">
              Use your real name as it appears on your school records
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="examId" className="text-sm font-medium">
              Exam ID
            </label>
            <input
              id="examId"
              type="text"
              placeholder="e.g., MATH101-2024"
              value={examId}
              onChange={(e) => setExamId(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter the exam ID provided by your teacher
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" disabled={isLoading || !fullName.trim() || !examId.trim()} className="w-full">
              {isLoading ? "Joining exam..." : "Join Exam Session"}
            </Button>
            <div className="text-xs text-muted-foreground text-center">
              Make sure you have paper and pen ready for the exam
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
