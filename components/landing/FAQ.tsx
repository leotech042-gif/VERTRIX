"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    question: "What is Veytrix?",
    answer:
      "Veytrix is an AI-powered trading intelligence platform designed to help traders analyse markets, understand setups, plan trades and manage risk from one environment.",
  },
  {
    question: "Does Veytrix execute trades automatically?",
    answer:
      "The platform is being designed with execution workflows in mind, but trade execution depends on the broker integrations and permissions connected to your Veytrix account.",
  },
  {
    question: "Which markets will Veytrix support?",
    answer:
      "Veytrix is being built to support major forex pairs, metals, crypto and other supported market instruments through its market-data integrations.",
  },
  {
    question: "Can I use Veytrix on my phone?",
    answer:
      "Yes. The interface is being designed responsively so the core Veytrix experience can work across desktop, tablet and mobile screens.",
  },
  {
    question: "How does the AI analyse a trade?",
    answer:
      "The planned intelligence layer combines market context, price action, structure and risk information to produce a structured analysis rather than presenting an unexplained signal.",
  },
  {
    question: "Is Veytrix financial advice?",
    answer:
      "No. Veytrix is a trading analysis and intelligence platform. Users remain responsible for their own trading decisions, risk and account activity.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-[var(--border)] py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Questions, answered.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[var(--muted)]">
            Everything you need to know about the Veytrix platform.
          </p>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                }}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium sm:text-base">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-[var(--muted)]"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-[var(--border)] px-5 pb-5 pt-4 text-sm leading-6 text-[var(--muted)] sm:px-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
