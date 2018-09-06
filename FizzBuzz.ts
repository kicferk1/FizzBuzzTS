export type Condition = (n:number) => boolean;
export type Operation = (currentBuzzwords:string[], i:number) => string[];

export class Rule{
    condition: Condition;
    operation: Operation;
    description:string;
    constructor(newCond: Condition, newOp: Operation, description: string =""){
        this.condition = newCond;
        this.operation = newOp;
        this.description = description;
    }


    applyRule(data: string[], value: number): string[]{
        let data2 = JSON.parse(JSON.stringify(data));
        if(this.condition(value)){
            data2 = this.operation(data, value)
        }
        return data2;
    }

    followedBy(rule: Rule):Rule{
        return new Rule((i) => true, (current:string[], i:number) =>{ 
            return rule.applyRule( this.applyRule(current, i), i); 
        }, this.description + ", then " + rule.description)
    }
}

export let FizzRule = new Rule((i:number) => i%3 == 0, (current:string[], i:number) => {
    current.push("Fizz")
    return current; 
}, "FizzRule")

export let BuzzRule = new Rule((i:number) => i%5 == 0, (current:string[], i:number) => {
    current.push("Buzz")
    return current;
}, "BuzzRule")

export let BangRule = new Rule((i:number) => i%7 == 0, (current:string[], i:number) => {
    current.push("Bang")
    return current;
}, "BangRule")

export let BongRule = new Rule((i:number) => i%11 == 0, (current:string[], i:number) => {
    return ["Bong"]; 
}, "BongRule")

export let FezzRule = new Rule((i:number) => i%13 == 0, (current:string[], j:number) => {
    for(let i=0; i<current.length; i++){
        if(current[i][0]=='B'){
            current.splice(i, 0, "Fezz")
            return current;
        }
    }
    current.push("Fezz")
    return current;
}, "FezzRule")

export let ReverseRule = new Rule((i:number) => i%17 == 0, (current:string[], i:number) => {
    current.reverse();
    return current; 
}, "ReverseRule")

export let EmptyRule = new Rule((i:number) => true, (current:string[], i:number) => {
    if (current.length==0){
        return [i.toString()];
    }
    return current;
}, "NonEmptyRule")


export let Part1Rule = FizzRule.followedBy(BuzzRule).followedBy(EmptyRule);
export let Part2Rule = FizzRule.followedBy(BuzzRule).followedBy(BangRule).followedBy(BongRule).followedBy(FezzRule).followedBy(ReverseRule).followedBy(EmptyRule);

export function printValue(i:number){
    console.log(Part2Rule.applyRule([], i).reduce((previous, current, currentIndex, array) => {
        return previous + current;
    }))
}


