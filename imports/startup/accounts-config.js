import { Accounts } from 'meteor/accounts-base';

console.log("I got here");

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
    forceUsernameLowercase: true
});

console.log("I got here (2)");
