const fs = require("fs");
const path = require("path");

module.exports = function loadConfig() {
  const configPath = path.join(process.cwd(), "doctor.config.json");

  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    return {};
  }
};
