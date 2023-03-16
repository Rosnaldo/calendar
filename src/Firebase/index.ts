import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCsMEkelc_NAr96LlyO40cDrNBm9KZK-Y0',
  authDomain: 'calendar-fbdae.firebaseapp.com',
  projectId: 'calendar-fbdae',
  storageBucket: 'calendar-fbdae.appspot.com',
  messagingSenderId: '839576054786',
  appId: '1:839576054786:web:1253f823bc7b268be48b1b',
  measurementId: 'G-4VBCJBD5LR'
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const db = getFirestore(app)
