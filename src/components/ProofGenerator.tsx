import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrivacyTooltip } from "@/components/PrivacyTooltip";
import { Shield, ArrowRight, Check, Copy, Clock, Target, User } from "lucide-react";

const credentialTypes = [
  { value: "age", label: "Age Verification", description: "Prove you're over a certain age" },
  { value: "identity", label: "Identity Proof", description: "Verify your identity without exposing documents" },
  { value: "address", label: "Address Verification", description: "Confirm residency without sharing full address" },
  { value: "employment", label: "Employment Status", description: "Prove current employment" },
  { value: "income", label: "Income Bracket", description: "Verify income range without exact figures" },
];

const expiryOptions = [
  { value: "15m", label: "15 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
];

export function ProofGenerator() {
  const [step, setStep] = useState(1);
  const [credentialType, setCredentialType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [generatedProof, setGeneratedProof] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    // Mock proof generation
    const proofId = `PP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setGeneratedProof(proofId);
    setStep(4);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedProof);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setStep(1);
    setCredentialType("");
    setPurpose("");
    setRecipient("");
    setExpiry("");
    setGeneratedProof("");
  };

  return (
    <section id="generate" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Generate a <span className="gradient-text">Proof</span>
            </h2>
            <p className="text-muted-foreground">
              Create a secure, privacy-preserving credential proof in seconds.
            </p>
          </div>

          <div className="glass-card p-8 glow-primary">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step >= s
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`w-full h-0.5 mx-2 transition-all ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                      style={{ width: "60px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Credential Type */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Select Credential Type</h3>
                  <PrivacyTooltip content="Choose what type of credential you want to prove. Your actual document data never leaves your device." />
                </div>
                <div className="grid gap-3">
                  {credentialTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setCredentialType(type.value);
                        setStep(2);
                      }}
                      className={`p-4 rounded-lg border text-left transition-all hover:border-primary/50 ${
                        credentialType === type.value
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/50"
                      }`}
                    >
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Purpose & Recipient */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Purpose & Recipient</h3>
                  <PrivacyTooltip content="Binding proof to a specific purpose and recipient prevents misuse. The proof will only be valid for this exact use case." />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      placeholder="e.g., Apartment rental application"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="mt-2 bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      placeholder="e.g., Acme Property Management"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="mt-2 bg-secondary/50 border-border"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    onClick={() => setStep(3)}
                    disabled={!purpose || !recipient}
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Expiry Settings */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Expiry Settings</h3>
                  <PrivacyTooltip content="Time-limited proofs reduce risk. Choose the shortest duration needed for your use case." />
                </div>
                <div>
                  <Label>Proof Validity Period</Label>
                  <Select value={expiry} onValueChange={setExpiry}>
                    <SelectTrigger className="mt-2 bg-secondary/50 border-border">
                      <SelectValue placeholder="Select expiry time" />
                    </SelectTrigger>
                    <SelectContent>
                      {expiryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-sm font-medium text-accent mb-2">Proof Summary</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Type: {credentialTypes.find((t) => t.value === credentialType)?.label}</li>
                    <li>• Purpose: {purpose}</li>
                    <li>• Recipient: {recipient}</li>
                    <li>• One-time use only</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    onClick={handleGenerate}
                    disabled={!expiry}
                    className="flex-1"
                  >
                    Generate Proof
                    <Shield className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Generated Proof */}
            {step === 4 && (
              <div className="space-y-6 animate-scale-in text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proof Generated!</h3>
                  <p className="text-muted-foreground text-sm">
                    Share this proof ID with your recipient. It will expire after{" "}
                    {expiryOptions.find((e) => e.value === expiry)?.label}.
                  </p>
                </div>
                <div className="flex items-center gap-2 p-4 rounded-lg bg-secondary border border-border">
                  <code className="flex-1 text-lg font-mono gradient-text">{generatedProof}</code>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="w-5 h-5 text-accent" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <Button variant="outline" onClick={resetForm} className="w-full">
                  Generate Another Proof
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
