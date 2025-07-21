export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Сообщение не передано." });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const json = await openaiRes.json();
    const reply = json.choices?.[0]?.message?.content?.trim() || "Нет ответа.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ reply: "Ошибка сервера." });
  }
}
