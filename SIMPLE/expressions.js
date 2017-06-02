// SIMPLE expressions

class Number {
	constructor(value) {
		this.value = value
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
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `<<${this.left} + ${this.right}>>`;
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
		// return `<<${this.left * this.right}>>`;
		return `<<${this.left} * ${this.right}>>`;
	}
}

module.exports = {
	Number,
	Add,
	Multiply
}