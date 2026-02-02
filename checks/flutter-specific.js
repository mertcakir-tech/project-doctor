const fs = require("fs");
const path = require("path");

module.exports = function flutterSpecific(context) {
  if (context.projectType !== "flutter") {
    return;
  }

  const pubspecPath = path.join(process.cwd(), "pubspec.yaml");

  if (!fs.existsSync(pubspecPath)) {
    return;
  }

  if (!context.silent) {
    console.log("✅ pubspec.yaml found");
  }

  const gitignorePath = path.join(process.cwd(), ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, "utf8");
    if (!content.includes("*.g.dart")) {
      if (!context.silent) {
        console.log("⚠️  *.g.dart not ignored");
      }
      context.score -= 5;
    }
  }
};
