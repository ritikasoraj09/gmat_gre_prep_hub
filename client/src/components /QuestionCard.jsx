import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Card, CardContent } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";

/**
 * Renders a single question with selectable options.
 * Supports single- and multi-select (sentence-equivalence-style) questions.
 */
export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const isMultiSelect = question.correctOptions.length > 1;

  function toggleOption(option) {
    if (submitted) return;
    setSelected((prev) => {
      if (isMultiSelect) {
        return prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option];
      }
      return [option];
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    const isCorrect =
      selected.length === question.correctOptions.length &&
      selected.every((o) => question.correctOptions.includes(o));
    onAnswer?.({ questionId: question.id, selected, isCorrect });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-purple bg-brand-mint/40 px-2 py-1 rounded">
              {question.exam} · {question.section}
            </span>
            <span className="text-xs text-gray-500 capitalize">{question.difficulty}</span>
          </div>

          <p className="whitespace-pre-line text-gray-900 font-medium mb-4">
            {question.prompt}
          </p>

          <div className="space-y-2">
            {question.options.map((option) => {
              const isSelected = selected.includes(option);
              const isCorrectOption = question.correctOptions.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  disabled={submitted}
                  className={clsx(
                    "w-full text-left px-4 py-2.5 rounded-lg border transition-colors",
                    !submitted && isSelected && "border-brand-purple bg-brand-mint/30",
                    !submitted && !isSelected && "border-gray-200 hover:border-brand-teal",
                    submitted && isCorrectOption && "border-emerald-400 bg-emerald-50",
                    submitted &&
                      isSelected &&
                      !isCorrectOption &&
                      "border-red-300 bg-red-50"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Button
              onClick={handleSubmit}
              disabled={submitted || selected.length === 0}
            >
              Submit Answer
            </Button>
          </div>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-lg bg-gray-50 text-sm text-gray-700"
              >
                <strong>Explanation: </strong>
                {question.explanation}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
