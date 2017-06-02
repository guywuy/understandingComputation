// SIMPLE expressions

class Number {
	constructor(value) {
		this.value = value
		this.reducible = false;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<<${this.value}>>`;
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
		return `<<${this.left} + ${this.right}>>`;
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
		return `<<${this.left} * ${this.right}>>`;
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
		return `<<${this.left} - ${this.right}>>`;
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
		return `<<${this.left} / ${this.right}>>`;
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
		return `<<${this.value}>>`;
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
		return `<<${this.left} < ${this.right}>>`;
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
		return `<<${this.left} > ${this.right}>>`;
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
		return `<<${this.value}>>`;
	}

	reduce(environment) {
		return environment[this.value]
	}
}

class Machine {
	constructor(expression, environment) {
		this.expression = expression;
		this.environment = environment;
	}

	step() {
		this.expression = this.expression.reduce(this.environment)
	}

	run() {
		while (this.expression.reducible) {
			console.log(this.expression);
			this.step();
		}
		console.log(this.expression)
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
	Machine
}