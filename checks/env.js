const fs = require("fs");
const path = require("path");

module.exports = function checkEnv(context) {
  if (context.config?.requireEnv === false) {
    return;
  }
  const cwd = process.cwd();
  const envPath = path.join(cwd, ".env");
  const examplePath = path.join(cwd, ".env.example");

  if (!fs.existsSync(envPath)) {
    context.score -= 15;

    if (!context.silent) {
      console.log("⚠️  .env file not found");
    }

    if (fs.existsSync(examplePath)) {
      if (!context.silent) {
        console.log("💡 .env.example found");
        console.log("   Try this:");
        console.log("   cp .env.example .env\n");
      }
    } else {
      if (context.fix) {
        fs.writeFileSync(examplePath, "# Example environment variables\n");
        if (!context.silent) {
          console.log("🛠️  .env.example created");
        }
      } else {
        if (!context.silent) {
          console.log("❗ .env.example not found");
          console.log("   Required variables are unclear\n");
        }
        context.score -= 5;
      }
    }
    return;
  }

  const content = fs.readFileSync(envPath, "utf8");

  if (!content.trim()) {
    context.score -= 15;
    if (!context.silent) {
      console.log("⚠️  .env file is empty");
    }
    return;
  }

  if (!context.silent) {
    console.log("✅ .env file exists");
  }
};
