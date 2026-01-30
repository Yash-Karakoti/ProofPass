import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition, staggerItem } from "@/components/PageTransition";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Globe,
  Server,
  FileText,
  User,
  Building,
  Clock,
  Target,
  AlertTriangle,
  ShieldCheck,
  Database
} from "lucide-react";

const PrivacyModel = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <PageTransition>
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Model</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Understand how ProofPass+ protects your credentials while enabling 
            secure verification
          </p>
        </div>

        {/* Visual Diagram */}
        <div className="mb-12 p-6 rounded-xl bg-secondary/30 border border-border/50">
          <h2 className="text-lg font-semibold mb-6 text-center">How Privacy-Preserving Verification Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* You */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <User className="w-10 h-10 text-primary" />
              </div>
              <span className="font-medium">You</span>
              <span className="text-xs text-muted-foreground">Credential Holder</span>
            </div>

            {/* Arrow 1 */}
            <div className="flex flex-col items-center">
              <div className="hidden md:block w-16 h-0.5 bg-primary/50 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary/50 border-y-4 border-y-transparent" />
              </div>
              <div className="md:hidden h-8 w-0.5 bg-primary/50 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-primary/50 border-x-4 border-x-transparent" />
              </div>
              <span className="text-xs text-primary mt-1">Generate Proof</span>
            </div>

            {/* ProofPass */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-2 border border-primary/30">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <span className="font-medium">ProofPass+</span>
              <span className="text-xs text-muted-foreground">Zero-Knowledge System</span>
            </div>

            {/* Arrow 2 */}
            <div className="flex flex-col items-center">
              <div className="hidden md:block w-16 h-0.5 bg-primary/50 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary/50 border-y-4 border-y-transparent" />
              </div>
              <div className="md:hidden h-8 w-0.5 bg-primary/50 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-primary/50 border-x-4 border-x-transparent" />
              </div>
              <span className="text-xs text-primary mt-1">Share Proof ID</span>
            </div>

            {/* Verifier */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-2 border border-border">
                <Building className="w-10 h-10 text-muted-foreground" />
              </div>
              <span className="font-medium">Verifier</span>
              <span className="text-xs text-muted-foreground">Employer, School, etc.</span>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Lock className="w-4 h-4 inline-block mr-1" />
            Your documents never leave your control
          </div>
        </div>

        {/* Section 1: What is Private */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <EyeOff className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">What Stays Private?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="glass-card border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Your Credentials</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The actual content of your degrees, certificates, and documents is never shared or transmitted.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary">
                  <Lock className="w-3 h-3" />
                  <span>Encrypted locally</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Issuer Details</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Who issued your credential remains hidden. Universities, employers, or certifying bodies stay anonymous.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary">
                  <Lock className="w-3 h-3" />
                  <span>Not disclosed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Your Identity</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your personal information, wallet address, and verification history remain completely private.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary">
                  <Lock className="w-3 h-3" />
                  <span>Zero linkability</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: What is Revealed */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-secondary">
              <Eye className="w-6 h-6 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">What is Revealed?</h2>
          </div>
          
          <Card className="glass-card border-border/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                Only the minimum information needed to confirm eligibility is shared:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-secondary">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">Proof Validity</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      A simple true/false confirmation that you meet the criteria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-secondary">
                    <Target className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">Stated Purpose</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The reason you generated the proof (job, scholarship, etc.)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-secondary">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">Expiry Status</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Whether the proof is still valid or has expired
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Why Zero-Knowledge */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/20">
              <HelpCircle className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">Why Zero-Knowledge?</h2>
          </div>
          
          <Card className="glass-card border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">A Simple Explanation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Imagine proving you're over 21 to enter a venue without showing your ID. 
                    You don't reveal your birthdate, address, or photo — just the fact that 
                    you meet the age requirement. That's zero-knowledge proof.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      Traditional Verification
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Share full document copies</li>
                      <li>• Reveal personal information</li>
                      <li>• Data stored by verifiers</li>
                      <li>• Risk of identity theft</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Zero-Knowledge Verification
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Share only yes/no answers</li>
                      <li>• Documents stay private</li>
                      <li>• No data for verifiers to store</li>
                      <li>• Mathematically secure</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <span className="font-medium">The key insight:</span> Zero-knowledge proofs 
                    let you prove something is true without revealing any additional information. 
                    It's like solving a puzzle without showing your work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Why Not Public Blockchains */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">Why This Can't Work on Public Blockchains</h2>
          </div>
          
          <Card className="glass-card border-border/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                Public blockchains are designed for transparency — the opposite of privacy. 
                Here's why credentials don't belong on public chains:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Aspect</th>
                      <th className="text-left py-3 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Public Blockchain
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        <div className="flex items-center gap-2 text-primary">
                          <Shield className="w-4 h-4" />
                          ProofPass+
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="py-3 px-4 text-muted-foreground">Data Visibility</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Everything public forever
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          Encrypted & private
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-muted-foreground">Transaction History</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Fully traceable
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          Unlinkable proofs
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-muted-foreground">Identity Protection</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Wallet addresses exposed
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          Complete anonymity
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-muted-foreground">Data Deletion</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Impossible (immutable)
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          User-controlled
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-muted-foreground">Credential Content</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Visible to anyone
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          Never revealed
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">The Fundamental Problem</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Once data is on a public blockchain, it's there forever. Anyone can see it, 
                      analyze it, and link it to your identity. This is incompatible with privacy 
                      for sensitive credentials like degrees, medical records, or employment history.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Ready to experience privacy-preserving credentials?
          </p>
          <a 
            href="/create-credential"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Create Your First Credential
          </a>
        </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyModel;
