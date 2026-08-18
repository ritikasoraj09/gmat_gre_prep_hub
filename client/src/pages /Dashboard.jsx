import { useEffect, useState } from "react";
import ProgressDashboard from "../components/ProgressDashboard.jsx";
import { api } from "../api/client.js";

// Demo data shown until real attempts exist in the database.
const DEMO_HISTORY = [
  { date: "Jul 1", score: 62 },
  { date: "Jul 8", score: 68 },
  { date: "Jul 15", score: 71 },
  { date: "Jul 22", score: 75 },
  { date: "Jul 29", score: 81 },
];

const DEMO_BREAKDOWN = [
  { section: "GRE Verbal", avgScore: 74 },
  { section: "GRE Quant", avgScore: 80 },
  { section: "GMAT Quant", avgScore: 69 },
  { section: "GMAT Verbal", avgScore: 77 },
  { section: "Data Insights", avgScore: 65 },
];

export default function Dashboard() {
  const [history, setHistory] = useState(DEMO_HISTORY);
  const [breakdown, setBreakdown] = useState(DEMO_BREAKDOWN);

  useEffect(() => {
    api
      .getScoreHistory("demo-user")
      .then((data) => {
        if (data.history?.length) setHistory(data.history);
        if (data.breakdown?.length) setBreakdown(data.breakdown);
      })
      .catch(() => {
        // Keep demo data if the backend isn't reachable yet.
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-500 text-sm">
          Track how your scores are trending and where to focus next.
        </p>
      </div>
      <ProgressDashboard scoreHistory={history} sectionBreakdown={breakdown} />
    </div>
  );
}
