"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FizzBuzz = require("./FizzBuzz");
processRequests();
async function processRequests() {
    while (true) {
        await processRequest();
    }
}
async function getValue() {
    var stdin = process.openStdin();
    console.log('type value to evaluate');
    var getValue = new Promise((resolve, reject) => {
        stdin.addListener("data", function (d) {
            stdin.removeAllListeners();
            resolve(Number(d.toString().trim()));
        });
    });
    return getValue;
}
async function continueAddingRules(rules) {
    var stdin = process.openStdin();
    console.log('Current rules: ');
    console.log(rules.map(rule => rule.description));
    console.log('Do you want to add any rules(y/n)?');
    var getValue2 = new Promise((resolve, reject) => {
        stdin.addListener("data", function (d) {
            stdin.removeAllListeners();
            resolve(d.toString().trim());
        });
    });
    let addingRulesAnswer = await getValue2;
    return addingRulesAnswer == "y";
}
async function addRule(rules) {
    var stdin = process.openStdin();
    console.log("Type keyword for one of available rules: Fizz, Fezz, Bang, Bong, Buzz, Empty, Reverse, Part2");
    var getValue3 = new Promise((resolve, reject) => {
        stdin.addListener("data", function (d) {
            stdin.removeAllListeners();
            resolve(d.toString().trim());
        });
    });
    let ruleType = await getValue3;
    switch (ruleType) {
        case "Fizz":
            rules.push(FizzBuzz.FizzRule);
            break;
        case "Fezz":
            rules.push(FizzBuzz.FezzRule);
            break;
        case "Bang":
            rules.push(FizzBuzz.BangRule);
            break;
        case "Bong":
            rules.push(FizzBuzz.BongRule);
            break;
        case "Buzz":
            rules.push(FizzBuzz.BuzzRule);
            break;
        case "Bang":
            rules.push(FizzBuzz.BangRule);
            break;
        case "Empty":
            rules.push(FizzBuzz.EmptyRule);
            break;
        case "Reverse":
            rules.push(FizzBuzz.ReverseRule);
            break;
        case "Part2":
            rules.push(FizzBuzz.Part2Rule);
            break;
        default:
    }
    return rules;
}
async function processRequest() {
    let value = await getValue();
    let rules = [];
    let addingRules = true;
    while (addingRules) {
        addingRules = await continueAddingRules(rules);
        if (addingRules) {
            rules = await addRule(rules);
        }
    }
    let finalrule = rules.reduce((prevRule, currentRule, i, a) => prevRule.followedBy(currentRule), new FizzBuzz.Rule((i) => false, (s, i) => s));
    let finalWords = finalrule.applyRule([], value);
    if (finalWords.length != 0) {
        console.log(finalWords.reduce((p, c, i, a) => p + c), '');
    }
}
