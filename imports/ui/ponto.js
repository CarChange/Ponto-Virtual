import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './ponto.html';
 
Template.ponto.helpers({
    getDateIn() {
        return this.dateIn.toLocaleString();
    },
    getDateOut() {
        return this.dateOut.toLocaleString();
    }
});

Template.ponto.events({
   'click .horas'() {
       sweetAlert("hey", "go away");
       
       var ths = this;
       
       swal({
           title: "Hey você",
           text: "Você realmente terminou o seu trampo?",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Sim, chefe. Deixe eu ir embora",
           closeOnConfirm: false
        },
        function(){
          swal("Trampou!", "Seu trabalho imaginário foi imaginariamente registrado.", "success");
          Meteor.call('pontos.pontoOut', ths.dateIn, ths._id);
        });
       
   }
    
    
});