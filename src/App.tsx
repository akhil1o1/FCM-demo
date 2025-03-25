import { useEffect, useState } from "react";
import { requestFcmToken } from "./firebaseConfig";

import "./App.css";

function App() {
   const [fcmToken, setFcmToken] = useState<string | null>(null);
   const isPermissionGranted = Notification.permission === "granted"; // default, denied, granted

   useEffect(() => {
      const getToken = async () => {
         const token = await requestFcmToken();
         setFcmToken(token);
      };
      getToken();
   }, []);


   const handleClick = () => {
      // it will prompt user for notification permission if its not already denied
      Notification.requestPermission();
   };

   return (
      <>
         <h1>FCM Demo</h1>
         <div className="card">
            {!isPermissionGranted ? (
               <button onClick={handleClick}>
                  Notification Permission Required
               </button>
            ) : (
               <p>{fcmToken}</p>
            )}
         </div>
      </>
   );
}

export default App;
