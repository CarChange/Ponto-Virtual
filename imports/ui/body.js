import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Pontos } from '../api/pontos.js';

import './ponto.js';
import './body.html';

Template.body.helpers({
  pontos() {
    return Pontos.find({}, {sort: {username: -1}});
  },
});

Template.body.events({
   'submit .new-ponto'(event) {
       event.preventDefault();

       Meteor.call('pontos.pontoIn');
   },

   'submit .multiplex'(evento) {
       evento.preventDefault();

       var n = evento.target.mph.value;

       Meteor.call('pontos.retornaTotal', n, function(error, result) {
         if(!error) {
                sweetAlert("hey", "Você ganhou R$ " + result + ". Parabéns. Que mixaria. Tsc Tsc... ");
         }
       });

   },


});
