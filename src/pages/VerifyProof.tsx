import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PrivacyTooltip } from "@/components/PrivacyTooltip";
import { PageTransition, staggerItem } from "@/components/PageTransition";
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Shield,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";

type VerificationStatus = "idle" | "loading" | "valid" | "invalid" | "expired" | "used";

interface VerificationResult {
  status: VerificationStatus;
  message: string;
  details?: string;
}

// Mock verification logic
const mockVerify = (proofId: string): VerificationResult => {
  const trimmedId = proofId.trim().toLowerCase();
  
  if (!trimmedId) {
    return { status: "invalid", message: "Please enter a proof ID" };
  }
  
  // Mock different results based on input patterns
  if (trimmedId.includes("expired")) {
    return { 
      status: "expired", 
      message: "Proof has expired",
      details: "This proof exceeded its validity period and can no longer be used."
    };
  }
  
  if (trimmedId.includes("used")) {
    return { 
      status: "used", 
      message: "Proof already used",
      details: "This proof was configured for one-time use and has already been verified."
    };
  }
  
  if (trimmedId.length < 10) {
    return { 
      status: "invalid", 
      message: "Invalid proof ID",
      details: "The proof ID format is incorrect or the proof does not exist."
    };
  }
  
  return { 
    status: "valid", 
    message: "Proof is valid",
    details: "No credential data was revealed. Eligibility confirmed."
  };
};

const VerifyProof = () => {
  const [proofId, setProofId] = useState("");
  const [result, setResult] = useState<VerificationResult>({ status: "idle", message: "" });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    setResult({ status: "loading", message: "Verifying..." });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const verificationResult = mockVerify(proofId);
    setResult(verificationResult);
    setIsVerifying(false);
  };

  const getStatusDisplay = () => {
    switch (result.status) {
      case "valid":
        return {
          icon: CheckCircle2,
          bgClass: "bg-primary/10 border-primary/30",
          textClass: "text-primary",
          iconColor: "text-primary",
        };
      case "expired":
        return {
          icon: Clock,
          bgClass: "bg-destructive/10 border-destructive/30",
          textClass: "text-destructive",
          iconColor: "text-destructive",
        };
      case "used":
        return {
          icon: AlertCircle,
          bgClass: "bg-destructive/10 border-destructive/30",
          textClass: "text-destructive",
          iconColor: "text-destructive",
        };
      case "invalid":
        return {
          icon: XCircle,
          bgClass: "bg-destructive/10 border-destructive/30",
          textClass: "text-destructive",
          iconColor: "text-destructive",
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <PageTransition>
          <motion.div variants={staggerItem} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Verify Proof</h1>
            <p className="text-muted-foreground">
              Check the validity of a zero-knowledge proof
            </p>
          </motion.div>

          {/* Privacy Message */}
          <motion.div 
            variants={staggerItem}
            className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3"
          >
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium">Privacy-Preserving Verification</p>
              <p className="text-muted-foreground text-sm mt-1">
                Verification confirms eligibility without exposing documents.
              </p>
            </div>
          </motion.div>

          {/* Verification Input Card */}
          <motion.div variants={staggerItem}>
            <Card className="glass-card border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Enter Proof ID
                  <PrivacyTooltip content="The proof ID is a cryptographic hash that allows verification without revealing the underlying credential." />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proofId">Proof ID</Label>
                  <Input
                    id="proofId"
                    placeholder="Enter the proof ID to verify (e.g., 0x7a8b9c...)"
                    value={proofId}
                    onChange={(e) => setProofId(e.target.value)}
                    className="font-mono"
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste the proof ID shared with you by the credential holder
                  </p>
                </div>

                <Button 
                  onClick={handleVerify}
                  variant="hero"
                  className="w-full gap-2"
                  disabled={isVerifying || !proofId.trim()}
                >
                  <Search className="w-4 h-4" />
                  {isVerifying ? "Verifying..." : "Verify Proof"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {/* Loading State */}
            {result.status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div 
                        className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-muted-foreground">Verifying proof...</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Verification Result */}
            {result.status !== "idle" && result.status !== "loading" && statusDisplay && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Card className={`border ${statusDisplay.bgClass}`}>
                  <CardContent className="py-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <statusDisplay.icon className={`w-16 h-16 ${statusDisplay.iconColor}`} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className={`text-xl font-semibold ${statusDisplay.textClass}`}>
                          {result.message}
                        </h3>
                        {result.details && (
                          <p className="text-muted-foreground mt-2 max-w-md">
                            {result.details}
                          </p>
                        )}
                      </motion.div>
                      
                      {result.status === "valid" && (
                        <motion.div 
                          className="mt-4 p-4 rounded-lg bg-secondary/50 w-full max-w-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">What this means:</span>
                            <br />
                            The credential holder has proven their eligibility without revealing any personal documents or sensitive information.
                          </p>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setProofId("");
                            setResult({ status: "idle", message: "" });
                          }}
                          className="mt-4"
                        >
                          Verify Another Proof
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* How It Works */}
          <motion.div 
            variants={staggerItem}
            className="mt-8 p-6 rounded-lg bg-secondary/30 border border-border/50"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              How Verification Works
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "The proof ID is checked against the cryptographic record",
                "No credential content is revealed during verification",
                "One-time proofs become invalid after first verification",
                "Expired proofs are automatically invalidated",
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyProof;
