importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");

var config = {
  apiKey: "AIzaSyAQHzfr77nxJvd3drK2unojzfu5HyJiuYs",
  authDomain: "fir-526a0.firebaseapp.com",
  projectId: "fir-526a0",
  storageBucket: "fir-526a0.appspot.com",
  messagingSenderId: "718246319716",
  appId: "1:718246319716:web:858417466fe184dabbf171",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.subject;
  const notificationOptions = {
    body: payload.data,
    icon: "/itwonders-web-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

var config = {
  apiKey: "AIzaSyAQHzfr77nxJvd3drK2unojzfu5HyJiuYs",
  authDomain: "fir-526a0.firebaseapp.com",
  projectId: "fir-526a0",
  storageBucket: "fir-526a0.appspot.com",
  messagingSenderId: "718246319716",
  appId: "1:718246319716:web:858417466fe184dabbf171",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.subject;
  const notificationOptions = {
    body: payload.data,
    icon: "/itwonders-web-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
