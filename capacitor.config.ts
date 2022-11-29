import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sg.edu.nyp.sit.jobeasy',
  appName: 'JobEasy',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    "CapacitorHttp": {"enabled":  true},
    
  }
};

export default config;
