import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Pontos = new Mongo.Collection('pontos');

Meteor.methods({
    'pontos.pontoIn'() {

        if(! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Pontos.insert({
            username: Meteor.user().username,
            owner: Meteor.userId(),
            checked: true,
            dateIn: new Date(),
        });

    },
    'pontos.pontoOut'(dateIn, pontoId) {
        check(pontoId, String);

        var dateOut = new Date();
        var hours = Math.abs(dateIn - dateOut) / 36e5;
        //criar multiplicador para salario dentro do usuario;

        Pontos.update(pontoId, { $set: { checked: false,
                dateOut: dateOut,
                horasAtual: hours,
            }
        });
    },
    'pontos.retornaTotal'(mult) {

        var t;
        var obj = Pontos.aggregate([{$group: { _id: null, total: {$sum: "$horasAtual"}}}]);
        t = obj[0].total * mult
        
        return t;
    }


});
