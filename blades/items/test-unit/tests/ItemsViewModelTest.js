var ItemsViewModelTest = TestCase( 'ItemsViewModelTest' );

var ItemsViewModel = require( 'brjstodo/items/ItemsViewModel' );

ItemsViewModelTest.prototype.testSomething = function() {
  var model = new ItemsViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
