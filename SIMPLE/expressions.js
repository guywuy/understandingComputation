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

	reduce() {
		if (this.left.reducible) {
			return new Add(this.left.reduce(), this.right)
		} else if (this.right.reducible) {
			return new Add(this.left, this.right.reduce())
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
		// return `<<${this.left * this.right}>>`;
		return `<<${this.left} * ${this.right}>>`;
	}

	reduce() {
		if (this.left.reducible) {
			return new Multiply(this.left.reduce(), this.right)
		} else if (this.right.reducible) {
			return new Multiply(this.left, this.right.reduce())
		} else {
			return new Number(this.left.value * this.right.value)
		}
	}
}

class Machine {
	constructor(expression) {
		this.expression = expression;
	}

	step() {
		this.expression = this.expression.reduce()
	}

	run() {
		while (this.expression.reducible) {
			console.log(this.expression);
			this.step();
		}
		console.log(expression)
	}
}

module.exports = {
	Number,
	Add,
	Multiply,
	Machine
}