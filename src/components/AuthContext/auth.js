const moment = require('moment')

class Auth {
    constructor() {
        this.Metadata = {
            authStatus: '',
            uid: ''
        }
        this.User = {
            age: 0,
            ex: '',
            st: '',
            fo1: 0,
            fo2: 0,
            fo3: 0,
            fo4: 0,
            im: [],
            job: '',
            na: ''
        }
    }
    
    async Auth_initialize() {
        const url = 'https://us-central1-delius-46aa7.cloudfunctions.net/deliusApi/user/isAuthenticated';
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'Content-Type'
                }
            }).then(res => {
                return res.json();
            });

            if(response.uid === '') {
                return {uid: ''}
            }
            else {
                this.Metadata.authStatus = 'user';
                this.Metadata.uid = response.uid;
                this.User_initialize(response);
                return response;
            }
    }

    User_initialize(userInfo) {
        let UserObj = {};
        UserObj.st = userInfo.st;
        UserObj.ex = userInfo.ex;
        UserObj.fo1 = userInfo.fo1;
        UserObj.fo2 = userInfo.fo2;
        UserObj.fo3 = userInfo.fo3;
        UserObj.fo4 = userInfo.fo4;
        UserObj.im = userInfo.im;
        UserObj.job = userInfo.job;
        UserObj.na = userInfo.na;

        const moment_now = moment();

        const now_year = moment_now.year();
        const now_month = moment_now.month() + 1;
        const now_date = moment_now.date();

        const bt_year = parseInt(userInfo.bt.slice(0, 4));
        const bt_month = parseInt(userInfo.bt.slice(4, 6));
        const bt_date = parseInt(userInfo.bt.slice(6, 8));

        let tempAge = now_year - bt_year - 1;
        if(now_month > bt_month) {
            tempAge++;
        }
        else if(now_month === bt_month){
            if(now_date >= bt_date) {
                tempAge++;
            }
        }

        UserObj.age = tempAge;
        this.User = UserObj
    }

    getAuthStatus() {
        return this.Metadata.authStatus;
    }

    getUid() {
        return this.Metadata.uid
    }

    setUid(uid) {
        this.Metadata.uid = uid;
    }

    setAuthStatus(authStatus) {
        this.Metadata.authStatus=authStatus
    }
}

export default Auth;