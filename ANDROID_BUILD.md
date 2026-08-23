# Level Up AI — Android APK packaging

This project is prepared to be wrapped as a native Android app with Capacitor.

## On a computer

1. Install Node.js and Android Studio.
2. Open this folder in a terminal.
3. Run:
   npm install
4. Add Android:
   npx cap add android
5. Sync the web app:
   npx cap sync android
6. Open Android Studio:
   npx cap open android
7. In Android Studio, choose the app and build an APK.

### Important AI note

The AI Coach currently calls `/api/coach`, which is a Node server. An APK by itself cannot provide that server. For the AI Coach to work outside your computer, deploy `server.js` to a secure HTTPS host and configure the app to call that hosted backend.

Never put OPENAI_API_KEY inside the Android app. Keep it on the server.

The local dashboard, roadmap, missions and progress tracking can still run inside the app.
