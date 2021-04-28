// Question 2: Write a javascript function that takes an array of numbers and a target number. The
// function should find two different numbers in the array that, when added together, give the target
// number. For example: answer([1,2,3], 4)should return [1,3]

function answer(array, target) {
    const visited = new Set();
    for (n of array) {
        if (visited.has(target - n)) {
            return [target - n, n];
        }
        visited.add(n);
    }
    return [];
};

const input = [[1, 2, 3], 4];

console.log(`input: ${input[0], input[1]}`);
console.log('answer: ', answer(input[0], input[1]));