import { Shield, Clock, Target, Eye, Lock, Zap } from "lucide-react";
import { PrivacyTooltip } from "@/components/PrivacyTooltip";

const features = [
  {
    icon: Target,
    title: "Purpose-Bound",
    description: "Each proof is tied to a specific purpose and recipient. Cannot be reused for unintended verification.",
    tooltip: "Purpose-binding ensures your proof can only be used for the exact reason you created it - like proving age for alcohol purchase, but not for anything else."
  },
  {
    icon: Clock,
    title: "Time-Limited",
    description: "Set expiration times from minutes to days. Proofs automatically become invalid after expiry.",
    tooltip: "Time-limited proofs reduce risk of misuse. Even if someone captures your proof, it becomes useless after expiration."
  },
  {
    icon: Shield,
    title: "One-Time Use",
    description: "Proofs can only be verified once. After use, they're cryptographically invalidated.",
    tooltip: "One-time verification means your proof can't be saved and reused later without your knowledge."
  },
  {
    icon: Eye,
    title: "Zero-Knowledge",
    description: "Verify claims without revealing underlying documents. Prove you're over 21 without showing your ID.",
    tooltip: "Zero-knowledge proofs use advanced cryptography to prove a statement is true without revealing any additional information."
  },
  {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "All data encrypted locally before transmission. We never see your documents.",
    tooltip: "Client-side encryption means your sensitive data is encrypted on your device before it ever leaves - we can't access it even if we wanted to."
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description: "Verifiers get immediate cryptographic proof without accessing your original documents.",
    tooltip: "Cryptographic verification happens in milliseconds, providing instant confirmation while protecting your privacy."
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy by <span className="gradient-text">Design</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every feature is built with your privacy as the foundation, not an afterthought.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <PrivacyTooltip content={feature.tooltip} />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
