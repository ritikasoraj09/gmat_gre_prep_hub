import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Timer, Bot, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";

const features = [
  {
    icon: Timer,
    title: "Timed Practice Exams",
    text: "Simulate real GRE/GMAT conditions with section-wise timers.",
  },
  {
    icon: BookOpen,
    title: "Difficulty-Tiered Questions",
    text: "Beginner to advanced questions across every section.",
  },
  {
    icon: Bot,
    title: "AI Doubt Solver",
    text: "Get instant, step-by-step explanations from an AI chatbot.",
  },
  {
    icon: BarChart3,
    title: "Progress Dashboard",
    text: "Track scores and time-per-question over your prep journey.",
  },
];

const sections = [
  { key: "verbal", label: "GRE Verbal Reasoning" },
  { key: "quant", label: "GRE Quantitative Reasoning" },
  { key: "gmat-quant", label: "GMAT Quantitative Reasoning" },
  { key: "data-insights", label: "GMAT Data Insights" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-10"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          GRE & GMAT <span className="text-brand-purple">Prep Hub</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Practice with real exam-style questions, track your progress, and get
          instant AI-powered doubt resolution — all in one place.
        </p>
        <Link to="/exam/verbal">
          <Button className="text-base px-6 py-3">Start Practicing</Button>
        </Link>
      </motion.section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardContent className="text-center">
              <Icon className="mx-auto text-brand-teal mb-2" size={28} />
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Choose a Section</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {sections.map((s) => (
            <Link key={s.key} to={`/exam/${s.key}`}>
              <Card className="hover:border-brand-teal transition-colors">
                <CardContent className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{s.label}</span>
                  <Button variant="outline" className="text-xs px-3 py-1.5">
                    Practice
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
