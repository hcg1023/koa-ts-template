module.exports = {
  apps: [
    {
      name: process.env.npm_package_name,
      script: './dist-prd/index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: [
        // 不用监听的文件
        'node_modules',
        'public',
        'logs',
      ],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'prd',
        PORT: 5000,
      }
    },
    {
      name: process.env.npm_package_name + '-test',
      script: './dist-test/index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: [
        // 不用监听的文件
        'node_modules',
        'public',
        'logs',
      ],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'test',
        PORT: 5001,
      }
    },
  ],
}
