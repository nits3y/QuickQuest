// Quiz data loader utility
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  category?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timePerQuestion: number;
  questions: Question[];
  examCode: string;
}

// Sample quiz data - in production this would come from an API or database
const QUIZ_DATA: Record<string, Quiz> = {
  "12345": {
    id: "math_001",
    title: "Mathematics Quiz #1",
    description: "Basic algebra and arithmetic",
    timePerQuestion: 25,
    examCode: "12345",
    questions: [
      {
        id: "q1",
        question: "What is the result of 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        points: 1,
        category: "arithmetic"
      },
      {
        id: "q2", 
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        points: 1,
        category: "geography"
      },
      {
        id: "q3",
        question: "Which of the following is a prime number?",
        options: ["4", "6", "7", "8"],
        correctAnswer: 2,
        points: 1,
        category: "mathematics"
      },
      {
        id: "q4",
        question: "What is 5 × 6?",
        options: ["25", "30", "35", "40"],
        correctAnswer: 1,
        points: 1,
        category: "arithmetic"
      },
      {
        id: "q5",
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: 1,
        points: 1,
        category: "science"
      }
    ]
  },
  "67890": {
    id: "sci_001",
    title: "General Science Quiz",
    description: "Basic science concepts",
    timePerQuestion: 10,
    examCode: "67890",
    questions: [
      {
        id: "s1",
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        points: 1,
        category: "chemistry"
      },
      {
        id: "s2",
        question: "How many bones are in the adult human body?",
        options: ["196", "206", "216", "226"],
        correctAnswer: 1,
        points: 1,
        category: "biology"
      },
      {
        id: "s3",
        question: "What force keeps planets in orbit around the Sun?",
        options: ["Magnetism", "Gravity", "Friction", "Inertia"],
        correctAnswer: 1,
        points: 1,
        category: "physics"
      }
    ]
  },
  "11111": {
    id: "eng_001",
    title: "English Grammar Quiz",
    description: "Basic grammar and vocabulary",
    timePerQuestion: 20,
    examCode: "11111",
    questions: [
      {
        id: "e1",
        question: "Which word is a noun?",
        options: ["Running", "Beautiful", "House", "Quickly"],
        correctAnswer: 2,
        points: 1,
        category: "grammar"
      },
      {
        id: "e2",
        question: "What is the past tense of 'go'?",
        options: ["Goed", "Gone", "Went", "Going"],
        correctAnswer: 2,
        points: 1,
        category: "grammar"
      },
      {
        id: "e3",
        question: "Which sentence is correct?",
        options: [
          "I have went to the store",
          "I have gone to the store", 
          "I has gone to the store",
          "I had went to the store"
        ],
        correctAnswer: 1,
        points: 1,
        category: "grammar"
      }
    ]
  }
};

// Function to load quiz by exam code
export async function loadQuizByCode(examCode: string): Promise<Quiz | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For numeric codes, use as-is (no need to normalize case)
  return QUIZ_DATA[examCode] || null;
}

// Function to get all available quizzes
export function getAllQuizzes(): Quiz[] {
  return Object.values(QUIZ_DATA);
}

// Function to shuffle questions (for randomization)
export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to validate exam code
export function isValidExamCode(examCode: string): boolean {
  // Check if the code is numeric and exists in our data
  const isNumeric = /^\d+$/.test(examCode);
  return isNumeric && examCode in QUIZ_DATA;
}
