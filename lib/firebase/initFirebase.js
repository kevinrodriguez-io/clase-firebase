import firebase from 'firebase/app';

// REEMPLAZAR CON SUS DATOS

const firebaseConfig = {
  // apiKey: "AIzaSyB5sqJupW8bTukdZh3cJLUvRej7bv51LWU",
  // authDomain: "clase-bases-de-datos-3a467.firebaseapp.com",
  // projectId: "clase-bases-de-datos-3a467",
  // storageBucket: "clase-bases-de-datos-3a467.appspot.com",
  // messagingSenderId: "620493307831",
  // appId: "1:620493307831:web:3918f2375f95ec105d3232",
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.warn(error);
}
