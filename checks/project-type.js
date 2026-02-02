const fs = require("fs");
const path = require("path");

module.exports = function detectProjectType(context) {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, "package.json");
  const pubspecPath = path.join(cwd, "pubspec.yaml");

  let type = "unknown";

  if (fs.existsSync(pubspecPath)) {
    context.projectType = "flutter";
    if (!context.silent) {
      console.log("ℹ️  Project type detected: flutter");
    }
    return;
  }

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    if (deps?.next) type = "nextjs";
    else if (deps?.vite) type = "vite";
    else if (deps?.express) type = "express";
    else type = "node";
  }

  context.projectType = type;

  if (!context.silent) {
    console.log(`ℹ️  Project type detected: ${type}`);
  }
};
