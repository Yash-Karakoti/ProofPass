import { AlertTriangle, Globe, ShieldCheck } from "lucide-react";

export function WhyPrivacyMatters() {
  return (
    <section className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Privacy <span className="gradient-text">Matters</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Traditional verification exposes more than necessary. We believe you should prove only what's needed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Problem */}
          <div className="glass-card p-8 border-destructive/30 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">The Oversharing Problem</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Every time you verify your identity, you expose far more data than necessary. 
                Showing your ID to prove you're over 21? You've just revealed your full name, 
                address, date of birth, and ID number.
              </p>
              <p>
                This data gets copied, stored, and often sold. Data breaches affect billions 
                of records each year—records that wouldn't exist if we stopped oversharing.
              </p>
            </div>
          </div>

          {/* Public Blockchains vs Privacy-First */}
          <div className="glass-card p-8 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Privacy-First Design</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Public blockchains are forever</p>
                  <p className="text-sm text-muted-foreground">
                    Once data is on-chain, it's permanent and visible to everyone. 
                    Even "encrypted" data can be compromised as cryptography evolves.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Zero-knowledge is selective</p>
                  <p className="text-sm text-muted-foreground">
                    ProofPass+ uses zero-knowledge proofs to verify claims without revealing 
                    underlying data. Prove you're over 21 without showing your birthdate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
