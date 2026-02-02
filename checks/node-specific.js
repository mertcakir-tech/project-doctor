const fs = require("fs");
const path = require("path");

module.exports = function nodeSpecific(context) {
  if (context.projectType !== "node" && context.projectType !== "express") {
    return;
  }

  const envPath = path.join(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    return; // zaten env check uyardı
  }

  const content = fs.readFileSync(envPath, "utf8");

  if (!content.includes("PORT=")) {
    console.log("⚠️  PORT environment variable not found");
    console.log("   Node servers usually require a PORT\n");
    context.score -= 10;
  } else {
    console.log("✅ PORT environment variable found");
  }
};
