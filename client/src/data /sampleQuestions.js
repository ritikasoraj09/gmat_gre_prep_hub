// Local fallback question bank used when the backend/database isn't
// available yet (e.g. first run, offline demo). Shape mirrors the
// `questions` table in server/models/schema.sql.

export const sampleQuestions = [
  {
    id: 1,
    exam: "GRE",
    section: "Verbal Reasoning",
    subtype: "Sentence Equivalence",
    difficulty: "beginner",
    prompt:
      "Select the two answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning.\n\nDespite the committee's ______ efforts, the proposal failed to gain approval.",
    options: ["diligent", "half-hearted", "earnest", "careless", "thorough", "reckless"],
    correctOptions: ["diligent", "earnest"],
    explanation:
      "The sentence needs two synonyms describing effort that would plausibly precede a failed outcome despite trying hard. 'Diligent' and 'earnest' both mean sincere/hard-working, forming a matched pair.",
  },
  {
    id: 2,
    exam: "GRE",
    section: "Quantitative Reasoning",
    subtype: "Algebra",
    difficulty: "intermediate",
    prompt: "If 3x - 7 = 2x + 5, what is the value of x?",
    options: ["8", "10", "12", "14"],
    correctOptions: ["12"],
    explanation: "3x - 7 = 2x + 5 → 3x - 2x = 5 + 7 → x = 12.",
  },
  {
    id: 3,
    exam: "GMAT",
    section: "Quantitative Reasoning",
    subtype: "Data Sufficiency",
    difficulty: "advanced",
    prompt:
      "Is x > 0?\n(1) x^2 > 0\n(2) x^3 > 0\n\nChoose: statement (1) alone, statement (2) alone, both together, or neither alone is sufficient.",
    options: [
      "Statement (1) ALONE is sufficient",
      "Statement (2) ALONE is sufficient",
      "BOTH statements together are sufficient, but neither alone",
      "EACH statement alone is sufficient",
      "Statements together are NOT sufficient",
    ],
    correctOptions: ["Statement (2) ALONE is sufficient"],
    explanation:
      "x^2 > 0 is true for any nonzero x (positive or negative), so (1) alone is insufficient. x^3 > 0 only when x > 0, so (2) alone is sufficient.",
  },
  {
    id: 4,
    exam: "GMAT",
    section: "Verbal Reasoning",
    subtype: "Critical Reasoning",
    difficulty: "intermediate",
    prompt:
      "Which of the following, if true, would most weaken the argument that the new study schedule improved student test scores?",
    options: [
      "The same students also received additional tutoring during this period.",
      "The new schedule was implemented six months before the tests.",
      "Test scores are measured on the same scale each year.",
      "Most students reported liking the new schedule.",
    ],
    correctOptions: [
      "The same students also received additional tutoring during this period.",
    ],
    explanation:
      "This introduces an alternative cause (tutoring) for the score improvement, weakening the claim that the schedule alone was responsible.",
  },
  {
    id: 5,
    exam: "GMAT",
    section: "Data Insights",
    subtype: "Graph Analysis",
    difficulty: "beginner",
    prompt:
      "A bar chart shows quarterly revenue growth of 5%, 8%, -2%, and 6% for Q1-Q4. What is the approximate net growth across the year (assuming compounding)?",
    options: ["~15%", "~17.5%", "~19%", "~21%"],
    correctOptions: ["~17.5%"],
    explanation:
      "(1.05)(1.08)(0.98)(1.06) ≈ 1.175, i.e. approximately 17.5% net growth.",
  },
];
