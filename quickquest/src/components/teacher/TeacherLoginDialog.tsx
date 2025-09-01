"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

// Teacher Login Form Component (separate form logic)
function TeacherLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process - replace with actual authentication logic
    setTimeout(() => {
      console.log("Teacher login:", { email, password });
      setIsLoading(false);
      // Handle successful login (redirect to dashboard)
      window.location.href = '/teacher';
    }, 1000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 pt-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="teacher@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          required
        />
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <Button type="button" variant="ghost" className="w-full text-sm">
          Forgot password?
        </Button>
      </div>
    </form>
  );
}

// Teacher Login Dialog Component
export function TeacherLoginDialog({ children }: { children?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Login</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              🔑
            </div>
            Teacher Login
          </DialogTitle>
          <DialogDescription>
            Sign in to access your QuickQuest teacher dashboard and manage your exams.
          </DialogDescription>
        </DialogHeader>
        <TeacherLoginForm />
      </DialogContent>
    </Dialog>
  );
}

// Export the form component as well for reusability
export { TeacherLoginForm };
