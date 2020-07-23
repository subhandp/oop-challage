const Datastore = require('nedb'),
    db = new Datastore({ filename: 'user', autoload: true });

let user1 = {
    username: 'subhandp',
    password: 'abcde',
    nama: 'subhan dinda putra',
    loggedin: false,
    last_login: null,
};

let user2 = {
    username: 'unamed',
    password: '12345',
    nama: 'lorem ipsum dolor',
    loggedin: false,
    last_login: null,
};

db.insert(user1, function(err, newDoc) { // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    console.log(`sukses insert _id ${newDoc}`);
    db.insert(user2, function(err, newDoc) {
        console.log(`sukses insert _id ${newDoc}`);
    });
});