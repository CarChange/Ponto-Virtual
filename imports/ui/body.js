import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Pontos } from '../api/pontos.js';

import './ponto.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  Meteor.subscribe('pontos');
});

Template.body.helpers({
  pontos() {
    return Pontos.find({}, { sort: {username: -1 } });
  },
});

Template.body.events({
   'submit .new-ponto'(event) {
       event.preventDefault();
       var count = Pontos.find({checked: true, username: Meteor.user().username }).count();
       if(count == 1) {
          swal("Hey", "Termine primeiro seu último ponto!", "error");
       }
       else if (count == 0) {
          Meteor.call('pontos.pontoIn');
       }
       else {
         swal("Opa", "Deu ruim kkk o count deu " + count);
       }
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
