ExampleClassTest = TestCase("ExampleClassTest");

var Todomvc = require("todomvc/Todomvc");

ExampleClassTest.prototype.testHelloWorldUtil = function()
{
	assertEquals( "Hello World!", Todomvc.helloWorldUtil() );
};
