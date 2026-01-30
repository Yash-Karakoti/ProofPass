import { Clock, CheckCircle, XCircle, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PrivacyTooltip } from "@/components/PrivacyTooltip";

const mockProofs = [
  {
    id: "PP-A7B3C9D2",
    type: "Age Verification",
    purpose: "Wine club membership",
    recipient: "Napa Valley Wines",
    status: "active",
    createdAt: "2 hours ago",
    expiresIn: "22 hours",
  },
  {
    id: "PP-E5F1G8H4",
    type: "Address Verification",
    purpose: "Bank account opening",
    recipient: "First National Bank",
    status: "used",
    createdAt: "1 day ago",
    usedAt: "12 hours ago",
  },
  {
    id: "PP-I9J2K6L0",
    type: "Employment Status",
    purpose: "Apartment rental",
    recipient: "Metro Housing LLC",
    status: "expired",
    createdAt: "3 days ago",
    expiredAt: "2 days ago",
  },
];

const statusConfig = {
  active: {
    label: "Active",
    icon: Clock,
    className: "bg-accent/20 text-accent border-accent/30",
  },
  used: {
    label: "Verified",
    icon: CheckCircle,
    className: "bg-primary/20 text-primary border-primary/30",
  },
  expired: {
    label: "Expired",
    icon: XCircle,
    className: "bg-muted text-muted-foreground border-muted",
  },
};

export function ActiveProofs() {
  return (
    <section id="proofs" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              My <span className="gradient-text">Proofs</span>
            </h2>
            <p className="text-muted-foreground">
              Track and manage your generated credential proofs.
            </p>
          </div>
          <PrivacyTooltip content="Your proof history is stored locally on your device. We never have access to your credential data or proof history." />
        </div>

        <div className="space-y-4">
          {mockProofs.map((proof, index) => {
            const config = statusConfig[proof.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <div
                key={proof.id}
                className="glass-card p-6 hover:border-primary/30 transition-all animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Proof ID</div>
                      <code className="text-sm font-mono text-primary">{proof.id}</code>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Type</div>
                      <div className="text-sm font-medium">{proof.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Recipient</div>
                      <div className="text-sm">{proof.recipient}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Purpose</div>
                      <div className="text-sm text-muted-foreground">{proof.purpose}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={config.className}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>

                    {proof.status === "active" && (
                      <div className="text-xs text-muted-foreground">
                        Expires in {proof.expiresIn}
                      </div>
                    )}

                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {mockProofs.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No proofs generated yet.</p>
            <Button variant="hero" className="mt-4">
              Create Your First Proof
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
