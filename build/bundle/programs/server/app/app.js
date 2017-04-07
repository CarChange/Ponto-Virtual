var require = meteorInstall({"imports":{"api":{"pontos.js":["meteor/mongo","meteor/check","meteor/meteor",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// imports/api/pontos.js                                                                                     //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
module.export({                                                                                              // 1
    Pontos: function () {                                                                                    // 1
        return Pontos;                                                                                       // 1
    }                                                                                                        // 1
});                                                                                                          // 1
var Mongo = void 0;                                                                                          // 1
module.import('meteor/mongo', {                                                                              // 1
    "Mongo": function (v) {                                                                                  // 1
        Mongo = v;                                                                                           // 1
    }                                                                                                        // 1
}, 0);                                                                                                       // 1
var check = void 0;                                                                                          // 1
module.import('meteor/check', {                                                                              // 1
    "check": function (v) {                                                                                  // 1
        check = v;                                                                                           // 1
    }                                                                                                        // 1
}, 1);                                                                                                       // 1
var Meteor = void 0;                                                                                         // 1
module.import('meteor/meteor', {                                                                             // 1
    "Meteor": function (v) {                                                                                 // 1
        Meteor = v;                                                                                          // 1
    }                                                                                                        // 1
}, 2);                                                                                                       // 1
var Pontos = new Mongo.Collection('pontos');                                                                 // 5
                                                                                                             //
if (Meteor.isServer) {                                                                                       // 7
    // This code only runs on the server                                                                     // 8
    Meteor.publish('pontos', function () {                                                                   // 9
        function pontosPublication() {                                                                       // 9
            return Pontos.find({});                                                                          // 10
        }                                                                                                    // 11
                                                                                                             //
        return pontosPublication;                                                                            // 9
    }());                                                                                                    // 9
}                                                                                                            // 12
                                                                                                             //
Meteor.methods({                                                                                             // 14
    'pontos.pontoIn': function () {                                                                          // 15
        if (!Meteor.userId()) {                                                                              // 17
            throw new Meteor.Error('not-authorized');                                                        // 18
        }                                                                                                    // 19
                                                                                                             //
        Pontos.insert({                                                                                      // 21
            username: Meteor.user().username,                                                                // 22
            owner: Meteor.userId(),                                                                          // 23
            checked: true,                                                                                   // 24
            dateIn: new Date()                                                                               // 25
        });                                                                                                  // 21
    },                                                                                                       // 28
    'pontos.pontoOut': function (dateIn, pontoId) {                                                          // 29
        check(pontoId, String);                                                                              // 30
        var dateOut = new Date();                                                                            // 32
        var hours = Math.abs(dateIn - dateOut) / 36e5; //criar multiplicador para salario dentro do usuario;
                                                                                                             //
        Pontos.update(pontoId, {                                                                             // 36
            $set: {                                                                                          // 36
                checked: false,                                                                              // 36
                dateOut: dateOut,                                                                            // 37
                horasAtual: hours                                                                            // 38
            }                                                                                                // 36
        });                                                                                                  // 36
    },                                                                                                       // 41
    'pontos.retornaTotal': function (mult) {                                                                 // 42
        var t;                                                                                               // 44
        var obj = Pontos.aggregate([{                                                                        // 45
            $match: {                                                                                        // 46
                username: Meteor.user().username                                                             // 46
            }                                                                                                // 46
        }, {                                                                                                 // 46
            $group: {                                                                                        // 47
                _id: null,                                                                                   // 47
                total: {                                                                                     // 47
                    $sum: "$horasAtual"                                                                      // 47
                }                                                                                            // 47
            }                                                                                                // 47
        }]);                                                                                                 // 47
        t = obj[0].total * mult;                                                                             // 49
        return t;                                                                                            // 51
    },                                                                                                       // 52
    'pontos.dropPontos': function (scope) {                                                                  // 53
        check(scope, String); // TODO jogar para outra collection -> manter dados como registro.             // 54
                                                                                                             //
        if (scope == "own") {                                                                                // 58
            Pontos.remove({                                                                                  // 59
                username: Meteor.user().username                                                             // 59
            });                                                                                              // 59
        } else if (scope == "all") {                                                                         // 60
            Pontos._dropCollection();                                                                        // 62
        }                                                                                                    // 63
    }                                                                                                        // 64
});                                                                                                          // 14
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["meteor/meteor","../imports/api/pontos.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// server/main.js                                                                                            //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var Meteor = void 0;                                                                                         // 1
module.import('meteor/meteor', {                                                                             // 1
  "Meteor": function (v) {                                                                                   // 1
    Meteor = v;                                                                                              // 1
  }                                                                                                          // 1
}, 0);                                                                                                       // 1
module.import('../imports/api/pontos.js');                                                                   // 1
Meteor.startup(function () {// code to run on server at startup                                              // 4
});                                                                                                          // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
