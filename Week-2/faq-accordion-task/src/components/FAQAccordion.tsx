import { useState } from "react";

const faqs = [
  {
    question: "What is your product's refund policy?",
    answer:
      "We offer a full refund within 30 days of purchase, no questions asked. Just reach out to our support team with your order number.",
  },
  {
    question: "Can I upgrade or downgrade my subscription plan?",
    answer:
      "Yes. You can switch plans anytime from your account settings. Upgrades take effect immediately, downgrades apply next billing cycle.",
  },
  {
    question: "Do you offer support for enterprise customers?",
    answer:
      "Absolutely. Enterprise customers get a dedicated account manager and priority support with a 1-hour response SLA.",
  },
  {
    question: "Is my data secure with your platform?",
    answer:
      "Yes. All data is encrypted in transit and at rest, and we undergo regular third-party security audits.",
  },
  {
    question: "Can I integrate this with other tools I already use?",
    answer:
      "Yes, we support integrations with Slack, Google Workspace, and Zapier, plus a REST API for custom integrations.",
  },
  {
    question: "What happens to my data if I cancel my account?",
    answer:
      "Your data is retained for 90 days after cancellation in case you'd like to reactivate, then permanently deleted.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 sm:text-base text-sm">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-gray-600 sm:text-base text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
          Frequently asked questions
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-4">
          Everything you need to know about the product and billing.
        </p>

        <div>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}