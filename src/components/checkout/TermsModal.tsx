
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsModal = ({ open, onOpenChange }: TermsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Family Lyfe Fix – Terms of Service & Privacy Policy
          </DialogTitle>
          <DialogDescription className="sr-only">
            Terms of Service and Privacy Policy for Family Lyfe Fix
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h3 className="font-semibold text-base mb-2">Informational Use Only</h3>
            <p>
              All Family Lyfe Fix products, including templates, planners, checklists, and guides, 
              are provided for educational and organizational purposes only. They are not a substitute 
              for professional legal, financial, tax, or medical advice. You should consult licensed 
              professionals for guidance specific to your circumstances.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Digital Products – All Sales Final</h3>
            <p>
              Due to the instant-access nature of digital products, all sales are final. Refunds or 
              exchanges are not provided once access is delivered.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Personal Use License</h3>
            <p>
              Your purchase grants a single-user license for personal use only. You may not share, 
              resell, or distribute any Family Lyfe Fix content without written permission.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">No Guaranteed Results</h3>
            <p>
              While our tools are designed to help you organize and prepare, results vary depending 
              on your personal circumstances and follow-through.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Data Security Responsibility</h3>
            <p>
              If you enter personal or sensitive information into our templates, you are solely 
              responsible for storing that information securely. Family Lyfe Fix does not host, 
              view, or store your completed files.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Privacy & Payment Security</h3>
            <p>
              Your payment is processed securely through trusted third-party processors. We do not 
              sell or share your personal data beyond what is necessary to fulfill your order.
            </p>
          </section>

          <section className="border-t pt-4">
            <p className="font-medium">
              By checking the box and completing your purchase, you confirm that you have read, 
              understood, and agree to these terms.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
