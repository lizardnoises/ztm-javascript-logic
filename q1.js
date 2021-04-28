// Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered. For example
// answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591].
// Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should
// return [[1,2], ["2", "3"]]

function answer(array) {
    return Array.from(array).sort((a, b) => a - b).reduce((acc, value, i, array) => {
        const j = acc.length - 1;
        if (i > 0 && value === array[i - 1]) {
            if (Array.isArray(acc[j])) {
                acc[j].push(value);
            } else {
                acc[j] = [value, value];
            }
        } else {
            acc.push(value);
        }
        return acc;
    }, []);
}

const input = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20];

console.log('input: ', input);
console.log('answer: ', answer(input));

function answerBonus(array) {
    const sub1 = answer(array.filter(a => typeof a === 'number'));
    const sub2 = answer(array.filter(a => typeof a === 'string'));
    return [sub1, sub2];
}

const bonusInput = [1, "2", "3", 2];

console.log('input: ', bonusInput);
console.log('answer: ', answerBonus(bonusInput));