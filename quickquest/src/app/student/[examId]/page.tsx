"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { loadQuizByCode, shuffleQuestions, type Quiz, type Question } from "@/lib/quizLoader";

interface StudentSession {
  studentName: string;
  examId: string;
  joinedAt: Date;
}

// Timer Component
function ExamTimer({ timeLeft, totalTime, onTimeUp }: {
  timeLeft: number;
  totalTime: number;
  onTimeUp: () => void;
}) {
  const percentage = (timeLeft / totalTime) * 100;
  const isLowTime = timeLeft <= 5;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Time Remaining</span>
        <span className={`text-2xl font-bold ${isLowTime ? 'text-red-600' : 'text-primary'}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            isLowTime ? 'bg-red-500' : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isLowTime && (
        <p className="text-xs text-red-600 mt-1 animate-pulse">
          ⚠️ Time running out!
        </p>
      )}
    </div>
  );
}

// Simple Question Counter Component
function QuestionCounter({ currentQuestion, totalQuestions }: {
  currentQuestion: number;
  totalQuestions: number;
}) {
  return (
    <div className="bg-card border rounded-lg p-4 text-center">
      <div className="text-lg font-semibold text-primary">
        Question {currentQuestion} of {totalQuestions}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        Questions are displayed in random order
      </div>
    </div>
  );
}

// Question Display Component
function QuestionDisplay({ question, questionNumber }: {
  question: Question;
  questionNumber: number;
}) {
  return (
    <div className="bg-card border rounded-lg p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Question {questionNumber}
          </span>
          <span className="text-sm text-muted-foreground">
            {question.points} point{question.points !== 1 ? 's' : ''}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Randomized
          </span>
        </div>
        <h2 className="text-xl font-semibold leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          📝 Write your answer on paper. Choose from the options below:
        </p>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
            <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center font-semibold text-primary">
              {String.fromCharCode(65 + index)}
            </div>
            <span className="text-lg">{option}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>📋 Instructions:</strong> Write the letter (A, B, C, or D) corresponding to your answer on your answer sheet. 
          Do not click anything on screen - this is display only!
        </p>
      </div>
    </div>
  );
}

// Waiting Room Component
function ExamWaitingRoom({ studentName, examCode, onExamStart }: {
  studentName: string;
  examCode: string;
  onExamStart: () => void;
}) {
  const [isWaiting, setIsWaiting] = useState(true);

  // Simulate waiting for teacher to start exam
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 3000); // 3 seconds for demo

    return () => clearTimeout(timer);
  }, []);

  if (isWaiting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⏳</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Waiting for Exam to Start</h1>
            <p className="text-muted-foreground">
              Welcome, <strong>{studentName}</strong>!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Exam Code: <code className="bg-muted px-2 py-1 rounded font-mono">{examCode}</code>
            </p>
          </div>
          <div className="space-y-2">
            <div className="animate-pulse flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full animation-delay-200"></div>
              <div className="w-2 h-2 bg-primary rounded-full animation-delay-400"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Please wait for your teacher to begin the exam...
            </p>
          </div>
          <div className="bg-card border rounded-lg p-4 text-left">
            <h3 className="font-medium mb-2">📋 Exam Instructions:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Have your pen and answer sheet ready</li>
              <li>• Questions will appear one at a time</li>
              <li>• Write only the letter (A, B, C, D) for each answer</li>
              <li>• Do not click on the screen during the exam</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl text-white">✅</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Ready to Begin!</h1>
          <p className="text-muted-foreground">
            The exam is about to start, <strong>{studentName}</strong>
          </p>
        </div>
        <Button onClick={onExamStart} size="lg" className="w-full">
          Start Exam
        </Button>
      </div>
    </div>
  );
}

// Exam Completion Component
function ExamCompletion({ studentName, questionsCount }: {
  studentName: string;
  questionsCount: number;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl text-white">🎉</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Exam Completed!</h1>
          <p className="text-muted-foreground">
            Well done, <strong>{studentName}</strong>!
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            You have completed all {questionsCount} questions.
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4 text-left">
          <h3 className="font-medium mb-2">📋 Next Steps:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Submit your answer sheet to your teacher</li>
            <li>• Make sure your name is clearly written</li>
            <li>• Wait for further instructions</li>
          </ul>
        </div>
        <Button onClick={() => router.push('/')} variant="outline" className="w-full">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

// Main Student Exam Page
export default function StudentExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  // Get student name from URL parameters
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    // Get student name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || "Student";
    setStudentName(name);
  }, []);

  // Load quiz data from JSON (simulated)
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const quizData = await loadQuizByCode(examId);
        if (quizData) {
          // Shuffle questions for randomization
          const shuffledQuestions = shuffleQuestions(quizData.questions);
          console.log(`Loaded quiz: ${quizData.title}`);
          console.log(`Original questions: ${quizData.questions.length}`);
          console.log(`Shuffled questions: ${shuffledQuestions.length}`);
          setQuiz({
            ...quizData,
            questions: shuffledQuestions
          });
        } else {
          // Handle invalid exam code
          console.error("Invalid exam code:", examId);
          // Could redirect to error page or show error message
        }
      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };

    loadQuizData();
  }, [examId]);

  const [studentSession] = useState<StudentSession>({
    studentName: studentName,
    examId: examId,
    joinedAt: new Date()
  });

  const [examState, setExamState] = useState<'waiting' | 'active' | 'completed'>('waiting');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25); // Default value, will be updated when quiz loads
  const [isTransitioning, setIsTransitioning] = useState(false); // Prevent multiple handleTimeUp calls

  // Timer effect
  useEffect(() => {
    if (examState !== 'active' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Return 0 and let the other effect handle the transition
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  // Update timeLeft when quiz loads
  useEffect(() => {
    if (quiz) {
      setTimeLeft(quiz.timePerQuestion);
    }
  }, [quiz]);

  // Reset transitioning flag when question index changes
  useEffect(() => {
    setIsTransitioning(false);
  }, [currentQuestionIndex]);

  const handleTimeUp = useCallback(() => {
    if (!quiz || isTransitioning) {
      console.log(`handleTimeUp blocked: quiz=${!!quiz}, isTransitioning=${isTransitioning}`);
      return;
    }
    
    console.log(`Time up! Current question: ${currentQuestionIndex + 1}/${quiz.questions.length}`);
    setIsTransitioning(true); // Prevent multiple calls
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      // Move to next question
      console.log(`Moving to question ${currentQuestionIndex + 2}`);
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(quiz.timePerQuestion);
      // Reset transition flag after a short delay
      setTimeout(() => setIsTransitioning(false), 100);
    } else {
      // Exam completed
      console.log('Exam completed!');
      setExamState('completed');
      setIsTransitioning(false);
    }
  }, [quiz, currentQuestionIndex, isTransitioning]);

  // Separate effect to handle time up
  useEffect(() => {
    if (examState === 'active' && timeLeft === 0 && !isTransitioning) {
      console.log('Timer reached 0, calling handleTimeUp');
      handleTimeUp();
    }
  }, [timeLeft, examState, handleTimeUp, isTransitioning]);

  const handleExamStart = () => {
    if (!quiz) return;
    
    setExamState('active');
    setTimeLeft(quiz.timePerQuestion);
  };

  // Loading state
  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">📚</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Loading Exam...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your exam.</p>
        </div>
      </div>
    );
  }

  // Render different states
  if (examState === 'waiting') {
    return (
      <ExamWaitingRoom
        studentName={studentName}
        examCode={quiz.examCode}
        onExamStart={handleExamStart}
      />
    );
  }

  if (examState === 'completed') {
    return (
      <ExamCompletion
        studentName={studentName}
        questionsCount={quiz.questions.length}
      />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Debug: Log current state
  console.log(`Rendering question ${currentQuestionIndex + 1} of ${quiz.questions.length}`);
  console.log('Current question:', currentQuestion);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  Q
                </div>
                <span className="text-xl font-bold">QuickQuest</span>
              </div>
              <div className="text-muted-foreground">
                <span className="text-sm">{quiz.title}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{studentName}</p>
              <p className="text-xs text-muted-foreground">Code: {quiz.examCode}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Timer and Question Counter */}
          <div className="grid md:grid-cols-2 gap-6">
            <ExamTimer
              timeLeft={timeLeft}
              totalTime={quiz.timePerQuestion}
              onTimeUp={handleTimeUp}
            />
            <QuestionCounter
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={quiz.questions.length}
            />
          </div>

          {/* Question Display */}
          <QuestionDisplay
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
          />

          {/* Instructions Footer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Remember:</strong> Write your answers on paper only. The question will automatically advance when time runs out.
              </p>
            </div>
          </div>

          {/* Debug Controls - Remove in production */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-xs text-red-600 dark:text-red-400 mb-2">Debug Controls (Development Only)</p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  console.log('Manual advance triggered');
                  handleTimeUp();
                }}
              >
                Next Question
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setTimeLeft(3)}
              >
                Set Timer to 3s
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
