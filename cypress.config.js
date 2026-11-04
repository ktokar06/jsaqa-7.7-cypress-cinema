const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID || "your_project_id",
  e2e: {
    baseUrl: "https://qamid.tmweb.ru",
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
