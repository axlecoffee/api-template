module.exports = {
  apps: [
    {
      name: "mod-checker-cdn",
      script: "src/app.ts",
      interpreter: "ts-node",
      exec_mode: 'cluster_mode',
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};