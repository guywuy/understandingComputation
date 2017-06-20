//Todo
// Possibly change from array to set
// http://devdocs.io/javascript/global_objects/set

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
		return `FARule : ${this.state},  '${this.character}' ---> ${this.nextState}`;
	}
}

class NFA {
	constructor(possibleStates, acceptStates, rulebook) {
		this.possibleStates = possibleStates;
		this.acceptStates = acceptStates;
		this.rulebook = rulebook;
	}

	acceptable() {
		let acceptableBool = false;
		this.acceptStates.forEach(state => {
			if (this.possibleStates.includes(state)) {
				acceptableBool = true;
			}
		});
		return acceptableBool;
	}

	readCharacter(char) {
		this.possibleStates = this.rulebook.getNextStates(this.possibleStates, char);
		console.log(`Current Possible States = ${this.possibleStates}`);
	}

	readString(str) {
		console.log([...str]);
		[...str].forEach(char => {
			this.readCharacter(char);
		});
	}
}

class NFARulebook {
	constructor(rules) {
		this.rules = rules;
	}

	getNextStates(states, character) {
		let nextStates = [];
		states.forEach(state => {
			let matchedRules = this.rulesFor(state, character);
			if (matchedRules.length > 0) {
				matchedRules.forEach(rule => {
					// console.log("rule.follow for each matched rule = " + rule.follow());
					nextStates.push(rule.follow());
				});
			}
		});
		return nextStates;
	}

	//Outputs array of rules which are matched
	rulesFor(state, character) {
		let matchedRules = [];
		this.rules.forEach(rule => {
			if (rule.appliesTo(state, character)) {
				// console.log("A match: " + rule.inspect());
				matchedRules.push(rule);
			};
		});
		return matchedRules;
	}
}

class NFADesign {
	constructor(currentStates, acceptedStates, rulebook) {
		this.currentStates = currentStates;
		this.acceptedStates = acceptedStates;
		this.rulebook = rulebook;
	}

	toNFA() {
		return new NFA(this.currentStates, this.acceptedStates, this.rulebook);
	}

	accepts(str) {
		let nfa = this.toNFA();
		nfa.readString(str);
		return nfa.acceptable();
	}
}



var rulees = [
	new FARule(1, 'a', 1), new FARule(1, 'b', 1), new FARule(1, 'b', 2),
	new FARule(2, 'a', 3), new FARule(2, 'b', 3),
	new FARule(3, 'a', 4), new FARule(3, 'b', 4)
];
var book = new NFARulebook(rulees);

var n = new NFADesign([1], [4], book);