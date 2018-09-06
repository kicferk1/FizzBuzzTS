var Rule = /** @class */ (function () {
    function Rule(newCond, newOp) {
        this.condition = newCond;
        this.operation = newOp;
    }
    Rule.prototype.applyRule = function (data, value) {
        var data2 = JSON.parse(JSON.stringify(data));
        if (this.condition(value)) {
            data2 = this.operation(data, value);
        }
        return data2;
    };
    Rule.prototype.followedBy = function (rule) {
        var _this = this;
        return new Rule(function (i) { return true; }, function (current, i) {
            return rule.applyRule(_this.applyRule(current, i), i);
        });
    };
    return Rule;
}());
var FizzRule = new Rule(function (i) { return i % 3 == 0; }, function (current, i) {
    current.push("Fizz");
    return current;
});
var BuzzRule = new Rule(function (i) { return i % 5 == 0; }, function (current, i) {
    current.push("Buzz");
    return current;
});
var BangRule = new Rule(function (i) { return i % 7 == 0; }, function (current, i) {
    current.push("Bang");
    return current;
});
var BongRule = new Rule(function (i) { return i % 11 == 0; }, function (current, i) {
    return ["Bong"];
});
var FezzRule = new Rule(function (i) { return i % 13 == 0; }, function (current, j) {
    for (var i = 0; i < current.length; i++) {
        if (current[i][0] == 'B') {
            current.splice(i, 0, "Fezz");
            return current;
        }
    }
    current.push("Fezz");
    return current;
});
var ReverseRule = new Rule(function (i) { return i % 17 == 0; }, function (current, i) {
    current.reverse();
    return current;
});
var EmptyRule = new Rule(function (i) { return true; }, function (current, i) {
    if (current.length == 0) {
        return [i.toString()];
    }
    return current;
});
var Part1Rule = FizzRule.followedBy(BuzzRule).followedBy(EmptyRule);
var Part2Rule = FizzRule.followedBy(BuzzRule).followedBy(BangRule).followedBy(BongRule).followedBy(FezzRule).followedBy(ReverseRule).followedBy(EmptyRule);
function printValue(i) {
    console.log(Part2Rule.applyRule([], i).reduce(function (previous, current, currentIndex, array) {
        return previous + current;
    }));
}
var stdin = process.openStdin();
console.log('type value to evaluate');
stdin.addListener("data", function (d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    printValue(Number(d.toString().trim()));
    console.log('type value to evaluate');
});
