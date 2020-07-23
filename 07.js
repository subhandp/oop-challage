const data = {
    username: '',
    email: 'email@example.com',
    name: 'Mulia#',
    zip: 75324,
    is_admin: true,
    age: 22,
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
        this.message = message;
        this.errorsValid = [];
    }
    errors() {
        console.log(this.errorsValid);
    }
    fails() {
        let fails = false;
        console.log(this.data.username.length);
        for (const key in this.rules) {
            if (this.rules.hasOwnProperty(key)) {
                const myRules = this.rules[key];
                const data = this.data[key]
                myRules.split('|').map(function(rule) {
                    if (rule == 'required') {
                        if (data.length <= 0) {
                            fails = true;
                            this.errorsValid.push(rule + ' ' + key);

                        }
                    }
                    if (rule == 'alphanum') {
                        var letters = /^[0-9a-zA-Z]+$/gi;
                        if (!data.match(letters)) {
                            console.log(data);
                            fails = true;
                            this.errorsValid.push(rule + ' ' + key);
                        }
                    }

                    if (rule == 'email') {
                        var letters = /\S+@\S+\.\S+/;
                        if (!data.match(letters)) {
                            fails = true;
                            this.errorsValid.push(rule + ' ' + key);
                        }
                    }

                    if (rule == 'numeric') {
                        if (typeof data !== 'number') {
                            fails = true;
                            this.errorsValid.push(rule + ' ' + key);
                        }
                    }

                    if (rule == 'boolean') {
                        if (!typeof data == 'boolean') {
                            fails = true;
                            this.errorsValid.push(rule + ' ' + key);
                        }
                    }

                    if (rule.split(':')[0] === 'min' && typeof parseInt(rule.split(':')[1]) === 'number') {
                        if (data > parseInt(rule.split(':')[1])) {
                            fails = true;
                            this.errorsValid.push(rule + ' ' + key);
                        }
                    }

                }.bind(this));
            }
        }


        return console.log(fails);
    }
}

const validator = new Validator(data, rules, message)

validator.fails()
validator.errors()