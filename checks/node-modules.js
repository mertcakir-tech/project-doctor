const fs = require("fs");
const path = require("path");

module.exports = function checkNodeModules(context) {
  if (context.projectType !== "node" && context.projectType !== "express") {
    return;
  }
  const modulesPath = path.join(process.cwd(), "node_modules");

  if (!fs.existsSync(modulesPath)) {
    if (!context.silent) {
      console.log("⚠️  node_modules not found");
      console.log("💡 Try this:");
      console.log("   npm install\n");
    }
    return;
  }

  if (!context.silent) {
    console.log("✅ node_modules exists");
  }
};
