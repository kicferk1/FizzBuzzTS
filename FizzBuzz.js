"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor(newCond, newOp, description = "") {
        this.condition = newCond;
        this.operation = newOp;
        this.description = description;
    }
    applyRule(data, value) {
        let data2 = JSON.parse(JSON.stringify(data));
        if (this.condition(value)) {
            data2 = this.operation(data, value);
        }
        return data2;
    }
    followedBy(rule) {
        return new Rule((i) => true, (current, i) => {
            return rule.applyRule(this.applyRule(current, i), i);
        }, this.description + ", then " + rule.description);
    }
}
exports.Rule = Rule;
exports.FizzRule = new Rule((i) => i % 3 == 0, (current, i) => {
    current.push("Fizz");
    return current;
}, "FizzRule");
exports.BuzzRule = new Rule((i) => i % 5 == 0, (current, i) => {
    current.push("Buzz");
    return current;
}, "BuzzRule");
exports.BangRule = new Rule((i) => i % 7 == 0, (current, i) => {
    current.push("Bang");
    return current;
}, "BangRule");
exports.BongRule = new Rule((i) => i % 11 == 0, (current, i) => {
    return ["Bong"];
}, "BongRule");
exports.FezzRule = new Rule((i) => i % 13 == 0, (current, j) => {
    for (let i = 0; i < current.length; i++) {
        if (current[i][0] == 'B') {
            current.splice(i, 0, "Fezz");
            return current;
        }
    }
    current.push("Fezz");
    return current;
}, "FezzRule");
exports.ReverseRule = new Rule((i) => i % 17 == 0, (current, i) => {
    current.reverse();
    return current;
}, "ReverseRule");
exports.EmptyRule = new Rule((i) => true, (current, i) => {
    if (current.length == 0) {
        return [i.toString()];
    }
    return current;
}, "NonEmptyRule");
exports.Part1Rule = exports.FizzRule.followedBy(exports.BuzzRule).followedBy(exports.EmptyRule);
exports.Part2Rule = exports.FizzRule.followedBy(exports.BuzzRule).followedBy(exports.BangRule).followedBy(exports.BongRule).followedBy(exports.FezzRule).followedBy(exports.ReverseRule).followedBy(exports.EmptyRule);
function printValue(i) {
    console.log(exports.Part2Rule.applyRule([], i).reduce((previous, current, currentIndex, array) => {
        return previous + current;
    }));
}
exports.printValue = printValue;
