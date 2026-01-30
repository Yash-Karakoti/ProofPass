import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronDown, ChevronUp, Calendar, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition, staggerItem } from "@/components/PageTransition";
import { useToast } from "@/hooks/use-toast";

const credentialTypes = [
  { value: "degree", label: "Degree" },
  { value: "course", label: "Course" },
  { value: "skill", label: "Skill" },
  { value: "other", label: "Other" },
];

export default function CreateCredential() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showNotes, setShowNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    issuer: "",
    dateIssued: undefined as Date | undefined,
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type) {
      toast({
        title: "Missing required fields",
        description: "Please fill in credential name and type.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock submission delay to simulate network/contract call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Credential saved privately",
      description: "Your credential has been stored securely (demo).",
    });
    
    // Redirect after showing success
    setTimeout(() => {
      navigate("/my-credentials");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <PageTransition className="max-w-xl mx-auto">
          {/* Page Header */}
          <motion.div variants={staggerItem} className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Create Credential</h1>
            <p className="text-muted-foreground">
              Store your credential privately and securely
            </p>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div 
            variants={staggerItem}
            className="glass-card p-4 rounded-xl border border-primary/30 bg-primary/5 mb-8"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  This credential is stored privately.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  No one can see it unless you generate a proof.
                </p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              /* Form */
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={staggerItem}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="glass-card p-6 rounded-xl space-y-5">
                  {/* Credential Name */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="name" className="text-sm font-medium">
                      Credential Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Bachelor of Computer Science"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </motion.div>

                  {/* Credential Type */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Label htmlFor="type" className="text-sm font-medium">
                      Credential Type <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select credential type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        {credentialTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Issuer Name */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="issuer" className="text-sm font-medium">
                      Issuer Name{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="issuer"
                      placeholder="e.g., MIT, Coursera, Company Name"
                      value={formData.issuer}
                      onChange={(e) =>
                        setFormData({ ...formData, issuer: e.target.value })
                      }
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </motion.div>

                  {/* Date Issued */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label className="text-sm font-medium">
                      Date Issued{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-secondary/50 border-border/50 hover:bg-secondary",
                            !formData.dateIssued && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.dateIssued ? (
                            format(formData.dateIssued, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-border z-50" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.dateIssued}
                          onSelect={(date) =>
                            setFormData({ ...formData, dateIssued: date })
                          }
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </motion.div>

                  {/* Notes Toggle */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowNotes(!showNotes)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: showNotes ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                      {showNotes ? "Hide notes" : "Add notes"}
                    </button>
                    
                    <AnimatePresence>
                      {showNotes && (
                        <motion.div 
                          className="mt-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Textarea
                            id="notes"
                            placeholder="Add any private notes about this credential..."
                            value={formData.notes}
                            onChange={(e) =>
                              setFormData({ ...formData, notes: e.target.value })
                            }
                            className="bg-secondary/50 border-border/50 focus:border-primary min-h-[100px] resize-none"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span 
                          className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Saving...
                      </span>
                    ) : (
                      "Save Credential"
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-xl text-center"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.h2 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Credential Saved!
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Redirecting to your credentials...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
