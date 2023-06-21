import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
// Your web app's Firebase configuration

console.log(process.env.NEXT_PUBLIC_authDomain)
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_appId,
}
let app
if (!getApps().length) {
	app = initializeApp(firebaseConfig)
} else {
	app = getApps()[0] // if already initialized, use that one
}

const database = getFirestore(app)

export { database }
