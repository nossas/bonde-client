module.exports = {
  apps: [
    {
      name: "worker-app",
      script: "./worker.js",
      watch: true,
      env: {
        DATABASE_URL:
          "postgres://monkey_user:monkey_pass@localhost:49153/bonde",
        NODE_ENV: "development",
        PGUSER: "monkey_user",
        PGPASSWORD: "monkey_pass",
        PGPORT: "49153",
        PGDATABASE: "bonde",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "server-app",
      script: "./server.js",
      watch: true,
      env: {
        DATABASE_URL:
          "postgres://monkey_user:monkey_pass@localhost:49153/bonde",
        NODE_ENV: "development",
        PGUSER: "monkey_user",
        PGPASSWORD: "monkey_pass",
        PGPORT: "49153",
        PGDATABASE: "bonde",
      },
      env_production: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
