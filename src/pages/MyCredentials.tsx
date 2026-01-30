import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Plus, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition, staggerContainer, staggerItem } from "@/components/PageTransition";

const mockCredentials = [
  {
    id: "1",
    name: "Bachelor of Computer Science",
    type: "Degree",
    issuer: "MIT",
    dateIssued: "2023-05-15",
  },
  {
    id: "2",
    name: "AWS Solutions Architect",
    type: "Course",
    issuer: "Amazon Web Services",
    dateIssued: "2024-01-20",
  },
  {
    id: "3",
    name: "React Advanced Patterns",
    type: "Skill",
    issuer: "Frontend Masters",
    dateIssued: "2024-03-10",
  },
];

const typeColors: Record<string, string> = {
  Degree: "bg-primary/20 text-primary border-primary/30",
  Course: "bg-accent/20 text-accent border-accent/30",
  Skill: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Other: "bg-muted text-muted-foreground border-border",
};

export default function MyCredentials() {
  const credentials = mockCredentials; // Toggle to [] to see empty state

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <PageTransition className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Credentials</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm">Encrypted & Private</span>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="hero" size="lg">
                <Link to="/create-credential">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credential
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Credentials List or Empty State */}
          {credentials.length === 0 ? (
            <motion.div variants={staggerItem}>
              <Card className="glass-card border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px -5px hsl(var(--primary) / 0.4)",
                        "0 0 40px -5px hsl(var(--primary) / 0.6)",
                        "0 0 20px -5px hsl(var(--primary) / 0.4)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">No credentials yet</h2>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Add your first credential to start generating privacy-preserving proofs.
                  </p>
                  <Button asChild variant="hero">
                    <Link to="/create-credential">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Credential
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              className="grid gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="enter"
            >
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential.id}
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="glass-card hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground truncate">
                              {credential.name}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`${typeColors[credential.type]} shrink-0`}
                            >
                              {credential.type}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {credential.issuer && (
                              <span>Issued by {credential.issuer}</span>
                            )}
                            {credential.dateIssued && (
                              <span>
                                {new Date(credential.dateIssued).toLocaleDateString("en-US", {
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <Lock className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs text-primary font-medium">Private</span>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            variant="outline" 
                            className="shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                            asChild
                          >
                            <Link to="/generate-proof">
                              Generate Proof
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
