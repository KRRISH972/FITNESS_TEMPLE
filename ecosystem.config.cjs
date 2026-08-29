module.exports = {
  apps: [
    {
      name: "fitness-temple",
      cwd: __dirname,
      script: "./artifacts/api-server/dist/index.mjs",
      interpreter: "node",
      node_args: "--enable-source-maps",
      env: {
        NODE_ENV: "production",
        PORT: "8080",
      },
      autorestart: true,
      max_restarts: 20,
      restart_delay: 3000,
      exp_backoff_restart_delay: 100,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};