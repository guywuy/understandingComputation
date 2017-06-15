// Syntax including expressions and statments of 'Simple' programming language.

// Expressions

class Number {
	constructor(value) {
		this.value = value
		this.reducible = false;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}
}

class Add {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} + ${this.right}>`;
	}

	reduce(environment) {
		if (this.left.reducible) {
			return new Add(this.left.reduce(environment), this.right)
		} else if (this.right.reducible) {
			return new Add(this.left, this.right.reduce(environment))
		} else {
			return new Number(this.left.value + this.right.value)
		}
	}
}

class Multiply {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} * ${this.right}>`;
	}

	reduce(environment) {
		if (this.left.reducible) {
			return new Multiply(this.left.reduce(environment), this.right)
		} else if (this.right.reducible) {
			return new Multiply(this.left, this.right.reduce(environment))
		} else {
			return new Number(this.left.value * this.right.value)
		}
	}
}

class Subtract {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} - ${this.right}>`;
	}

	reduce(environment) {
		if (this.left.reducible) {
			return new Subtract(this.left.reduce(environment), this.right)
		} else if (this.right.reducible) {
			return new Subtract(this.left, this.right.reduce(environment))
		} else {
			return new Number(this.left.value - this.right.value)
		}
	}
}

class Divide {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} / ${this.right}>`;
	}

	reduce(environment) {
		if (this.left.reducible) {
			return new Divide(this.left.reduce(environment), this.right)
		} else if (this.right.reducible) {
			return new Divide(this.left, this.right.reduce(environment))
		} else {
			return new Number(this.left.value / this.right.value)
		}
	}
}


class Boolean {
	constructor(value) {
		this.value = value;
		this.reducible = false;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}

	getValue() {
		return this.value;
	}
}

class LessThan {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} < ${this.right}>`;
	}

	reduce(environment) {
		if (this.left.reducible) {
			return new LessThan(this.left.reduce(environment), this.right)
		} else if (this.right.reducible) {
			return new LessThan(this.left, this.right.reduce(environment))
		} else {
			return new Boolean(this.left.value < this.right.value)
		}
	}
}

class GreaterThan {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.left} > ${this.right}>`;
	}

	reduce(environment) {
		if (this.left.reducible) {
			return new GreaterThan(this.left.reduce(environment), this.right)
		} else if (this.right.reducible) {
			return new GreaterThan(this.left, this.right.reduce(environment))
		} else {
			return new Boolean(this.left.value > this.right.value)
		}
	}
}

class Variable {
	constructor(value) {
		this.value = value;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}

	reduce(environment) {
		return environment[this.value]
	}
}

// Statements

//Might need to add == function
class DoNothing {
	constructor() {
		this.value = "Do-nothing";
		this.reducible = false;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.value}>`;
	}
}

class Assign {
	constructor(name, expression) {
		this.name = name;
		this.expression = expression;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<${this.name} = ${this.expression}>`;
	}

	reduce(environment) {
		if (this.expression.reducible) {
			return [new Assign(this.name, this.expression.reduce(environment)), environment];
		} else {
			let newEnvir = Object.assign({}, environment, {
				[this.name]: this.expression
			});
			return [new DoNothing(), newEnvir];
		}
	}
}

class If {
	constructor(condition, consequence, alternative) {
		this.condition = condition;
		this.consequence = consequence;
		this.alternative = alternative;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<If ( ${this.condition} ) { ${this.consequence} } else { ${this.alternative} }>`;
	}

	reduce(environment) {
		if (this.condition.reducible) {
			return [new If(this.condition.reduce(environment), this.consequence, this.alternative), environment];
		} else if (this.condition.getValue() == new Boolean(true).getValue()) {
			// console.log("THIS.CONSEQUENCE: " + this.consequence);
			// console.log("THIS.CONSEQUENCE.reduce() " + this.consequence.reduce(environment));
			return [this.consequence, environment]
		} else {
			return [this.alternative, environment]
		}
	}
}

class Sequence {
	constructor(first, second) {
		this.first = first;
		this.second = second;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
			return `<${this.first}; ${this.second};>`;
		}
		// Maybe specify in else return to return reducedEnv only if it's not null/undefined
	reduce(environment) {
		if (this.first instanceof DoNothing) {
			return [this.second, environment];
		} else {
			let [reducedFirst, reducedEnv] = this.first.reduce(environment);
			return [new Sequence(reducedFirst, this.second), reducedEnv];
		}
	}
}

class While {
	constructor(condition, body) {
		this.condition = condition;
		this.body = body;
		this.reducible = true;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<While ( ${this.condition} ) { ${this.body} }>`;
	}

	reduce(environment) {
		return [new If(this.condition, new Sequence(this.body, new While(this.condition, this.body)), new DoNothing()), environment];

	}
}

// Machine

class Machine {
	constructor(statement, environment = {}) {
		this.statement = statement;
		this.environment = environment;
	}

	step() {
		var result = [].concat(this.statement.reduce(this.environment));
		this.statement = result[0];
		this.environment = result[1] || this.environment;
	}

	run() {
		while (this.statement.reducible) {
			console.log('STATEMENT: ' + this.statement + ' ENVIRON: ', this.environment);
			this.step();
		}
		console.log(this.statement)
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
	While,
	Machine
}