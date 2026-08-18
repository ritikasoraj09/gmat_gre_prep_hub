import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExamTimer from "../components/ExamTimer.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import AIChatbot from "../components/AIChatbot.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { sampleQuestions } from "../data/sampleQuestions.js";
import { api } from "../api/client.js";

const SECTION_DURATION_SEC = 45 * 60; // 45 minutes per section, adjust per exam

export default function ExamPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [startedAt] = useState(Date.now());

  useEffect(() => {
    // Try the backend first; fall back to the local demo bank so the page
    // still works before the API/database is wired up.
    api
      .getQuestions(section)
      .then((data) => setQuestions(data.length ? data : sampleQuestions))
      .catch(() => setQuestions(sampleQuestions));
  }, [section]);

  const currentQuestion = questions[currentIndex];

  const scorePercent = useMemo(() => {
    if (!answers.length) return 0;
    const correct = answers.filter((a) => a.isCorrect).length;
    return Math.round((correct / answers.length) * 100);
  }, [answers]);

  function handleAnswer(result) {
    setAnswers((prev) => [...prev, result]);
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishExam();
    }
  }

  async function finishExam() {
    setFinished(true);
    const timeTakenSec = Math.round((Date.now() - startedAt) / 1000);
    try {
      await api.saveScore({
        userId: "demo-user",
        section,
        score: scorePercent,
        totalQuestions: answers.length,
        timeTakenSec,
      });
    } catch {
      // Non-fatal in demo mode — scoring API may not be running yet.
    }
  }

  if (!questions.length) {
    return <p className="text-center text-gray-500">Loading questions...</p>;
  }

  if (finished) {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardContent>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Section Complete!</h2>
          <p className="text-gray-600 mb-4">
            You scored <span className="font-semibold text-brand-purple">{scorePercent}%</span> on{" "}
            {answers.length} questions.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button onClick={() => navigate("/dashboard")}>View Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <ExamTimer durationSec={SECTION_DURATION_SEC} onExpire={finishExam} />
      </div>

      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-end">
        <Button onClick={goNext} disabled={answers.length <= currentIndex}>
          {currentIndex < questions.length - 1 ? "Next Question" : "Finish Section"}
        </Button>
      </div>

      <AIChatbot context={currentQuestion.prompt} />
    </div>
  );
}
