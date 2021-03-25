import firebase from "firebase/app";
import "firebase/auth";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDTb3mVvosu4pbFJwx1SJWGjYJasSfcpEM",
  authDomain: "project-manager-dd0f2.firebaseapp.com",
  projectId: "project-manager-dd0f2",
  storageBucket: "project-manager-dd0f2.appspot.com",
  messagingSenderId: "227398695519",
  appId: "1:227398695519:web:e9e74c9111d72dfedaf9ea",
};

export default function firebaseClient() {
  if (!firebase.apps?.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
