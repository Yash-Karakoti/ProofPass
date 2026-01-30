import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition, staggerItem } from "@/components/PageTransition";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Sparkles, 
  Copy, 
  CheckCircle2,
  ArrowRight,
  Clock
} from "lucide-react";

const mockCredentials = [
  { id: "1", name: "Bachelor of Computer Science", type: "Degree" },
  { id: "2", name: "AWS Solutions Architect", type: "Course" },
  { id: "3", name: "React Advanced Patterns", type: "Skill" },
];

const purposes = [
  { value: "job", label: "Job application" },
  { value: "scholarship", label: "Scholarship" },
  { value: "exam", label: "Exam eligibility" },
  { value: "other", label: "Other" },
];

const validityOptions = [
  { value: 0, label: "10 minutes", duration: "10 min" },
  { value: 1, label: "1 hour", duration: "1 hour" },
  { value: 2, label: "24 hours", duration: "24 hours" },
];

export default function GenerateProof() {
  const [selectedCredential, setSelectedCredential] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [validityIndex, setValidityIndex] = useState<number[]>([1]);
  const [oneTimeUse, setOneTimeUse] = useState(true);
  const [generatedProof, setGeneratedProof] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProof = async () => {
    setIsGenerating(true);
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const proofId = `PP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setGeneratedProof(proofId);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (generatedProof) {
      navigator.clipboard.writeText(generatedProof);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setGeneratedProof(null);
    setSelectedCredential("");
    setPurpose("");
    setValidityIndex([1]);
    setOneTimeUse(true);
  };

  const isFormValid = selectedCredential && purpose;
  const currentValidity = validityOptions[validityIndex[0]];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <PageTransition className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div variants={staggerItem} className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3">Generate Proof</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Create a privacy-preserving proof that verifies your credential without revealing sensitive details.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!generatedProof && !isGenerating ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Form Section */}
                <motion.div variants={staggerItem}>
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Proof Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Credential Select */}
                      <div className="space-y-2">
                        <Label htmlFor="credential">Select Credential</Label>
                        <Select value={selectedCredential} onValueChange={setSelectedCredential}>
                          <SelectTrigger id="credential" className="bg-secondary/50">
                            <SelectValue placeholder="Choose a credential" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {mockCredentials.map((cred) => (
                              <SelectItem key={cred.id} value={cred.id}>
                                <span className="flex items-center gap-2">
                                  {cred.name}
                                  <span className="text-xs text-muted-foreground">({cred.type})</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Purpose Select */}
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Proof Purpose</Label>
                        <Select value={purpose} onValueChange={setPurpose}>
                          <SelectTrigger id="purpose" className="bg-secondary/50">
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {purposes.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Validity Slider */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Proof Validity Duration</Label>
                          <span className="text-sm font-medium text-primary flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {currentValidity.duration}
                          </span>
                        </div>
                        <Slider
                          value={validityIndex}
                          onValueChange={setValidityIndex}
                          max={2}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          {validityOptions.map((opt, i) => (
                            <span key={i} className={validityIndex[0] === i ? "text-primary font-medium" : ""}>
                              {opt.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* One-time Use Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                        <div className="space-y-0.5">
                          <Label htmlFor="one-time" className="cursor-pointer">One-time use</Label>
                          <p className="text-xs text-muted-foreground">
                            Proof becomes invalid after first verification
                          </p>
                        </div>
                        <Switch
                          id="one-time"
                          checked={oneTimeUse}
                          onCheckedChange={setOneTimeUse}
                        />
                      </div>

                      <Button
                        onClick={handleGenerateProof}
                        disabled={!isFormValid}
                        variant="hero"
                        size="lg"
                        className="w-full"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Proof
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Privacy Explanation Panel */}
                <motion.div variants={staggerItem}>
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-center">Privacy Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        {/* What verifier learns */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-accent font-medium">
                            <Eye className="w-4 h-4" />
                            What the verifier learns
                          </div>
                          <ul className="space-y-3">
                            {[
                              "Yes/No eligibility",
                              "Proof validity",
                              "Purpose",
                            ].map((item, index) => (
                              <motion.li 
                                key={item} 
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-accent" />
                                </div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* What stays private */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <EyeOff className="w-4 h-4" />
                            What stays private
                          </div>
                          <ul className="space-y-3">
                            {[
                              "Credential content",
                              "Issuer details",
                              "Dates",
                              "Wallet history",
                            ].map((item, index) => (
                              <motion.li 
                                key={item} 
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                              >
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                  <X className="w-3 h-3 text-primary" />
                                </div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                        <p className="text-sm text-center text-muted-foreground">
                          <span className="text-primary font-medium">Zero-knowledge proofs</span> ensure verifiers can confirm eligibility without accessing your actual documents.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ) : isGenerating ? (
              /* Generating State */
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg mx-auto"
              >
                <Card className="glass-card">
                  <CardContent className="py-12 text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <h2 className="text-xl font-semibold mb-2">Generating Proof...</h2>
                    <p className="text-muted-foreground">
                      Creating your privacy-preserving credential proof
                    </p>
                    <motion.div 
                      className="mt-6 h-1 bg-secondary rounded-full overflow-hidden max-w-xs mx-auto"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="max-w-lg mx-auto"
              >
                <Card className="glass-card">
                  <CardContent className="pt-8 pb-8 text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                      </motion.div>
                    </motion.div>

                    <motion.h2 
                      className="text-2xl font-bold text-foreground mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Proof Generated!
                    </motion.h2>
                    <motion.p 
                      className="text-muted-foreground mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Your privacy-preserving proof is ready to share.
                    </motion.p>

                    <motion.div 
                      className="p-4 rounded-lg bg-secondary/50 border border-border mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="text-xs text-muted-foreground mb-2 block">Proof ID</Label>
                      <div className="flex items-center justify-center gap-3">
                        <code className="text-2xl font-mono font-bold text-primary tracking-wider">
                          {generatedProof}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={copyToClipboard}
                          className="shrink-0"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check className="w-4 h-4 text-accent" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Copy className="w-4 h-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="grid grid-cols-3 gap-4 text-sm mb-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="p-3 rounded-lg bg-secondary/30">
                        <div className="text-muted-foreground text-xs mb-1">Validity</div>
                        <div className="font-medium text-foreground">{currentValidity.duration}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/30">
                        <div className="text-muted-foreground text-xs mb-1">Usage</div>
                        <div className="font-medium text-foreground">{oneTimeUse ? "One-time" : "Multi-use"}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/30">
                        <div className="text-muted-foreground text-xs mb-1">Status</div>
                        <div className="font-medium text-accent">Active</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex flex-col sm:flex-row gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button variant="hero" className="flex-1" asChild>
                        <Link to={`/proof-details/${generatedProof}`}>
                          View Proof Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" onClick={resetForm} className="flex-1">
                        Generate Another
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
