import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

Users = Meteor.users;

if(Meteor.isServer){
    Meteor.publish('userData', function usersPublication() {
        return Meteor.users.find({}, { _id: 0, fields: {"isAdmin": 1, "username": 1}});
    });
}

Meteor.methods({
    firstAdmin: function(){

    }
});
