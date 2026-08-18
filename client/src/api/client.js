const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getQuestions: (section, difficulty) =>
    request(`/questions?section=${section}${difficulty ? `&difficulty=${difficulty}` : ""}`),

  saveScore: (payload) =>
    request("/scores", { method: "POST", body: JSON.stringify(payload) }),

  getScoreHistory: (userId) => request(`/scores/${userId}`),

  askChatbot: (question, context) =>
    request("/chatbot", { method: "POST", body: JSON.stringify({ question, context }) }),
};
