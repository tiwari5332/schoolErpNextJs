"use client";

import { useState, useCallback } from "react";
import { X, Send, User, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickContactModal({ isOpen, onClose }: QuickContactModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Clean mobile input
    const cleanMobile = mobile.replace(/[\s\-\+\(\)]/g, "");
    const formattedMobile = cleanMobile.startsWith("91") && cleanMobile.length > 10 
      ? cleanMobile.slice(2) 
      : cleanMobile;

    if (!formattedMobile) {
      setError("Mobile number is required.");
      return;
    }

    if (!/^\d{10}$/.test(formattedMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Dispatch lead to email notification endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: formattedMobile,
        }),
      });

      // 2. Format business-aligned WhatsApp message
      const userName = name.trim() ? name.trim() : "Not provided";
      const messageText = `Greetings EduTrio Team,\n\nI am interested in EduTrio School ERP for our institution and would like to request product details and a callback.\n\n📌 Inquiry Details:\n• Name / School: ${userName}\n• Mobile Number: +91 ${formattedMobile}\n\nLooking forward to speaking with your team.`;
      
      const whatsappUrl = `https://wa.me/917398647812?text=${encodeURIComponent(messageText)}`;

      // 3. Mark submitted state
      setIsSubmitted(true);

      // 4. Trigger WhatsApp open (works on mobile app & desktop web)
      setTimeout(() => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 400);

    } catch (err) {
      console.error("Error submitting contact form:", err);
      // Fallback: still attempt WhatsApp redirection even if network email endpoint fails
      const userName = name.trim() ? name.trim() : "Not provided";
      const messageText = `Greetings EduTrio Team,\n\nI am interested in EduTrio School ERP for our institution and would like to request product details and a callback.\n\n📌 Inquiry Details:\n• Name / School: ${userName}\n• Mobile Number: +91 ${formattedMobile}\n\nLooking forward to speaking with your team.`;
      const whatsappUrl = `https://wa.me/917398647812?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [name, mobile]);

  const handleResetAndClose = useCallback(() => {
    setName("");
    setMobile("");
    setError(null);
    setIsSubmitted(false);
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && handleResetAndClose()}>
      <DialogContent align="bottom-right" className="mb-2 sm:mb-4 sm:mr-2">
        {/* Top Header with EduTrio Project Theme (Indigo-Purple Gradient) & WhatsApp Badge */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-4 sm:p-6 text-white overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl pointer-events-none" />
          
          {/* Close button inside header */}
          <DialogClose onClick={handleResetAndClose} className="top-3 right-3 sm:top-4 sm:right-4 text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer z-30">
            <X className="h-4.5 w-4.5" />
          </DialogClose>

          <div className="flex items-center gap-3 sm:gap-3.5 relative z-10">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-emerald-500/20 backdrop-blur-md flex items-center justify-center border border-emerald-400/30 shadow-lg shrink-0">
              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                WhatsApp Support & Callback
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-indigo-100 mt-0.5 font-medium flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                EduTrio Support (+91 7398647812)
              </p>
            </div>
          </div>
        </div>

        {/* Form Body / Success state */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 font-sans">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto animate-bounce border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Request Sent Successfully!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  Opening WhatsApp to start your direct chat with <strong>EduTrio Support (+91 7398647812)</strong>. An email notification has also been dispatched to our team.
                </p>
              </div>
              <div className="pt-3">
                <Button
                  onClick={handleResetAndClose}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div className="space-y-1.5 w-full">
                <Label htmlFor="contact-name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Your Name / School Name
                </Label>
                <div className="relative flex items-center w-full">
                  <User className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Principal Sharma / St. Xavier School"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="w-full h-11 pl-10 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              {/* Mobile number field */}
              <div className="space-y-1.5 w-full">
                <Label htmlFor="contact-mobile" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Mobile Number
                </Label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-xs border-r border-slate-200 dark:border-slate-700 pr-2.5 z-10">
                    <Phone className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-slate-700 dark:text-slate-200 font-bold">+91</span>
                  </div>
                  <Input
                    id="contact-mobile"
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setMobile(val);
                      if (error) setError(null);
                    }}
                    className="w-full h-11 pl-20 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl text-sm font-medium tracking-wide transition-all"
                  />
                </div>
                {error && (
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in">
                    <span>⚠️</span> {error}
                  </p>
                )}
              </div>

              {/* Informational reassurance */}
              <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Submitting will open direct WhatsApp chat with <strong>EduTrio Support (+91 7398647812)</strong> & dispatch callback request to our team.
                </p>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <span>Connecting...</span>
                ) : (
                  <>
                    <span>Chat on WhatsApp & Request Call</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
