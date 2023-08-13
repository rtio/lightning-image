const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
  globalThis.servers = await setupDevServer({
    command: `node __tests__/server.js`
  });
  // Your other global setup can go here if needed
};
