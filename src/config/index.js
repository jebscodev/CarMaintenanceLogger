import Constants from "expo-constants";
const { manifest } = Constants;

export const API = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? `http://${manifest.debuggerHost.split(':').shift()}:8000`
  : `api.example.com`;

/*
1. created tunnel via ngrok
2. domain changes every tunnel restart
3. commands:
- ngrok.exe authtoken <token provided>
- ngrok.exe http <port number>
*/
  export const API_TUNNEL = 'http://99c0d41718e8.ngrok.io/api'; // forwards to http://localhost:8000
