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

// Enhanced Question management component
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timePerQuestion: number;
  questions: Question[];
  isActive: boolean;
  createdAt: Date;
  examCode: string;
}

// Question List Component for a specific quiz
export function QuestionManager({ quiz, onUpdateQuiz }: {
  quiz: Quiz;
  onUpdateQuiz: (updatedQuiz: Quiz) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>(quiz.questions);

  const handleAddQuestion = (questionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    onUpdateQuiz(updatedQuiz);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    onUpdateQuiz(updatedQuiz);
  };

  const handleEditQuestion = (questionId: string, updatedQuestion: Omit<Question, 'id'>) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...updatedQuestion, id: questionId } : q
    );
    setQuestions(updatedQuestions);
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    onUpdateQuiz(updatedQuiz);
  };

  const handleUploadQuestions = (newQuestions: Omit<Question, 'id'>[]) => {
    const questionsWithIds = newQuestions.map(q => ({
      ...q,
      id: Date.now().toString() + Math.random().toString(),
    }));
    
    const updatedQuestions = [...questions, ...questionsWithIds];
    setQuestions(updatedQuestions);
    
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    onUpdateQuiz(updatedQuiz);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          📝 Manage Questions ({questions.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              📝
            </div>
            Manage Questions - {quiz.title}
          </DialogTitle>
          <DialogDescription>
            Add, edit, or remove questions for this quiz
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <QuestionFormDialog
              onSave={handleAddQuestion}
              trigger={
                <Button variant="outline" size="sm">
                  ✍️ Add Question
                </Button>
              }
            />
            <CSVUploadDialog
              onUpload={handleUploadQuestions}
              trigger={
                <Button variant="outline" size="sm">
                  📄 Upload CSV
                </Button>
              }
            />
          </div>

          {/* Questions List */}
          {questions.length > 0 ? (
            <div className="space-y-3">
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  onEdit={(updatedQuestion) => handleEditQuestion(question.id, updatedQuestion)}
                  onDelete={() => handleDeleteQuestion(question.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No questions added yet. Start by adding your first question!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Individual Question Card Component
function QuestionCard({ question, index, onEdit, onDelete }: {
  question: Question;
  index: number;
  onEdit: (question: Omit<Question, 'id'>) => void;
  onDelete: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              Q{index + 1}
            </span>
            <span className="text-xs text-muted-foreground">
              {question.points} point{question.points !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="font-medium mb-3">{question.question}</p>
          <div className="space-y-1">
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center gap-2 text-sm">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                  question.correctAnswer === optIndex 
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + optIndex)}
                </span>
                <span className={question.correctAnswer === optIndex ? 'font-medium text-green-700' : ''}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1 ml-4">
          <QuestionFormDialog
            question={question}
            onSave={onEdit}
            trigger={
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            }
          />
          <Button variant="ghost" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Question Form Dialog
function QuestionFormDialog({ question, onSave, trigger }: { 
  question?: Question;
  onSave: (question: Omit<Question, 'id'>) => void;
  trigger: React.ReactNode;
}) {
  const [questionText, setQuestionText] = useState(question?.question || "");
  const [options, setOptions] = useState(question?.options || ["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || 0);
  const [points, setPoints] = useState(question?.points || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const questionData = {
      question: questionText,
      options: options.filter(opt => opt.trim() !== ""),
      correctAnswer,
      points,
    };

    // Simulate save operation
    setTimeout(() => {
      onSave(questionData);
      setIsLoading(false);
      
      if (!question) {
        // Reset form for new questions
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer(0);
        setPoints(1);
      }
      
      setIsOpen(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
              ✍️
            </div>
            {question ? "Edit Question" : "Add New Question"}
          </DialogTitle>
          <DialogDescription>
            {question ? "Update the question details" : "Create a new question with multiple choice answers"}
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
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
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
              {isLoading ? (question ? "Updating..." : "Adding...") : (question ? "Update Question" : "Add Question")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced CSV Upload Dialog
function CSVUploadDialog({ onUpload, trigger }: { 
  onUpload: (questions: Omit<Question, 'id'>[]) => void;
  trigger: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [previewQuestions, setPreviewQuestions] = useState<Omit<Question, 'id'>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCsvFile(file || null);
    
    if (file) {
      // Parse CSV file for preview (simplified)
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const questions: Omit<Question, 'id'>[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          if (values.length >= 7) {
            questions.push({
              question: values[0],
              options: [values[1], values[2], values[3], values[4]].filter(Boolean),
              correctAnswer: parseInt(values[5]) - 1, // Convert 1-based to 0-based
              points: parseInt(values[6]) || 1,
            });
          }
        }
        setPreviewQuestions(questions);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile || previewQuestions.length === 0) return;

    setIsLoading(true);

    // Simulate upload
    setTimeout(() => {
      onUpload(previewQuestions);
      setIsLoading(false);
      setCsvFile(null);
      setPreviewQuestions([]);
      setIsOpen(false);
    }, 1000);
  };

  const downloadTemplate = () => {
    const csvContent = `question,option_a,option_b,option_c,option_d,correct_answer,points
"What is 2 + 2?","2","4","6","8",2,1
"What is the capital of France?","London","Berlin","Paris","Madrid",3,1
"Which is the largest planet?","Mars","Jupiter","Earth","Venus",2,1`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
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
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2">CSV Format Requirements:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Headers: question, option_a, option_b, option_c, option_d, correct_answer, points</li>
              <li>• correct_answer: 1=A, 2=B, 3=C, 4=D</li>
              <li>• Points: 1-10</li>
              <li>• Use quotes around text with commas</li>
            </ul>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={downloadTemplate}
              className="mt-2"
            >
              📥 Download Template
            </Button>
          </div>

          {/* Preview Questions */}
          {previewQuestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Preview ({previewQuestions.length} questions):</h4>
              <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2">
                {previewQuestions.slice(0, 3).map((q, index) => (
                  <div key={index} className="text-xs bg-background p-2 rounded border">
                    <div className="font-medium">{index + 1}. {q.question}</div>
                    <div className="text-muted-foreground">
                      Correct: {String.fromCharCode(65 + q.correctAnswer)} | Points: {q.points}
                    </div>
                  </div>
                ))}
                {previewQuestions.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center">
                    ...and {previewQuestions.length - 3} more questions
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleFileUpload} className="flex gap-3">
            <Button 
              type="submit" 
              disabled={isLoading || !csvFile || previewQuestions.length === 0} 
              className="flex-1"
            >
              {isLoading ? "Uploading..." : `Upload ${previewQuestions.length} Questions`}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
