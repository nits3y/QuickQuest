"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// Emergency Controls Component (for teacher use)
export function EmergencyControls({ onPauseExam, onEndExam }: {
  onPauseExam: () => void;
  onEndExam: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-3 shadow-lg">
      <div className="text-xs text-muted-foreground mb-2">Teacher Controls</div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onPauseExam}>
          ⏸️ Pause
        </Button>
        <Button size="sm" variant="destructive" onClick={onEndExam}>
          🛑 End Exam
        </Button>
      </div>
    </div>
  );
}

// Student Help Component
export function StudentHelpPanel() {
  return (
    <div className="bg-card border rounded-lg p-4">
      <h3 className="font-medium mb-3">📚 Exam Instructions</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <span className="text-primary">1.</span>
          <span>Read each question carefully</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-primary">2.</span>
          <span>Write only the letter (A, B, C, D) on your answer sheet</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-primary">3.</span>
          <span>Questions advance automatically when time expires</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-primary">4.</span>
          <span>Do not click or interact with the screen</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-primary">5.</span>
          <span>Raise your hand if you need assistance</span>
        </div>
      </div>
    </div>
  );
}
