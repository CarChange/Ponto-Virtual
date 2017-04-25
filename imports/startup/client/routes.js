import {Router} from 'meteor/iron:router';

Router.route("/", function(){
  this.render("bode");
});
Router.route('/',);
Router.route('/home');
Router.route('/signIn');
Router.route('/register');
