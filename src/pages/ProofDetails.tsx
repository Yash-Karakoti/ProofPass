import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition, staggerItem } from "@/components/PageTransition";
import { 
  Copy, 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  Clock, 
  FileText, 
  Target,
  Hash
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock proof data
const mockProofData = {
  id: "0x7a8b9c...3d4e5f",
  fullId: "0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
  credentialName: "Bachelor's Degree in Computer Science",
  purpose: "Job application",
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  status: "unused" as "unused" | "used" | "expired",
  oneTimeUse: true,
};

const statusConfig = {
  unused: {
    label: "Unused",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  used: {
    label: "Used",
    className: "bg-accent/20 text-accent border-accent/30",
  },
  expired: {
    label: "Expired",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
};

const ProofDetails = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { proofId } = useParams();

  const proof = mockProofData;
  const status = statusConfig[proof.status];

  const copyProofId = async () => {
    await navigator.clipboard.writeText(proof.fullId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const expiry = new Date(proof.expiresAt).getTime();
    const diff = expiry - now;
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <PageTransition>
          <motion.div variants={staggerItem} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Proof Details</h1>
            <p className="text-muted-foreground">
              View and manage your generated proof
            </p>
          </motion.div>

          {/* Warning Banner */}
          <motion.div 
            variants={staggerItem}
            className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-destructive font-medium">Important Notice</p>
              <p className="text-destructive/80 text-sm mt-1">
                This proof can only be used once and only for the specified purpose.
              </p>
            </div>
          </motion.div>

          {/* Proof Details Card */}
          <motion.div variants={staggerItem}>
            <Card className="glass-card border-border/50 mb-6">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Proof Information</CardTitle>
                  <Badge variant="outline" className={status.className}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Proof ID */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Hash className="w-4 h-4" />
                    <span>Proof ID</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-secondary/50 px-4 py-3 rounded-lg text-sm font-mono break-all">
                      {proof.fullId}
                    </code>
                  </div>
                </motion.div>

                {/* Credential Name */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Credential</span>
                  </div>
                  <p className="text-foreground font-medium">{proof.credentialName}</p>
                </motion.div>

                {/* Purpose */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Target className="w-4 h-4" />
                    <span>Purpose</span>
                  </div>
                  <p className="text-foreground font-medium capitalize">{proof.purpose}</p>
                </motion.div>

                {/* Expiry Time */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Expiry</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-foreground font-medium">
                      {formatDateTime(proof.expiresAt)}
                    </p>
                    {proof.status === "unused" && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                        {getTimeRemaining()}
                      </Badge>
                    )}
                  </div>
                </motion.div>

                {/* Usage Info */}
                <motion.div 
                  className="pt-4 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Created:</span>
                    <span>{formatDateTime(proof.createdAt)}</span>
                  </div>
                  {proof.oneTimeUse && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>One-time use:</span>
                      <span className="text-primary">Enabled</span>
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.div className="flex-1" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button 
                onClick={copyProofId}
                variant="outline"
                className="w-full gap-2"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Copied!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Proof ID
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button 
                onClick={() => navigate("/verify-proof")}
                variant="hero"
                className="w-full gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Go to Verify Proof
              </Button>
            </motion.div>
          </motion.div>

          {/* Back Link */}
          <motion.div 
            variants={staggerItem}
            className="mt-6 text-center"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate("/my-credentials")}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to My Credentials
            </Button>
          </motion.div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default ProofDetails;
