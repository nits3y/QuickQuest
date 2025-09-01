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
import { QuestionManager, Question, Quiz } from "@/components/teacher/QuizManager";

// Component for creating/editing a quiz
function QuizFormDialog({ quiz, onSave, trigger }: { 
  quiz?: Quiz; 
  onSave: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  trigger: React.ReactNode;
}) {
  const [title, setTitle] = useState(quiz?.title || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const [timePerQuestion, setTimePerQuestion] = useState(quiz?.timePerQuestion || 25);
  const [examCode, setExamCode] = useState(quiz?.examCode || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Generate exam code if not provided
    const finalExamCode = examCode || `QUIZ-${Date.now().toString().slice(-6)}`;

    const quizData = {
      title,
      description,
      timePerQuestion,
      examCode: finalExamCode.toUpperCase(),
      questions: quiz?.questions || [],
      isActive: quiz?.isActive || false,
    };

    // Simulate save operation
    setTimeout(() => {
      onSave(quizData);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              📝
            </div>
            {quiz ? "Edit Quiz" : "Create New Quiz"}
          </DialogTitle>
          <DialogDescription>
            {quiz ? "Update your quiz details" : "Set up a new quiz for your students"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Quiz Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g., Mathematics Quiz #1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Brief description of the quiz content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="timePerQuestion" className="text-sm font-medium">
                Time per Question (seconds)
              </label>
              <input
                id="timePerQuestion"
                type="number"
                min="10"
                max="300"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="examCode" className="text-sm font-medium">
                Exam Code
              </label>
              <input
                id="examCode"
                type="text"
                placeholder="Auto-generated"
                value={examCode}
                onChange={(e) => setExamCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : quiz ? "Update Quiz" : "Create Quiz"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Component for manual question entry
function QuestionFormDialog({ onSave, trigger }: { 
  onSave: (question: Omit<Question, 'id'>) => void;
  trigger: React.ReactNode;
}) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [points, setPoints] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const questionData = {
      question,
      options: options.filter(opt => opt.trim() !== ""),
      correctAnswer,
      points,
    };

    // Simulate save operation
    setTimeout(() => {
      onSave(questionData);
      setIsLoading(false);
      // Reset form
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      setPoints(1);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              ✍️
            </div>
            Add New Question
          </DialogTitle>
          <DialogDescription>
            Create a new question with multiple choice answers
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              Question
            </label>
            <textarea
              id="question"
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Answer Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                  className="w-4 h-4 text-primary"
                />
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required={index < 2} // First two options are required
                />
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Select the radio button next to the correct answer
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="points" className="text-sm font-medium">
              Points
            </label>
            <input
              id="points"
              type="number"
              min="1"
              max="10"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Adding..." : "Add Question"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Component for CSV upload
function CSVUploadDialog({ onUpload, trigger }: { 
  onUpload: (questions: Omit<Question, 'id'>[]) => void;
  trigger: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile) return;

    setIsLoading(true);

    // Simulate CSV parsing and upload
    setTimeout(() => {
      // Mock questions from CSV
      const mockQuestions: Omit<Question, 'id'>[] = [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
          points: 1
        },
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2,
          points: 1
        }
      ];
      
      onUpload(mockQuestions);
      setIsLoading(false);
      setCsvFile(null);
    }, 1000);
  };

  const downloadTemplate = () => {
    const csvContent = `question,option_a,option_b,option_c,option_d,correct_answer,points
"What is 2 + 2?","2","4","6","8",2,1
"What is the capital of France?","London","Berlin","Paris","Madrid",3,1`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'question_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              📄
            </div>
            Upload Questions from CSV
          </DialogTitle>
          <DialogDescription>
            Upload multiple questions at once using a CSV file
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="csvFile" className="text-sm font-medium">
              CSV File
            </label>
            <input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2">CSV Format Requirements:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Headers: question, option_a, option_b, option_c, option_d, correct_answer, points</li>
              <li>• correct_answer: 1=A, 2=B, 3=C, 4=D</li>
              <li>• Points: 1-10</li>
            </ul>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={downloadTemplate}
              className="mt-2"
            >
              Download Template
            </Button>
          </div>

          <form onSubmit={handleFileUpload} className="flex gap-3">
            <Button 
              type="submit" 
              disabled={isLoading || !csvFile} 
              className="flex-1"
            >
              {isLoading ? "Uploading..." : "Upload Questions"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Quiz Card Component
function QuizCard({ quiz, onEdit, onDelete, onToggleActive, onUpdateQuiz }: {
  quiz: Quiz;
  onEdit: (quiz: Quiz) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  onUpdateQuiz: (quiz: Quiz) => void;
}) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground">{quiz.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            quiz.isActive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}>
            {quiz.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Questions:</span>
          <span className="ml-2 font-medium">{quiz.questions.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Time per Q:</span>
          <span className="ml-2 font-medium">{quiz.timePerQuestion}s</span>
        </div>
        <div>
          <span className="text-muted-foreground">Exam Code:</span>
          <span className="ml-2 font-mono font-medium">{quiz.examCode}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Created:</span>
          <span className="ml-2 font-medium">{quiz.createdAt.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <QuestionManager quiz={quiz} onUpdateQuiz={onUpdateQuiz} />
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(quiz)}
        >
          ✏️ Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onToggleActive(quiz.id)}
        >
          {quiz.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete(quiz.id)}
        >
          🗑️ Delete
        </Button>
      </div>
    </div>
  );
}

// Main Teacher Dashboard Component
export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Mathematics Quiz #1',
      description: 'Basic algebra and arithmetic',
      timePerQuestion: 25,
      questions: [],
      isActive: true,
      createdAt: new Date(),
      examCode: 'MATH101'
    }
  ]);

  const handleCreateQuiz = (quizData: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setQuizzes(prev => [...prev, newQuiz]);
  };

  const handleEditQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    ));
  };

  const handleUpdateQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    ));
  };

  const handleDeleteQuiz = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === id ? { ...quiz, isActive: !quiz.isActive } : quiz
    ));
  };

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
              <span className="text-muted-foreground">Teacher Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Settings</Button>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Quizzes</h1>
            <p className="text-muted-foreground">Manage your quizzes and questions</p>
          </div>
          <div className="flex items-center gap-3">
            <QuizFormDialog
              onSave={handleCreateQuiz}
              trigger={
                <Button>
                  ➕ Create Quiz
                </Button>
              }
            />
          </div>
        </div>

        {/* Quiz Grid */}
        {quizzes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onEdit={handleEditQuiz}
                onDelete={handleDeleteQuiz}
                onToggleActive={handleToggleActive}
                onUpdateQuiz={handleUpdateQuiz}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              📝
            </div>
            <h3 className="text-lg font-medium mb-2">No quizzes yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first quiz to get started
            </p>
            <QuizFormDialog
              onSave={handleCreateQuiz}
              trigger={
                <Button>
                  Create Your First Quiz
                </Button>
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}
