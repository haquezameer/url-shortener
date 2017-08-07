const env = process.env.NODE_ENV || 'development';
if(env === 'development' || env === 'test'){
  const config = require('./config.json');
  const envConfig = config[env];
  const configKeys = Object.keys(envConfig);
  configKeys.forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
