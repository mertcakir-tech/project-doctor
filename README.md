# 🩺 Project Doctor

Diagnose project setup issues **before they break**.

Project Doctor is a smart CLI tool that analyzes your project, detects its tech stack, highlights common setup problems, and gives you a clear **health score**.

---

## 🚀 What is Project Doctor?

Project Doctor answers one simple question:

> **Why might this project fail to run, build, or deploy?**

It focuses on real-world setup issues instead of code style, formatting, or linting.

---

## ✨ Features

- 🔍 Automatic project type detection  
- 📊 Health score (0–100)  
- ⚠️ Clear, actionable warnings  
- 🤖 JSON output for CI/CD and automation  
- 🛠️ Safe auto-fix mode  
- ⚙️ Configurable rules  

---

## 📦 Supported Project Types

- ✅ Node.js  
- ✅ Express  
- ✅ Flutter  
- ⚠️ Unknown / generic projects (basic checks only)  

More stacks will be added over time.

---

## ⚙️ Installation (local / dev)

```bash
npm link
This makes project-doctor available globally on your machine.

▶️ Usage
Run inside any project directory:

project-doctor
Example output:

🩺 Project Doctor starting...

ℹ️  Project type detected: flutter
⚠️  .env file not found
⚠️  .env is not in .gitignore

📊 Health score: 75 / 100
🤖 JSON Output (CI / Automation)
For scripts and pipelines:

project-doctor --json
Output:

{
  "score": 75,
  "projectType": "flutter"
}
When --json is used, all human-readable logs are silenced.

🛠️ Auto-Fix Mode (Safe Only)
project-doctor --fix
What it can fix:

Create .gitignore if missing

Create .env.example if missing

What it will never do:

Modify .env

Touch source code

Overwrite existing files

⚙️ Configuration (Optional)
Create a doctor.config.json file:

{
  "requireEnv": true,
  "requireGitignore": true
}
Disable specific checks:

{
  "requireEnv": false
}
🧠 Philosophy
Project Doctor is not a linter.
It does not judge your code style.

It focuses only on project health and setup correctness.

👥 Who Is This For?
Developers cloning new projects

Freelancers onboarding quickly

Teams tired of “it works on my machine”

CI pipelines needing fast sanity checks

🗺️ Roadmap
More Flutter checks

Next.js & Vite support

Configurable scoring

GitHub Action

npm package release

📄 License
MIT
