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
				console.log("A match: " + el);
				matchedRule = el;
			};
		});
		if (matchedRule != null) {
			return matchedRule;
		} else {
			return Error("No matched rule for " + state + character);
		}
	}
}

var rulees = [
	new FARule(1, 'a', 2), new FARule(1, 'b', 1),
	new FARule(2, 'a', 2), new FARule(2, 'b', 3),
	new FARule(3, 'a', 3), new FARule(3, 'b', 3)
]

var d = new DFARulebook(rulees);

d.getNextState(1, 'a')