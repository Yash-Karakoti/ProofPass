import { Shield, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                ProofPass<span className="text-primary">+</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Privacy-first credential verification. Generate purpose-bound, time-limited proofs 
              without revealing your sensitive documents.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Actions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/create-credential" className="hover:text-foreground transition-colors">
                  Create Credential
                </Link>
              </li>
              <li>
                <Link to="/generate-proof" className="hover:text-foreground transition-colors">
                  Generate Proof
                </Link>
              </li>
              <li>
                <Link to="/verify-proof" className="hover:text-foreground transition-colors">
                  Verify Proof
                </Link>
              </li>
              <li>
                <Link to="/my-credentials" className="hover:text-foreground transition-colors">
                  My Credentials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy-model" className="hover:text-foreground transition-colors">
                  Privacy Model
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProofPass+. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
