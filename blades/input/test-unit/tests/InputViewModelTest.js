var InputViewModelTest = TestCase( 'InputViewModelTest' );

var InputViewModel = require( 'brjstodo/default/input/InputViewModel' );

InputViewModelTest.prototype.testSomething = function() {
  var model = new InputViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
