import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Pontos } from '../api/pontos.js';

import './ponto.js';
import './body.html';
import './navbar.html';

Template.body.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  Meteor.subscribe('pontos');
  Meteor.subscribe('userData');
});

Template.body.helpers({
  pontos() {
      return Pontos.find({}, { sort: {username: -1 } });
  },
  checkAdmin() {
      return Meteor.user().isAdmin;
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
   'submit .drop-own-pontos'(event) {
      event.preventDefault();

      swal({
          title: "Hey você",
          text: "Você realmente quer deletar todos os seus pontos?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Sim. Sei que não vou receber se clicar aqui.",
          cancelButtonText: "Não me deixe fazer isso!",
          closeOnConfirm: false
       },
       function(){
         Meteor.call('pontos.dropPontos', "own");
         swal("Já foi", "Seu trabalho foi deletado.", "success");
       });
   },
   'submit .drop-all-pontos'(event) {
     event.preventDefault();

     swal({
         title: "Hey você",
         text: "Você realmente quer deletar todos os pontos?",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Sim. Sei que todo mundo vai ficar com raiva.",
         cancelButtonText: "Não me deixe fazer isso!",
         closeOnConfirm: false
      },
      function(){
        Meteor.call('pontos.dropPontos', "all");
        swal("Já foi", "Você deletou o trabalho de todo mundo.", "success");
      });
   }



});
