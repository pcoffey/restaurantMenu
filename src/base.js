import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyArKBuTaLc0GsZ5-f2FnF7sZ5vmTkCWD8E",
    authDomain: "catch-of-the-day-coffey.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-coffey.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;