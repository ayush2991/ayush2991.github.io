const projects = [
  {
    title: "Document Summarizer with Transformers",
    description: "Used BART and Pegasus to summarize lengthy legal contracts into concise overviews.",
    link: "https://github.com/YOUR_GITHUB/project-summarizer"
  },
  {
    title: "Bias Detection in Language Models",
    description: "Analyzed demographic bias in LLMs using fairness metrics and attention heatmaps.",
    link: "https://github.com/YOUR_GITHUB/bias-in-llms"
  },
  {
    title: "ML Model Deployment with FastAPI",
    description: "Built an NLP classifier and deployed it with FastAPI, Docker, and GitHub Actions CI/CD.",
    link: "https://github.com/YOUR_GITHUB/fastapi-deployment"
  }
];

const container = document.getElementById("project-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.link}" target="_blank">View on GitHub</a>
  `;
  container.appendChild(card);
});

// Set dark mode as default on page load
document.body.classList.add("dark");
const toggleButton = document.getElementById("theme-toggle");
toggleButton.textContent = "☀️";

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
