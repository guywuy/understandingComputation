var sim = require('./SIMPLE/simple.js');

// var statement = new sim.Divide(new sim.Number(3700), new sim.Add(new sim.Variable('x'), new sim.Variable('y'))),
// 	env = {
// 		x: new sim.Number(3),
// 		y: new sim.Number(34)
// 	};


// var statement = new sim.Assign("x", new sim.Add(new sim.Variable("x"), new sim.Number(2)))


// var env = {x: new sim.Boolean('true')}
//  var statement = new sim.If(new sim.Variable("x"), new sim.Assign(new sim.Variable("y"), new sim.Number(2)), new sim.Assign(new sim.Variable("y"), new sim.Number(1)));

//  var mac = new sim.Machine(statement, env).run()


// var stat = new sim.Add(new sim.Number(12), new sim.Number(14))



// x = (x*4)+(12/3)

var statement = new sim.Assign(new sim.Variable("x"), new sim.Add(new sim.Multiply(new sim.Variable("x"), new sim.Number(4)), new sim.Divide(new sim.Number(12), new sim.Number(3))))
var env = {x: new sim.Number(3)}


// // If 1

// if true, x = 1 else x=2

// var statement = new sim.If(new sim.Boolean('true'), new sim.Assign('x', new sim.Number(1)), new sim.Assign('x', new sim.Number(2)))
// var env = {};
// if 1<12, x=1 else x=2
// var statement = new sim.If(new sim.LessThan(new sim.Number(1), new sim.Number(12)), new sim.Assign('x', new sim.Number(1)), new sim.Assign('x', new sim.Number(2)))

// // If 2

// if x<10 , x + 2 else x - 2

// var statement = new sim.If(new sim.LessThan(new sim.Variable('x'), new sim.Number(10)), new sim.Add(new sim.Variable('x'), new sim.Number(2)), new sim.Subtract(new sim.Variable('x'), new sim.Number(2)))
// var env = {
// 	x: new sim.Number(2)
// }

// // Sequence

// x = 1+1;
// y = x+3;

// var statement = new sim.Sequence(new sim.Assign('x', new sim.Add(new sim.Number(1), new sim.Number(1))), new sim.Assign('y', new sim.Add(new sim.Variable("x"), new sim.Number(3))));
// var env = {};


// // While

// while x<5     x = x * 3   {x=1}

// var statement = new sim.While(new sim.LessThan(new sim.Variable("x"), new sim.Number(5)), new sim.Assign(new sim.Variable("x"), new sim.Multiply(new sim.Variable("x"), new sim.Number(3))));

// var env = {
// 	'x': new sim.Number(1)
// }

var mac = new sim.Machine(statement, env).run()