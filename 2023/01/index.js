const { getInput } = require("../../utils/index.js");


  let stringNumbers = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

// finds the first and last digit in the string and combines them together and returns that as a number
function getDigitFromString(string) {
    const arr =  string.split("").reduce((result, char) => {
        const parsedChar = parseInt(char)
        const isNumber = typeof parsedChar === 'number';
        if (isNumber && !isNaN(parseInt(char))) {
            result.push(char)
        }
        return result
    }, []);
    if (!arr.length) {
        return '0';
    } else if (arr.length === 1) {
        return arr[0] + arr[0];
    } else {
        return arr[0] + arr[arr.length -1]
    }
}

//get input from input.txt and
const input = getInput(__dirname);

// create an string[] of digits found in each line
const digitsOne = input.map((string) => {
    return getDigitFromString(string);
});

const answerOne = digitsOne.reduce((result, digit) => {
    return result += parseInt(digit);
}, 0);



const answerTwo = () => {
    let sum = 0;
    let stringNumArray = Object.keys(stringNumbers);

    for (let line of input) {
        let numbers = [];

        for (let stringNum of stringNumArray) {
            let matches = [...line.matchAll(stringNum)];
            matches.forEach((match) => {
                numbers.push(({ value: Number(stringNumbers[stringNum]), index: match.index }))
            });
        };

        for (let i = 0; i < line.length; i++) {
            if (!isNaN(Number(line[i]))) {
                numbers.push({ value: Number(line[i]), index: i });
            }
        }

        numbers.sort((a, b) =>  a.index - b.index);
        let join
        join = Number(String(numbers[0].value + String(numbers[numbers.length - 1].value)));

        sum += join;
    }
    return sum;
}


console.log(`Answer 1: ${answerOne}`, `Answer 2: ${answerTwo()}`);



