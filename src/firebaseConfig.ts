import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
   apiKey: "AIzaSyDyN2WPpgWZAOhD17t9tLQ8s361MfSewaU",
   authDomain: "fcm-demo-bbc2e.firebaseapp.com",
   projectId: "fcm-demo-bbc2e",
   storageBucket: "fcm-demo-bbc2e.firebasestorage.app",
   messagingSenderId: "235530442918",
   appId: "1:235530442918:web:a46d64224f31d03bbffc67",
   measurementId: "G-SQTLY8YPF9",
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

// request notification permission only if not already granted
const requestPermission = async () => {
   if (Notification.permission === "granted") return true;
   try {
      const permission = await Notification.requestPermission();
      return permission === "granted";
   } catch (error) {
      console.error("error requesting notification permission", error);
      return false;
   }
};

const registerServiceWorker = async () => {
   try {
      const existingRegistration =
         await navigator.serviceWorker.getRegistration();
      if (existingRegistration) {
         console.log("service worker already registered", existingRegistration);
         return existingRegistration;
      }

      // manually register service worker if not already registered
      const newRegistration = await navigator.serviceWorker.register(
         "/firebase-messaging-sw.js" // name of the firebase service worker file in your public directory
      );
      console.log("service worker registered", newRegistration);
      await navigator.serviceWorker.ready;
      return newRegistration;
   } catch (error) {
      console.error("error in service worker registration", error);
      return null;
   }
};

export const requestFcmToken = async () => {
   const hasPermission = await requestPermission();
   if (!hasPermission) return null;

   // notification permssion must be granted before getting FCM token
   try {
      const registration = await registerServiceWorker();
      if (!registration) return null;

      const token = await getToken(messaging, {
         vapidKey:
            "BG73dq-cpSGRs1oAezHTae4ftxhC1Z87XZGxWS1oukzCs5aD28Wrogg3OXl-QvAz-2eHaIAhTe1bSDRm5DU5ILE",
         serviceWorkerRegistration: registration,
      });

      if (!token) {
         console.error("No FCM token received");
         return null;
      }

      console.log("FCM Token", token);
      return token;
   } catch (error) {
      console.error("error getting FCM token", error);
      return null;
   }
};

onMessage(messaging, (payload) => {
   console.log("foreground message received", payload);
   alert(payload.notification?.body);
});
