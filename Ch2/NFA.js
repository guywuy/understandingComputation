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
		// this.acceptStates.forEach(state => {
		// 	if (this.possibleStates.includes(state)) return true;
		// });
		this.possibleStates.some(s => {
			return this.acceptStates.indexOf(s) >= 0;
		});
		return false;
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
			matchedRules.forEach(rule => {
				console.log("rule.follow for each matched rule = " + rule.follow());
				nextStates.push(rule.follow());
			});
		});
		console.log('nextStates - ' + nextStates);
		return nextStates;
	}

	//Outputs array of rules which are matched
	rulesFor(state, character) {
		let matchedRules = [];
		this.rules.forEach(rule => {
			if (rule.appliesTo(state, character)) {
				console.log("A match: " + rule.inspect());
				matchedRules.push(rule);
			};
		});
		if (matchedRules.length > 0) {
			console.log("Matched Rules = " + matchedRules);
			return matchedRules;
		} else {
			throw Error("No matched rule for " + state + character);
		}
	}
}



var rulees = [
	new FARule(1, 'a', 1), new FARule(1, 'b', 1), new FARule(1, 'b', 2),
	new FARule(2, 'a', 3), new FARule(2, 'b', 3),
	new FARule(3, 'a', 4), new FARule(3, 'b', 4)
];
var book = new NFARulebook(rulees);

var n = new NFA([1], [4], book);

n.readCharacter('a')



// class DFADesign {
// 	constructor(currentState, acceptedStates, rulebook) {
// 		this.currentState = currentState;
// 		this.acceptedStates = acceptedStates;
// 		this.rulebook = rulebook;
// 	}

// 	toDFA() {
// 		return new DFAMachine(this.currentState, this.acceptedStates, this.rulebook);
// 	}

// 	accepts(str) {
// 		let dfa = this.toDFA();
// 		dfa.readString(str);
// 		return dfa.acceptCurrentState();
// 	}
// }



// // Implementing above classes
// var rulees = [
// 	new FARule(1, 'a', 2), new FARule(1, 'b', 1),
// 	new FARule(2, 'a', 2), new FARule(2, 'b', 3),
// 	new FARule(3, 'a', 3), new FARule(3, 'b', 3)
// ]

// var rb = new DFARulebook(rulees);
// var d = new DFADesign(1, [3], rb);
// var dfa = d.toDFA()
// d.acceptCurrentState();
// // d.readCharacter('b');
// d.readString('aaaabab')