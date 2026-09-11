"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How secure is our school and student data?",
    answer: "Security is our highest priority. EduTrio is fully compliant with COPPA (Children's Online Privacy Protection Act) and FERPA (Family Educational Rights and Privacy Act) standards. All data is protected with 256-bit encryption in transit and end-to-end secure hosting protocols with automated daily database backups."
  },
  {
    question: "Can we import our existing student records from Excel sheets?",
    answer: "Yes, completely! We understand migration can be stressful, which is why we offer a Zero-Friction Migration Guarantee. Our technical team imports and cleans all your legacy spreadsheets and database records into EduTrio free of charge within 48 hours."
  },
  {
    question: "What curriculum boards and syllabus standards do you support?",
    answer: "EduTrio's academic modules and AI Exam Builder support a diverse range of standards including CBSE, ICSE, IB (International Baccalaureate), Cambridge Assessment, and custom school-defined curricula. You can pre-select standard chapters or upload your own textbook syllabus."
  },
  {
    question: "Do you offer training and onboarding for teachers?",
    answer: "Yes, absolutely! Every subscription comes with free live training sessions for teachers and administrators. We also provide a comprehensive video tutorial library, user manuals, and 24/7 priority customer support to ensure your staff transitions smoothly."
  },
  {
    question: "Are there any hidden setup fees or contracts?",
    answer: "No. EduTrio operates on transparent monthly or yearly subscriptions with zero hidden installation fees, server configuration charges, or software onboarding fees. You can cancel, upgrade, or downgrade your plan at any time."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section 
      id="faq" 
      className="py-10 sm:py-16 md:py-24 px-3 sm:px-6 bg-slate-50/70 border-b border-slate-200/50"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="Got Questions?"
          badgeClassName="bg-indigo-100 text-indigo-700"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about setting up and running EduTrio at your school"
          className="mb-8 sm:mb-16"
        />

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen 
                    ? "border-indigo-200 bg-indigo-50/20 shadow-sm" 
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex gap-3.5 items-start">
                    <HelpCircle className={cn(
                      "h-5 w-5 mt-0.5 flex-shrink-0 transition-colors",
                      isOpen ? "text-indigo-600" : "text-slate-400"
                    )} />
                    <span className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-slate-50",
                    isOpen ? "bg-indigo-600 text-white rotate-180" : "text-slate-500 hover:bg-slate-100"
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <div 
                  className={cn(
                    "transition-all duration-300 overflow-hidden font-sans",
                    isOpen ? "max-h-[300px] border-t border-indigo-100/50" : "max-h-0"
                  )}
                >
                  <div className="p-6 text-sm md:text-base text-slate-600 leading-relaxed bg-white/50">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
