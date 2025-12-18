const API_BASE = import.meta.env.VITE_API_URL;

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
