import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Pontos = new Mongo.Collection('pontos');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('pontos', function pontosPublication() {
      return Pontos.find({});
    });
}

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

        if(Meteor.users.find().count() == 1 && !Meteor.user().isAdmin) {
            Meteor.users.update(Meteor.userId, { $set: { isAdmin: true } });
        }

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
        var obj = Pontos.aggregate([
          { $match: { username: Meteor.user().username } },
          { $group: { _id: null, total: { $sum: "$horasAtual" } } }
        ]);
        t = obj[0].total * mult;

        return t;
    },
    'pontos.dropPontos'(scope) {
        check(scope, String);

        // TODO jogar para outra collection -> manter dados como registro.

        if(scope == "own") {
            Pontos.remove({ username: Meteor.user().username });
        }
        else if (scope == "all") {
            Pontos._dropCollection();
        }
    }

});
