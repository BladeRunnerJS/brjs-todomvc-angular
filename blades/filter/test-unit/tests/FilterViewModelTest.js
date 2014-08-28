var FilterViewModelTest = TestCase( 'FilterViewModelTest' );

var FilterViewModel = require( 'brjstodo/filter/FilterViewModel' );

FilterViewModelTest.prototype.testSomething = function() {
  var model = new FilterViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
