import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this private?",
    answer: "Yes. You control sharing. Data is encrypted and only used for verification with your permission.",
  },
  {
    question: "Can a bank actually use this?",
    answer: "The portfolio is exportable in formats lenders use; pilots are designed to be lender-friendly.",
  },
  {
    question: "Is the valuation real?",
    answer: "We use the Replacement Cost Method mapped to market wages — transparent and auditable.",
  },
  {
    question: "What if I don't have digital receipts?",
    answer: "We accept paper receipts (scan/upload) and provide simple templates for collecting signals.",
  },
  {
    question: "Is this only for women?",
    answer: "No. CareProof supports anyone who provides unpaid caregiving.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 font-heading">
            Frequently asked <span className="text-primary">questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
                <AccordionTrigger className="text-sm font-semibold font-heading hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
