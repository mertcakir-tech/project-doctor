const fs = require("fs");
const path = require("path");

module.exports = function checkPackage(context) {
  if (context.projectType !== "node" && context.projectType !== "express") {
    return;
  }
  const pkgPath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(pkgPath)) {
    if (!context.silent) {
      console.log("❌ package.json not found");
      console.log("   This may not be a Node project\n");
    }
    process.exitCode = 1;
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  if (!pkg.scripts || Object.keys(pkg.scripts).length === 0) {
    if (!context.silent) {
      console.log("⚠️  package.json exists but scripts are missing");
    }
    return;
  }

  if (!context.silent) {
    console.log("✅ package.json is valid");
  }
};
