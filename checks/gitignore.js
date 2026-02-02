const fs = require("fs");
const path = require("path");

module.exports = function checkGitignore(context) {
  if (context.config?.requireGitignore === false) {
    return;
  }
  const gitignorePath = path.join(process.cwd(), ".gitignore");

  if (!fs.existsSync(gitignorePath)) {
    if (context.fix) {
      fs.writeFileSync(gitignorePath, ".env\nnode_modules\n");
      if (!context.silent) {
        console.log("🛠️  .gitignore created");
      }
    } else {
      if (!context.silent) {
        console.log("⚠️  .gitignore not found");
        console.log("   .env may be accidentally committed\n");
      }
      context.score -= 10;
    }
    return;
  }

  const content = fs.readFileSync(gitignorePath, "utf8");

  if (!content.includes(".env")) {
    if (!context.silent) {
      console.log("⚠️  .env is not in .gitignore");
      console.log("   This could be a security risk\n");
    }
    return;
  }

  if (!context.silent) {
    console.log("✅ .gitignore is secure");
  }
};
