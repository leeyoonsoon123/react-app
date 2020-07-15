import app from 'firebase/app';
require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyAjjQEjQb-w-LvM-rLtyhRM5O-boZyHX98",
    authDomain: "delius-46aa7.firebaseapp.com"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app;
    }
    
}

export default Firebase;

