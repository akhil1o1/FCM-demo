/* eslint-disable no-undef */
importScripts(
   "https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js"
);
importScripts(
   "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js"
);

const config = {
   apiKey: "AIzaSyDyN2WPpgWZAOhD17t9tLQ8s361MfSewaU",
   authDomain: "fcm-demo-bbc2e.firebaseapp.com",
   projectId: "fcm-demo-bbc2e",
   storageBucket: "fcm-demo-bbc2e.firebasestorage.app",
   messagingSenderId: "235530442918",
   appId: "1:235530442918:web:a46d64224f31d03bbffc67",
   measurementId: "G-SQTLY8YPF9",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
   console.log("received background message", payload);
});
