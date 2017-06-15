class FARule {
	constructor(state, character, nextState) {
		this.state = state;
		this.character = character;
		this.nextState = nextState;
	}

	// Return true if the given state and character are equal to this rule's state and character
	appliesTo(state, character) {
		return (this.state == state && this.character == character);
	}

	follow() {
		return this.nextState;
	}

	inspect() {
		return `FARule : ${this.state},  '${this.character}' -----> ${this.nextState}`;
	}
}

class DFARulebook {
	constructor(rules) {
		this.rules = rules;
	}

	getNextState(state, character) {
		let rule = this.ruleFor(state, character);
		// console.log("Rule = " + rule);
		return rule.follow();
	}

	ruleFor(state, character) {
		let matchedRule = null;
		this.rules.forEach(el => {
			if (el.appliesTo(state, character)) {
				console.log("A match: " + el.inspect());
				matchedRule = el;
			};
		});
		if (matchedRule != null) {
			return matchedRule;
		} else {
			throw Error("No matched rule for " + state + character);
		}
	}
}

class DFAMachine {
	constructor(currentState, acceptedStates, rulebook) {
		this.currentState = currentState;
		this.acceptedStates = acceptedStates;
		this.rulebook = rulebook;
	}

	acceptCurrentState() {
		return this.acceptedStates.includes(this.currentState);
	}

	readCharacter(char) {
		this.currentState = this.rulebook.getNextState(this.currentState, char);
		console.log(`Current State = ${this.currentState}`);
	}

	readString(str) {
		console.log([...str]);
		[...str].forEach(char => {
			this.readCharacter(char)
		});
	}
}

class DFADesign {
	constructor(currentState, acceptedStates, rulebook) {
		this.currentState = currentState;
		this.acceptedStates = acceptedStates;
		this.rulebook = rulebook;
	}

	toDFA() {
		return new DFAMachine(this.currentState, this.acceptedStates, this.rulebook);
	}

	accepts(str) {
		let dfa = this.toDFA();
		dfa.readString(str);
		return dfa.acceptCurrentState();
	}
}



// Implementing above classes
var rulees = [
	new FARule(1, 'a', 2), new FARule(1, 'b', 1),
	new FARule(2, 'a', 2), new FARule(2, 'b', 3),
	new FARule(3, 'a', 3), new FARule(3, 'b', 3)
]

var rb = new DFARulebook(rulees);
var d = new DFADesign(1, [3], rb);
var dfa = d.toDFA()
d.acceptCurrentState();
// d.readCharacter('b');
d.readString('aaaabab')