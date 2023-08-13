const { teardown: teardownDevServer } = require("jest-dev-server");

module.exports = async function globalTeardown() {
  await teardownDevServer(globalThis.servers);
  // Your other global teardown can go here if needed
};
