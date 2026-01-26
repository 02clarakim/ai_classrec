const API_BASE = "https://ai-classrec-backend.onrender.com";

export async function generateRecommendation(formData) {
  const res = await fetch(`${API_BASE}/receiveData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to generate recommendation");
  }

  return res.json();
}
