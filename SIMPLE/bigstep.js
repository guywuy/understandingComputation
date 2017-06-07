// Syntax including expressions and statments of 'Simple' programming language.

// Expressions

class Number {
	constructor(value) {
		this.value = value
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}

	evalu(environment) {
		console.log("Number: " + this);
		return this.value;
	}
}

class Add {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} + ${this.right}>`;
	}

	evalu(environment) {
		console.log("Addition: " + this.toString(), environment);
		return (this.left.evalu(environment) + this.right.evalu(environment));
	}
}

class Multiply {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} * ${this.right}>`;
	}

	evalu(environment) {
		return (this.left.evalu(environment) * this.right.evalu(environment));
	}
}

class Subtract {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} - ${this.right}>`;
	}

	evalu(environment) {
		return (this.left.evalu(environment) - this.right.evalu(environment));
	}
}

class Divide {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} / ${this.right}>`;
	}

	evalu(environment) {
		console.log("Divide: " + this.toString(), environment);
		return (this.left.evalu(environment) / this.right.evalu(environment));

	}
}


class Boolean {
	constructor(value) {
		this.value = value;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}

	evalu(environment) {
		return this.value;
	}
}

class LessThan {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} < ${this.right}>`;
	}

	evalu(environment) {
		return (this.left.evalu(environment) < this.right.evalu(environment));
	}
}

class GreaterThan {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} > ${this.right}>`;
	}

	evalu(environment) {
		return (this.left.evalu(environment) > this.right.evalu(environment));
	}
}

class Variable {
	constructor(value) {
		this.value = value;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}

	evalu(environment) {
		console.log("Variable: " + this, environment);
		return environment[this.value].evalu(environment);
	}
}

// Statements

//Might need to add == function
class DoNothing {
	constructor() {
		this.value = "Do-nothing";
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}

	evalu(environment) {
		return environment;
	}
}

class Assign {
	constructor(name, expression) {
		this.name = name;
		this.expression = expression;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.name} = ${this.expression}>`;
	}

	evalu(environment) {
		console.log("Assign: " + this, environment);
		let newEnvir = Object.assign({}, environment, {
			[this.name]: this.expression.evalu(environment)
		});
		return newEnvir;
	}
}

class If {
	constructor(condition, consequence, alternative) {
		this.condition = condition;
		this.consequence = consequence;
		this.alternative = alternative;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<If ( ${this.condition} ) { ${this.consequence} } else { ${this.alternative} }>`;
	}

	evalu(environment) {
		if (this.condition.evalu(environment)) {
			return this.consequence.evalu(environment);
		} else {
			return this.alternative.evalu(environment);
		}
	}
}

class Sequence {
	constructor(first, second) {
		this.first = first;
		this.second = second;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.first}; ${this.second};>`;
	}

	evalu(environment) {
		console.log(this.first.evalu(environment));
		this.second.evalu(this.first.evalu(environment))
	}
}

class While {
	constructor(condition, body) {
		this.condition = condition;
		this.body = body;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<While ( ${this.condition} ) { ${this.body} }>`;
	}

	evalu(environment) {
		if (this.condition.evalu(environment)) {
			this.evalu(this.body.evalu(environment))
		} else {
			return environment;
		}
	}
}


module.exports = {
	Number,
	Add,
	Multiply,
	Subtract,
	Divide,
	Boolean,
	LessThan,
	GreaterThan,
	Variable,
	DoNothing,
	Assign,
	If,
	Sequence,
	While
}