const semver = require("semver");

module.exports = function checkNode(context) {
  if (context.projectType !== "node" && context.projectType !== "express") {
    return;
  }
  const required = ">=18.0.0";
  const current = process.version;

  if (!semver.satisfies(current, required)) {
    if (!context.silent) {
      console.log(`❌ Node version mismatch`);
      console.log(`   Required: ${required}`);
      console.log(`   You have:  ${current}`);
    }
    process.exitCode = 1;
  } else {
    if (!context.silent) {
      console.log(`✅ Node version is suitable (${current})`);
    }
  }
};
