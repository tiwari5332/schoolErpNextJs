"use client";

import React, { useState, useEffect, useCallback } from "react";
import { User, School, Mail, Phone, Calendar, MessageSquare, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScheduleDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  fullName: string;
  schoolName: string;
  schoolSize: string;
  email: string;
  phone: string;
  dateTime: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  schoolName?: string;
  email?: string;
  phone?: string;
  dateTime?: string;
}

export function ScheduleDemoModal({ isOpen, onClose }: ScheduleDemoModalProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    schoolName: "",
    schoolSize: "250-500",
    email: "",
    phone: "",
    dateTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [animateShow, setAnimateShow] = useState(false);

  // Smooth animation trigger on open
  useEffect(() => {
    if (!isOpen) return;
    
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setAnimateShow(true), 50);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formValues.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formValues.schoolName.trim()) newErrors.schoolName = "School name is required";
    
    if (!formValues.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formValues.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(formValues.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formValues.dateTime) {
      newErrors.dateTime = "Please select a preferred date and time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        alert(data.error || "Failed to schedule demo. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = useCallback(() => {
    setFormValues({
      fullName: "",
      schoolName: "",
      schoolSize: "250-500",
      email: "",
      phone: "",
      dateTime: "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  }, []);

  const handleClose = () => {
    setAnimateShow(false);
    setTimeout(() => {
      onClose();
      handleReset();
    }, 200); // Wait for transition
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        animateShow ? "bg-black/60 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
      )}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
          animateShow ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <div className="p-8">
            <div className="mb-6">
              <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-3 py-1 mb-2">
                Live Consultation
              </Badge>
              <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">
                Schedule a Personal Demo
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                See how EduTrio can transform your school operations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="fullName" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={cn(
                        "w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
                        errors.fullName ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-700"
                      )}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName}</p>}
                </div>

                {/* School Name */}
                <div className="space-y-1">
                  <label htmlFor="schoolName" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    School Name
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      value={formValues.schoolName}
                      onChange={handleChange}
                      placeholder="Greenwood Academy"
                      className={cn(
                        "w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
                        errors.schoolName ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-700"
                      )}
                    />
                  </div>
                  {errors.schoolName && <p className="text-xs text-rose-500">{errors.schoolName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Work Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="you@school.edu"
                      className={cn(
                        "w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
                        errors.email ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-700"
                      )}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                      className={cn(
                        "w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
                        errors.phone ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-700"
                      )}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* School Size */}
                <div className="space-y-1">
                  <label htmlFor="schoolSize" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    School Size
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                    <select
                      id="schoolSize"
                      name="schoolSize"
                      value={formValues.schoolSize}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="under-250">Under 250 students</option>
                      <option value="250-500">250 - 500 students</option>
                      <option value="500-1000">500 - 1000 students</option>
                      <option value="1000+">1000+ students</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div className="space-y-1">
                  <label htmlFor="dateTime" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Preferred Date & Time
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                    <input
                      type="datetime-local"
                      id="dateTime"
                      name="dateTime"
                      value={formValues.dateTime}
                      onChange={handleChange}
                      className={cn(
                        "w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
                        errors.dateTime ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-700"
                      )}
                    />
                  </div>
                  {errors.dateTime && <p className="text-xs text-rose-500">{errors.dateTime}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Additional Details (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about specific features you want to see..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  "Confirm Demo Schedule"
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Demo Scheduled Successfully!
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              Thank you, <strong className="text-slate-700 dark:text-slate-200">{formValues.fullName}</strong>. A calendar invite has been sent to <span className="text-indigo-600 dark:text-indigo-400 font-medium">{formValues.email}</span>.
            </p>
            
            <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-800 text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">School:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{formValues.schoolName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled For:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {new Date(formValues.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
            </div>

            <Button
              onClick={handleClose}
              className="px-8 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-medium transition-all"
            >
              Close Window
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
