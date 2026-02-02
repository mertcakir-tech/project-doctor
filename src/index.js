#!/usr/bin/env node

// args
const args = process.argv.slice(2);
const isJson = args.includes("--json");
const isFix = args.includes("--fix");

// context
const context = require("./context");
context.silent = isJson;
context.fix = isFix;

// checks
const checkNode = require("../checks/node");
const detectProjectType = require("../checks/project-type");
const checkEnv = require("../checks/env");
const checkNodeModules = require("../checks/node-modules");
const checkPackage = require("../checks/package");
const checkGitignore = require("../checks/gitignore");
const nodeSpecific = require("../checks/node-specific");
const flutterSpecific = require("../checks/flutter-specific");
const loadConfig = require("./config");
const config = loadConfig();
context.config = config;

// start
if (!context.silent) {
  console.log("🩺 Project Doctor starting...\n");
}

// run checks
detectProjectType(context);
checkNode(context);
checkNodeModules(context);
checkPackage(context);
checkEnv(context);
checkGitignore(context);
nodeSpecific(context);
flutterSpecific(context);

// output
if (isJson) {
  console.log(
    JSON.stringify(
      {
        score: context.score,
        projectType: context.projectType
      },
      null,
      2
    )
  );
} else {
  console.log(`\n📊 Health score: ${context.score} / 100`);
}
