import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import nuxtConfig from "../../nuxt.config";
let firebaseApp;
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.measurementId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}
const apps = getApps()
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = apps[0]
}
const db = getFirestore(firebaseApp, {})
export { db }
