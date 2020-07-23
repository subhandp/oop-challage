const data = {
    username: 'mul14',
    email: 'email@example.com',
    name: 'Mulia',
    zip: 75324,
    is_admin: true,
    age: 28,
}

const rules = {
    username: 'required|alphanum',
    email: 'required|email',
    name: 'required',
    zip: 'required|numeric',
    is_admin: 'boolean',
    age: 'numeric|min:21',
}

// // The message is optional. But user should be able to customize the messages.
const message = {
    required: 'The %s field is required.', // Message will be "The username field is required."
    age: 'The %s field must a number.', // The age field must a number.
}

// const validator = new Validator(data, rules, message)

// validator.fails() // If data contain not valid field, will return true.

// validator.passes() // If all data valid, will return true.

// validator.errors() // Show all error fields with error message.

class Validator {
    constructor(data, rules, message) {
        this.data = data;
        this.rules = rules;
        this.message = message
    }

    fails() {
        let fails = false;
        console.log(this.data.username.length);
        this.rules.username.split('|').map(function(rule) {
            let username = this.data.username;
            if (rule == 'alphanum') {
                var letters = /^[0-9a-zA-Z]+$/gi;
                if (!username.match(letters)) {
                    console.log(username);
                    fails = true;
                }
            }
            if (rule == 'required') {
                if (username.length <= 0) {
                    fails = true;
                }
            }
        }.bind(this));

        this.rules.email.split('|').map(function(rule) {
            let email = this.data.email;
            if (rule == 'email') {
                var letters = /\S+@\S+\.\S+/;
                if (!email.match(letters)) {
                    fails = true;
                }
            }
            if (rule == 'required') {
                if (email.length <= 0) {
                    fails = true;
                }
            }
        }.bind(this));

        if (this.rules.name == 'required') {
            if (this.data.name.length <= 0) {
                fails = true;
            }
        }


        this.rules.zip.split('|').map(function(rule) {
            let zip = this.data.zip;
            if (rule == 'numeric') {
                if (typeof zip !== 'number') {
                    fails = true;
                }
            }
            if (rule == 'required') {
                if (zip.length <= 0) {
                    fails = true;
                }
            }
        }.bind(this));

        if (this.rules.is_admin == 'boolean') {
            if (!typeof this.data.is_admin == 'boolean') {
                fails = true;
            }
        }

        return console.log(fails);
    }
}

const validator = new Validator(data, rules, message)

validator.fails() // If data contain not valid field, will return true.