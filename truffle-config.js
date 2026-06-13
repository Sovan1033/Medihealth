module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,          // Ganache default
      network_id: "*"
    },
    ganache_cli: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: { enabled: false, runs: 200 },
        evmVersion: "london"
      }
    }
  }
};
