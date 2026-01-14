module.exports = {
  apps: [{
    name: 'energy-did-generation',
    script: 'npm',
    args: 'run start:prod',
    env: {
      PORT: 6001,
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};