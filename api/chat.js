async function sendMessage() {
  const input = document.getElementById("userInput");
  const responseBox = document.getElementById("response");

  const userMessage = input.value.trim();
  if (userMessage === "") return;

  responseBox.textContent = "Абрам думает...";

  const res = await fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();
  responseBox.textContent = data.reply;
  input.value = "";
}
