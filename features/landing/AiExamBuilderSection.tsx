"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  ChevronDown, 
  Check, 
  RotateCw, 
  Edit3, 
  Download, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  BookOpenCheck,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Interfaces
interface Question {
  id: number;
  text: string;
  options?: string[];
  type: "mcq" | "tf" | "descriptive";
  points: number;
}

interface QuestionBank {
  [subject: string]: {
    [topic: string]: {
      mcq: Question[];
      tf: Question[];
      descriptive: Question[];
      alternatives: {
        mcq: string[];
        tf: string[];
        descriptive: string[];
      };
    };
  };
}

// Concrete Question Database for high-fidelity interactive simulation
const QUESTION_DATABASE: QuestionBank = {
  Mathematics: {
    "Quadratic Equations": {
      mcq: [
        { id: 1, type: "mcq", points: 3, text: "Find the roots of the quadratic equation x² - 5x + 6 = 0.", options: ["A) 2, 3", "B) -2, -3", "C) 1, 5", "D) 0, 6"] },
        { id: 2, type: "mcq", points: 3, text: "What is the nature of the roots of the equation 3x² - 4√3x + 4 = 0?", options: ["A) Real and Equal", "B) Real and Distinct", "C) Complex and Imaginary", "D) No roots exist"] }
      ],
      tf: [
        { id: 3, type: "tf", points: 2, text: "A quadratic equation with real coefficients can have exactly one complex root." },
        { id: 4, type: "tf", points: 2, text: "If the discriminant of ax² + bx + c = 0 is greater than zero, the roots are always rational." }
      ],
      descriptive: [
        { id: 5, type: "descriptive", points: 5, text: "Solve the equation x² + 7x + 10 = 0 by factorisation. Show each step clearly." },
        { id: 6, type: "descriptive", points: 10, text: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the journey. Find the original speed of the train." }
      ],
      alternatives: {
        mcq: [
          "What is the discriminant of the quadratic equation 2x² - 4x + 3 = 0?",
          "If one root of the quadratic equation px² - 14x + 8 = 0 is six times the other, find the value of p.",
          "Find the value of k for which the equation x² + kx + 4 = 0 has equal roots."
        ],
        tf: [
          "If the graph of a quadratic polynomial does not intersect the x-axis, its discriminant is negative.",
          "Every quadratic equation has at most two real roots.",
          "The quadratic formula can only be applied when the coefficients are real integers."
        ],
        descriptive: [
          "Solve the quadratic equation 2x² - 7x + 3 = 0 using the quadratic formula.",
          "The sum of the areas of two squares is 468 m². If the difference of their perimeters is 24 m, find the sides of the two squares.",
          "Formulate a quadratic equation whose roots are 3 + √5 and 3 - √5."
        ]
      }
    }
  },
  Science: {
    "Chemical Reactions": {
      mcq: [
        { id: 1, type: "mcq", points: 3, text: "Which of the following is a double displacement reaction?", options: ["A) Zn + H₂SO₄ → ZnSO₄ + H₂", "B) Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl", "C) 2H₂ + O₂ → 2H₂O", "D) CaCO₃ → CaO + CO₂"] },
        { id: 2, type: "mcq", points: 3, text: "What happens chemically when dilute hydrochloric acid is added to iron filings?", options: ["A) Hydrogen gas and iron chloride are produced.", "B) Chlorine gas and iron hydroxide are produced.", "C) No reaction takes place.", "D) Iron oxide and water are formed."] }
      ],
      tf: [
        { id: 3, type: "tf", points: 2, text: "Rusting of iron is an endothermic chemical reaction that happens in dry air." },
        { id: 4, type: "tf", points: 2, text: "In a redox reaction, oxidation and reduction always occur simultaneously." }
      ],
      descriptive: [
        { id: 5, type: "descriptive", points: 5, text: "Balance the chemical equation: Fe + H₂O → Fe₃O₄ + H₂. Identify the oxidant." },
        { id: 6, type: "descriptive", points: 10, text: "Define decomposition reactions. Give one example each of thermal, electrolytic, and photolytic decomposition reactions with balanced chemical equations." }
      ],
      alternatives: {
        mcq: [
          "Which gas is evolved when calcium carbonate reacts with dilute hydrochloric acid?",
          "Which of the following is an example of an exothermic reaction?",
          "What is the chemical name of quicklime?"
        ],
        tf: [
          "Combustion of natural gas is an endothermic reaction.",
          "Respiration is considered an exothermic reaction because heat energy is released.",
          "A catalyst is consumed during a chemical reaction to increase the yield."
        ],
        descriptive: [
          "Why are decomposition reactions called the opposite of combination reactions? Write equations for these reactions.",
          "Explain the term rancidity and state two methods used to prevent it in oily foods.",
          "A shiny brown colored element 'X' on heating in air becomes black in color. Name the element 'X' and the black colored compound formed."
        ]
      }
    }
  },
  English: {
    "Grammar & Composition": {
      mcq: [
        { id: 1, type: "mcq", points: 3, text: "Choose the correct modal verb: You _______ smoke in the school library. It is strictly forbidden.", options: ["A) must not", "B) need not", "C) should not", "D) cannot"] },
        { id: 2, type: "mcq", points: 3, text: "Identify the tense: 'By next December, our school will have been using the EduTrio ERP system for two years.'", options: ["A) Future Perfect", "B) Future Perfect Continuous", "C) Future Continuous", "D) Present Perfect Continuous"] }
      ],
      tf: [
        { id: 3, type: "tf", points: 2, text: "A passive voice sentence focuses attention on the person performing the action." },
        { id: 4, type: "tf", points: 2, text: "The word 'meticulous' means showing great attention to detail; very careful and precise." }
      ],
      descriptive: [
        { id: 5, type: "descriptive", points: 5, text: "Re-write the following passage, correcting all grammatical, punctuation, and spelling errors." },
        { id: 6, type: "descriptive", points: 10, text: "Write an editorial letter (120-150 words) addressing the concern of growing screen time among school students, proposing practical solutions." }
      ],
      alternatives: {
        mcq: [
          "Select the correct option to fill in the blank: Neither the teacher nor the students _______ present in the seminar yesterday.",
          "Choose the synonym for the word 'Epistemic':",
          "Identify the sentence that uses a conditional clause correctly:"
        ],
        tf: [
          "An intransitive verb can be converted into passive voice.",
          "Coordinating conjunctions are used to join independent clauses.",
          "A gerund functions as a verb in a sentence."
        ],
        descriptive: [
          "Write a short paragraph analyzing the quote: 'Education is not the filling of a pail, but the lighting of a fire.'",
          "Draft a notice for the school notice board inviting students to participate in the Annual Debate Competition.",
          "Explain the difference between a metaphor and a simile, giving two examples of each."
        ]
      }
    }
  },
  History: {
    "World War I": {
      mcq: [
        { id: 1, type: "mcq", points: 3, text: "Which alliance was formed by Germany, Austria-Hungary, and Italy in 1882?", options: ["A) Triple Entente", "B) Triple Alliance", "C) Central Powers", "D) Allied Alliance"] },
        { id: 2, type: "mcq", points: 3, text: "The immediate trigger for the outbreak of World War I was the assassination of:", options: ["A) Archduke Franz Ferdinand", "B) Kaiser Wilhelm II", "C) Tsar Nicholas II", "D) Woodrow Wilson"] }
      ],
      tf: [
        { id: 3, type: "tf", points: 2, text: "The Treaty of Versailles, signed in 1919, imposed heavy financial reparations on Germany." },
        { id: 4, type: "tf", points: 2, text: "The League of Nations successfully prevented international conflicts during the 1930s." }
      ],
      descriptive: [
        { id: 5, type: "descriptive", points: 5, text: "Briefly explain the role of the 'militarism' and 'alliance system' as underlying causes of World War I." },
        { id: 6, type: "descriptive", points: 10, text: "Analyze the social and economic consequences of World War I on European nations, detailing the changes in the workforce and inflation." }
      ],
      alternatives: {
        mcq: [
          "In which year did the United States officially enter World War I?",
          "What was the name of the German war strategy designed to avoid a two-front war against France and Russia?",
          "Which country signed the Treaty of Brest-Litovsk to withdraw from World War I?"
        ],
        tf: [
          "Trench warfare was highly mobile and resulted in quick territorial gains.",
          "The sinking of the Lusitania was a major factor in drawing the US into the war.",
          "Woodrow Wilson proposed the 'Fourteen Points' as a basis for peace negotiations."
        ],
        descriptive: [
          "Describe the technological innovations used during WWI and their impact on casualty rates.",
          "Explain the collapse of the Ottoman Empire following World War I.",
          "Assess the impact of the war on the Russian Revolution of 1917."
        ]
      }
    }
  }
};

interface AiExamBuilderSectionProps {
  onGetStarted: () => void;
}

export function AiExamBuilderSection({ onGetStarted }: AiExamBuilderSectionProps) {
  // Stepper State: 1 = Configure, 2 = Generate, 3 = Edit, 4 = Download
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Configuration State
  const [examType, setExamType] = useState<"Full Exam" | "Quiz" | "Practice Paper">("Full Exam");
  const [subject, setSubject] = useState<string>("Mathematics");
  const [classLevel, setClassLevel] = useState<string>("Class 10");
  const [section, setSection] = useState<string>("All Sections");
  const [topic, setTopic] = useState<string>("Quadratic Equations");
  const [schoolName, setSchoolName] = useState<string>("EduTrio International School");
  const [duration, setDuration] = useState<string>("2 hours");
  const [totalMarks, setTotalMarks] = useState<string>("100");
  const [difficulty, setDifficulty] = useState<string>("Mixed");
  const [specialInstructions, setSpecialInstructions] = useState<string>("Attempt all questions. All the best!");
  
  // Question types selected state
  const [qTypes, setQTypes] = useState({
    mcq: true,
    tf: true,
    descriptive: true,
  });

  // Generated Paper State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [editTempText, setEditTempText] = useState<string>("");

  // Loading Screen Sub-steps
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const loadingMessages = [
    "Analyzing board syllabus and cognitive patterns...",
    "Scanning question banks for balanced difficulty distribution...",
    "Drafting instructions and structuring sections...",
    "Validating question uniqueness and formatting final sheet...",
  ];

  // Map topic to default value when subject changes
  useEffect(() => {
    if (subject === "Mathematics") {
      setTopic("Quadratic Equations");
      setTotalMarks("100");
    } else if (subject === "Science") {
      setTopic("Chemical Reactions");
      setTotalMarks("80");
    } else if (subject === "English") {
      setTopic("Grammar & Composition");
      setTotalMarks("80");
    } else if (subject === "History") {
      setTopic("World War I");
      setTotalMarks("100");
    }
  }, [subject]);

  // Handle step-by-step loading animation
  useEffect(() => {
    if (step === 2) {
      setLoadingStep(0);
      const timers = [
        setTimeout(() => setLoadingStep(1), 600),
        setTimeout(() => setLoadingStep(2), 1200),
        setTimeout(() => setLoadingStep(3), 1800),
        setTimeout(() => {
          // Generate final list of questions based on selected database
          const db = QUESTION_DATABASE[subject]?.[topic] || QUESTION_DATABASE["Mathematics"]["Quadratic Equations"];
          
          const list: Question[] = [];
          if (qTypes.mcq) list.push(...db.mcq);
          if (qTypes.tf) list.push(...db.tf);
          if (qTypes.descriptive) list.push(...db.descriptive);
          
          setQuestions(list);
          setStep(3);
        }, 2500)
      ];

      return () => {
        timers.forEach(t => clearTimeout(t));
      };
    }
  }, [step, subject, topic, qTypes]);

  // Click handler for Generate
  const handleGenerate = () => {
    setStep(2);
  };

  // Inline question editing handlers
  const startEditing = (q: Question) => {
    setEditingQuestionId(q.id);
    setEditTempText(q.text);
  };

  const saveEdit = (id: number) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, text: editTempText } : q));
    setEditingQuestionId(null);
  };

  const cancelEdit = () => {
    setEditingQuestionId(null);
  };

  // Swap question with alternative
  const regenerateQuestion = (id: number, type: "mcq" | "tf" | "descriptive") => {
    const db = QUESTION_DATABASE[subject]?.[topic] || QUESTION_DATABASE["Mathematics"]["Quadratic Equations"];
    const alts = db.alternatives[type];
    if (alts && alts.length > 0) {
      // Pick a random alternative
      const randomIndex = Math.floor(Math.random() * alts.length);
      const newText = alts[randomIndex];
      setQuestions(prev => prev.map(q => q.id === id ? { ...q, text: newText } : q));
    }
  };

  // Simulate downloading success
  const triggerDownload = (format: string) => {
    console.log(`Downloading file as ${format}...`);
    setStep(4);
  };

  return (
    <section 
      id="ai-builder"
      className="py-24 px-6 bg-white overflow-hidden"
      aria-labelledby="ai-builder-heading"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 animate-pulse text-purple-600" />
            Next-Gen AI Capabilities
          </Badge>
          <h2 id="ai-builder-heading" className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
            AI Exam Paper Generator
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            Empower educators with an intelligent exam architect. Design high-fidelity, customized assessment papers aligned perfectly with school curricula in just seconds.
          </p>
        </div>

        {/* Dynamic Stepper Header */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Progress bar background line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2" />
          {/* Active progress fill line */}
          <div 
            className="absolute top-5 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 transition-all duration-500 ease-in-out" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          <div className="relative flex justify-between z-10">
            {[
              { num: 1, label: "Configure" },
              { num: 2, label: "Generate" },
              { num: 3, label: "Edit Paper" },
              { num: 4, label: "Download" },
            ].map(({ num, label }) => {
              const isActive = step === num;
              const isCompleted = step > num;
              return (
                <div key={num} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md",
                      isActive && "bg-indigo-600 text-white ring-4 ring-indigo-100 border-2 border-indigo-600",
                      isCompleted && "bg-emerald-500 text-white",
                      !isActive && !isCompleted && "bg-white border-2 border-slate-200 text-slate-500"
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : num}
                  </div>
                  <span 
                    className={cn(
                      "mt-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-300",
                      isActive ? "text-indigo-600 font-bold" : "text-slate-500"
                    )}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive AI Exam Builder Console */}
          <div className="lg:col-span-8">
            <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl ring-1 ring-slate-100">
              <CardContent className="p-0">
                
                {/* Panel Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                      <Sparkles className="h-6 w-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">Interactive Console</h3>
                      <p className="text-xs text-slate-300">Set exam metadata and click Generate to see AI in action</p>
                    </div>
                  </div>
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                    Live Demo
                  </Badge>
                </div>

                {/* Step 1: Form Configuration */}
                {step === 1 && (
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Exam Type Tabs */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exam Type</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { type: "Full Exam", icon: GraduationCap },
                          { type: "Quiz", icon: Sparkles },
                          { type: "Practice Paper", icon: BookOpen }
                        ].map(({ type, icon: Icon }) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setExamType(type as any)}
                            className={cn(
                              "flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-50 border cursor-pointer",
                              examType === type 
                                ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm ring-1 ring-indigo-600" 
                                : "bg-white border-slate-200 text-slate-600"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* General Metadata Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject *</label>
                        <div className="relative">
                          <select 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science (Chemistry)</option>
                            <option value="English">English Literature</option>
                            <option value="History">Modern World History</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class *</label>
                        <div className="relative">
                          <select 
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="Class 10">Class 10</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 8">Class 8</option>
                            <option value="Class 7">Class 7</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section</label>
                        <div className="relative">
                          <select 
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="All Sections">All Sections</option>
                            <option value="Section A">Section A</option>
                            <option value="Section B">Section B</option>
                            <option value="Section C">Section C</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Topic / Chapter (optional)</label>
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="e.g. Quadratic Equations, Chapter 5"
                          className="w-full bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">School / Institute Name</label>
                        <input
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</label>
                        <div className="relative">
                          <select 
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="1 hour">1 hour</option>
                            <option value="2 hours">2 hours</option>
                            <option value="3 hours">3 hours</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Marks</label>
                        <input
                          type="number"
                          value={totalMarks}
                          onChange={(e) => setTotalMarks(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty Level</label>
                        <div className="relative">
                          <select 
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="Mixed">Mixed</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Question Types checkboxes */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Types * (select all that apply)</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setQTypes(prev => ({ ...prev, mcq: !prev.mcq }))}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl text-left border transition-all duration-300 bg-white cursor-pointer",
                            qTypes.mcq ? "border-indigo-600 bg-indigo-50/20 text-indigo-950 font-medium animate-none" : "border-slate-200 text-slate-600"
                          )}
                        >
                          <div className={cn("w-5 h-5 rounded flex items-center justify-center border", qTypes.mcq ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300")}>
                            {qTypes.mcq && <Check className="h-3 w-3" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">Multiple Choice</p>
                            <p className="text-2xs text-slate-500">4 options per item</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setQTypes(prev => ({ ...prev, tf: !prev.tf }))}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl text-left border transition-all duration-300 bg-white cursor-pointer",
                            qTypes.tf ? "border-indigo-600 bg-indigo-50/20 text-indigo-950 font-medium animate-none" : "border-slate-200 text-slate-600"
                          )}
                        >
                          <div className={cn("w-5 h-5 rounded flex items-center justify-center border", qTypes.tf ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300")}>
                            {qTypes.tf && <Check className="h-3 w-3" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">True / False</p>
                            <p className="text-2xs text-slate-500">Binary options</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setQTypes(prev => ({ ...prev, descriptive: !prev.descriptive }))}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl text-left border transition-all duration-300 bg-white cursor-pointer",
                            qTypes.descriptive ? "border-indigo-600 bg-indigo-50/20 text-indigo-950 font-medium animate-none" : "border-slate-200 text-slate-600"
                          )}
                        >
                          <div className={cn("w-5 h-5 rounded flex items-center justify-center border", qTypes.descriptive ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300")}>
                            {qTypes.descriptive && <Check className="h-3 w-3" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">Descriptive Answer</p>
                            <p className="text-2xs text-slate-500">Detailed long answers</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Special Instructions (optional)</label>
                      <textarea
                        rows={3}
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. Write your index number clearly. Scientific calculators are allowed."
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Submit Bar */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <Button 
                        onClick={handleGenerate}
                        className="bg-indigo-600 text-white hover:bg-indigo-700 py-3.5 px-8 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:shadow-indigo-600/40 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Sparkles className="h-4 w-4" />
                        Generate with AI
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Generation Loading Animation */}
                {step === 2 && (
                  <div className="p-12 flex flex-col items-center justify-center min-h-[450px] space-y-8 bg-slate-50/50">
                    <div className="relative">
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 rounded-full bg-indigo-600/20 animate-ping" />
                      {/* Outer Rotating border */}
                      <div className="w-24 h-24 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />
                      {/* Inner Sparkle Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-indigo-600 animate-pulse" />
                      </div>
                    </div>

                    <div className="text-center space-y-2 max-w-md">
                      <h4 className="font-bold text-xl text-slate-900">Synthesizing Exam Paper</h4>
                      <p className="text-sm text-slate-500 font-sans">Please wait while the AI coordinates with your curriculum database...</p>
                    </div>

                    {/* checklist progression */}
                    <div className="w-full max-w-sm space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm font-sans">
                      {loadingMessages.map((msg, idx) => {
                        const isDone = loadingStep > idx;
                        const isCurrent = loadingStep === idx;
                        return (
                          <div 
                            key={idx} 
                            className={cn(
                              "flex items-center gap-3 transition-opacity duration-300",
                              isDone ? "text-slate-800 opacity-100" : isCurrent ? "text-indigo-600 font-medium opacity-100" : "text-slate-400 opacity-50"
                            )}
                          >
                            <div className="flex-shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                              ) : isCurrent ? (
                                <RotateCw className="h-4 w-4 animate-spin text-indigo-600" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-slate-300" />
                              )}
                            </div>
                            <span className="text-xs">{msg}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Edit Generated Paper */}
                {step === 3 && (
                  <div className="p-6 md:p-8 space-y-6">
                    
                    {/* Header Action Menu */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pb-4 border-b border-slate-100">
                      <button 
                        onClick={() => setStep(1)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Edit Configuration
                      </button>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setStep(2);
                          }}
                          className="border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                        >
                          <RotateCw className="h-4 w-4 mr-2" />
                          Regenerate Whole Set
                        </Button>
                      </div>
                    </div>

                    {/* High-Fidelity Exam Sheet Paper */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-inner p-8 md:p-12 space-y-8 max-h-[550px] overflow-y-auto font-serif relative">
                      
                      {/* Watermark/Draft overlay for premium mock effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-extrabold text-[8vw] select-none pointer-events-none rotate-12 uppercase tracking-widest opacity-25">
                        EduTrio AI
                      </div>

                      {/* Header */}
                      <div className="text-center space-y-2 border-b-2 border-slate-900 pb-5">
                        <h4 className="font-bold text-2xl uppercase tracking-wider text-slate-900 font-serif">{schoolName}</h4>
                        <p className="font-semibold text-sm tracking-wide text-slate-700 font-sans">
                          {examType === "Full Exam" ? "First Term Summative Examination" : examType === "Practice Paper" ? "Practice Assessment Sheet" : "Weekly Diagnostic Quiz"}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-sans font-bold text-slate-600 pt-3 max-w-2xl mx-auto">
                          <div className="border border-slate-200 p-1.5 rounded bg-slate-50">SUBJECT: {subject.toUpperCase()}</div>
                          <div className="border border-slate-200 p-1.5 rounded bg-slate-50">CLASS: {classLevel}</div>
                          <div className="border border-slate-200 p-1.5 rounded bg-slate-50">MAX MARKS: {totalMarks}</div>
                          <div className="border border-slate-200 p-1.5 rounded bg-slate-50">TIME: {duration.toUpperCase()}</div>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="space-y-1.5 font-sans">
                        <p className="font-bold text-xs text-slate-800 uppercase tracking-wide">General Instructions:</p>
                        <ul className="list-decimal pl-5 text-xs text-slate-600 space-y-1">
                          <li>{specialInstructions || "Attempt all questions. All questions are compulsory."}</li>
                          <li>All answers must be written in the answer booklet provided.</li>
                          <li>Read each question carefully before attempting it.</li>
                        </ul>
                      </div>

                      {/* Question Sheet */}
                      <div className="space-y-8 font-sans">
                        
                        {/* Section A: Objective (MCQs & T/F) */}
                        <div className="space-y-4">
                          <h5 className="font-bold text-sm text-slate-900 uppercase border-b border-slate-300 pb-1">Assessment Questions</h5>
                          
                          <div className="space-y-6">
                            {questions.map((q, idx) => {
                              const isEditing = editingQuestionId === q.id;
                              
                              return (
                                <div key={q.id} className="group relative border border-transparent hover:border-slate-200 hover:bg-slate-50/50 p-3 rounded-lg transition-all duration-200">
                                  
                                  {/* Point tag & action buttons */}
                                  <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => startEditing(q)}
                                      className="p-1.5 hover:bg-indigo-100 hover:text-indigo-700 rounded text-slate-500 transition-colors cursor-pointer"
                                      title="Edit question text"
                                    >
                                      <Edit3 className="h-3.5 w-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => regenerateQuestion(q.id, q.type)}
                                      className="p-1.5 hover:bg-purple-100 hover:text-purple-700 rounded text-slate-500 transition-colors cursor-pointer"
                                      title="Regenerate this specific question"
                                    >
                                      <RotateCw className="h-3.5 w-3.5" />
                                    </button>
                                  </div>

                                  <div className="pr-16">
                                    <div className="flex gap-2 items-start">
                                      <span className="font-bold text-sm text-slate-900">{idx + 1}.</span>
                                      
                                      {isEditing ? (
                                        <div className="flex-grow space-y-2">
                                          <textarea 
                                            value={editTempText}
                                            onChange={(e) => setEditTempText(e.target.value)}
                                            className="w-full text-sm border border-indigo-400 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                                            rows={2}
                                          />
                                          <div className="flex gap-1.5 justify-end">
                                            <button 
                                              onClick={cancelEdit}
                                              className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded cursor-pointer"
                                            >
                                              Cancel
                                            </button>
                                            <button 
                                              onClick={() => saveEdit(q.id)}
                                              className="px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="space-y-2 w-full">
                                          <p className="text-sm font-medium text-slate-900 leading-relaxed font-serif">{q.text}</p>
                                          
                                          {/* Render Options if MCQ */}
                                          {q.options && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4 pt-1">
                                              {q.options.map(opt => (
                                                <div key={opt} className="text-xs text-slate-600 font-serif">
                                                  {opt}
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                          {/* Render True/False Choice Placeholder */}
                                          {q.type === "tf" && (
                                            <div className="flex gap-4 pl-4 pt-1 text-xs text-slate-500 font-sans italic">
                                              <span>[ ] True</span>
                                              <span>[ ] False</span>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="absolute right-3 top-3 text-xs font-bold text-slate-400 font-sans group-hover:opacity-0 transition-opacity">
                                    [{q.points} Pts]
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-slate-100 font-sans">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <AlertCircle className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                        <span>Hover over any question to Edit text or Regenerate it instantly.</span>
                      </div>
                      
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 sm:flex-initial py-3.5 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 text-sm transition-colors text-center cursor-pointer"
                        >
                          Reset Configuration
                        </button>
                        
                        <Button
                          onClick={() => triggerDownload("pdf")}
                          className="flex-1 sm:flex-initial bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 py-3.5 px-8 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:shadow-indigo-600/40 hover:-translate-y-0.5 cursor-pointer"
                        >
                          <Download className="h-4 w-4" />
                          Download Test Paper
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Download Options & Success */}
                {step === 4 && (
                  <div className="p-12 text-center min-h-[450px] flex flex-col justify-center items-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    
                    <div className="space-y-2 max-w-md font-sans">
                      <h4 className="font-extrabold text-2xl text-slate-900">Download Ready!</h4>
                      <p className="text-sm text-slate-500">Your professional exam paper for {subject} ({classLevel}) has been compiled and is ready for offline use.</p>
                    </div>

                    {/* Download options grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg pt-4 font-sans">
                      
                      <button
                        onClick={() => {
                          alert("Downloading PDF Version...");
                        }}
                        className="flex flex-col items-center justify-center p-5 rounded-2xl bg-rose-50/50 hover:bg-rose-50 border border-rose-100 hover:border-rose-300 text-rose-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer"
                      >
                        <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <FileText className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-sm">Download PDF</span>
                        <span className="text-2xs text-rose-500/80 mt-1">Print-ready PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          alert("Downloading MS Word Document...");
                        }}
                        className="flex flex-col items-center justify-center p-5 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-300 text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer"
                      >
                        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <FileSpreadsheet className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-sm">MS Word Document</span>
                        <span className="text-2xs text-blue-500/80 mt-1">Editable DOCX format</span>
                      </button>

                      <button
                        onClick={() => {
                          alert("Integrating with LMS Database...");
                        }}
                        className="flex flex-col items-center justify-center p-5 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 hover:border-indigo-300 text-indigo-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer"
                      >
                        <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Layers className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-sm">Sync to LMS Portal</span>
                        <span className="text-2xs text-indigo-500/80 mt-1">Publish to Student portal</span>
                      </button>
                    </div>

                    <div className="pt-6 font-sans">
                      <button
                        onClick={() => setStep(1)}
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Generate Another Exam Paper
                      </button>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Right Column: Highlighted Benefits for Schools */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main benefits card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-600 text-white rounded-2xl overflow-hidden relative">
              {/* Highlight background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <div className="p-2 rounded-lg bg-white/10 text-amber-400">
                    <BookOpenCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Why Schools Love It</h3>
                    <p className="text-xs text-indigo-200">Revolutionizing school assessments</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Clock,
                      title: "90% Administrative Time Saved",
                      description: "Eliminate the grueling hours teachers spend researching syllabus topics, balancing difficulties, and manually formatting MS Word layouts.",
                      color: "text-amber-400"
                    },
                    {
                      icon: ShieldCheck,
                      title: "Instant Multi-Set Generation",
                      description: "Defeat cheating automatically. Generate Sets A, B, and C with completely distinct questions mapped to equivalent difficulty levels with one single click.",
                      color: "text-cyan-400"
                    },
                    {
                      icon: Layers,
                      title: "Curriculum & Chapter Specificity",
                      description: "Complete control. Generate tests for specific chapters, units, national boards, or individual learning standards, ensuring precise academic alignment.",
                      color: "text-emerald-400"
                    },
                    {
                      icon: Zap,
                      title: "Cognitive Balance (Bloom's Taxonomy)",
                      description: "AI automatically structures papers with a healthy balance of remembering, analytical, and critical thinking question types based on customized difficulty ratios.",
                      color: "text-pink-400"
                    }
                  ].map(({ icon: Icon, title, description, color }) => (
                    <div key={title} className="flex gap-4 items-start group">
                      <div className={cn("p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors flex-shrink-0", color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors leading-tight">{title}</h4>
                        <p className="text-xs text-indigo-100 leading-relaxed font-light">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="bg-indigo-900/40 rounded-xl p-4 border border-indigo-500/20 text-center space-y-2">
                    <div className="text-2xl font-extrabold text-amber-400">Save 20+ Hours / Month</div>
                    <p className="text-[9px] text-indigo-200 uppercase tracking-widest font-bold font-sans">Estimated Average Time Saved Per Teacher</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Metrics / Interactive Callout */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden border-l-4 border-indigo-600">
              <CardContent className="p-5 space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Need Custom Board Integration?</h4>
                    <p className="text-xs text-slate-500 font-sans font-medium">Support for CBSE, ICSE, IB, and Cambridge curricula.</p>
                  </div>
                </div>
                
                <Button 
                  onClick={onGetStarted}
                  variant="outline" 
                  className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  Contact Admin Portal Team
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </section>
  );
}
