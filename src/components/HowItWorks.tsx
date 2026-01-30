import { FileKey, Shield, CheckCircle } from "lucide-react";
import { PrivacyTooltip } from "@/components/PrivacyTooltip";

const steps = [
  {
    icon: FileKey,
    step: "01",
    title: "Create a private credential",
    description: "Store your credential data locally with end-to-end encryption. Your documents never leave your device.",
    tooltip: "Credentials are encrypted on your device using AES-256. We never have access to your raw data.",
  },
  {
    icon: Shield,
    step: "02",
    title: "Generate a purpose-bound proof",
    description: "Create a cryptographic proof tied to a specific purpose, recipient, and time limit.",
    tooltip: "Zero-knowledge proofs mathematically prove a claim is true without revealing the underlying data.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Verifier checks proof without seeing your data",
    description: "Recipients verify your claim instantly and cryptographically—without accessing your documents.",
    tooltip: "Verification confirms authenticity in milliseconds. The verifier learns only what you chose to prove.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to privacy-preserving verification.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical connection line */}
            <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex gap-6 items-start">
                    {/* Step number circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                        <step.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="glass-card p-6 flex-1 hover:border-primary/50 transition-all group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-primary">{step.step}</span>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <PrivacyTooltip content={step.tooltip} />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
