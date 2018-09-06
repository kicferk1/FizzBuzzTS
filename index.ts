import * as FizzBuzz from './FizzBuzz';

processRequests();

async function processRequests():Promise<any>{
    while(true){
        await processRequest();
    }
}

const allRules = [
    FizzBuzz.BangRule, 
    FizzBuzz.BongRule, 
    FizzBuzz.BuzzRule,
    FizzBuzz.EmptyRule,
    FizzBuzz.FezzRule,
    FizzBuzz.FizzRule,
    FizzBuzz.ReverseRule
];

async function getValue():Promise<number>{
    var stdin = process.openStdin();
    console.log('type value to evaluate')
    var getValue = new Promise<number>((resolve, reject)=> {
        stdin.addListener("data", function(d) {
            stdin.removeAllListeners();
            resolve(Number(d.toString().trim()));
        });
    });
    return getValue;
}

async function continueAddingRules(rules:FizzBuzz.Rule[]):Promise<boolean>{
    var stdin = process.openStdin();
    console.log('Current rules: ');
    console.log(rules.map(rule => rule.description));
    console.log('Do you want to add any rules(y/n)?');
    var getValue2 = new Promise<string>((resolve, reject)=> {
        stdin.addListener("data", function(d) {
            stdin.removeAllListeners();
            resolve(d.toString().trim());
        });
    });
    let addingRulesAnswer = await getValue2;
    return addingRulesAnswer=="y";
}

async function addRule(rules: FizzBuzz.Rule[]): Promise<FizzBuzz.Rule[]>{
    var stdin = process.openStdin();

    console.log("Type keyword for one of available rules: Fizz, Fezz, Bang, Bong, Buzz, Empty, Reverse")
    var getValue3 = new Promise<string>((resolve, reject)=> {
        stdin.addListener("data", function(d) {
            stdin.removeAllListeners();
            resolve(d.toString().trim());
        });
    });
    let ruleType = await getValue3;
    switch(ruleType) {
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
        default:
    }
    return rules;
}

async function processRequest():Promise<any>{
    let value = await getValue();
    let rules: FizzBuzz.Rule[] = [];

    let addingRules = true;
    while(addingRules){
        addingRules = await continueAddingRules(rules);
        if(addingRules){ rules = await addRule(rules); }
    }

    let finalrule = rules.reduce(
        (prevRule, currentRule, i, a) => prevRule.followedBy(currentRule), 
        new FizzBuzz.Rule((i) => false, (s,i) => s));

    console.log(finalrule.applyRule([], value).reduce((p,c,i,a) => p+c), '');
}

