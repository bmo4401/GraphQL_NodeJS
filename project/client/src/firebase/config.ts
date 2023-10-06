// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyDjeEaWjiSlMahs8IFlHolUVNDmXLWfXjI',
   authDomain: 'note-app-grapql-263fe.firebaseapp.com',
   projectId: 'note-app-grapql-263fe',
   storageBucket: 'note-app-grapql-263fe.appspot.com',
   messagingSenderId: '104629578098',
   appId: '1:104629578098:web:11149dacabaac6672e95eb',
   measurementId: 'G-380KL5VEM9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
