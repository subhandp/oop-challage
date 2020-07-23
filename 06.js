const Datastore = require('nedb'),
    db = new Datastore({ filename: 'user', autoload: true });

class Auth {
    constructor() {
        this.userLoginId = null;
    }
    login(obj) {
        db.find(obj, function(err, docs) {
            if (docs.length > 0) {
                db.update({ _id: docs[0]._id }, { $set: { loggedin: true, last_login: new Date() } }, { multi: true }, function(err, numReplaced) {
                    this.userLoginId = docs[0]._id;
                    console.log(`user loggedin ${numReplaced}`);
                    console.log(this.userLoginId);
                }.bind(this));
            } else {
                console.log('salah username / password');
            }
        }.bind(this));
    }
    validate(obj) {
        db.find(obj, function(err, docs) {
            if (docs.length > 0) {
                console.log(true);
            } else {
                console.log('salah username / password');
            }
        });
    }
    logout() {
        if (typeof this.userLoginId !== null) {
            db.find({ _id: this.userLoginId }, function(err, docs) {
                db.update({ _id: this.userLoginId }, { $set: { loggedin: false } }, { multi: true }, function(err, numReplaced) {
                    this.userLoginId = undefined;
                    console.log(`user loggedout ${numReplaced}`);
                });
            });
        } else {
            console.log('undefined user');
        }
    }

    user() {
        if (this.userLoginId !== null) {
            db.find({ _id: this.userLoginId }, function(err, docs) {
                console.log('username :' + docs[0].username);
                console.log('nama :' + docs[0].nama);

            });
        } else {
            console.log('undefined user');
        }
    }

    id() {
        if (this.userLoginId !== null) {
            console.log('user id:' + this.userLoginId);
        } else {
            console.log('undefined user');
        }
    }

    check() {
        db.find({ loggedin: true }, function(err, docs) {
            if (docs.length > 0) {
                return console.log(true);
            } else {
                return console.log(false);
            }
        });
    }

    guest() {
        db.find({ loggedin: true }, function(err, docs) {
            if (docs.length == 0) {
                return console.log(true);
            } else {
                return console.log(false);
            }
        });
    }

    lastLogin() {
        if (this.userLoginId !== null) {
            db.find({ _id: this.userLoginId }, function(err, docs) {
                console.log('login :' + this.userLoginId);
            });
        } else {
            console.log('undefined user lastlogin');
        }
    }
}

const auth = new Auth();

auth.login({ username: 'subhandp', password: 'abcde' });
auth.lastLogin();