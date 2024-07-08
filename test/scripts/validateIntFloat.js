function validateFloat(value) {
    return /^[-]?\d+.\d+$/g.test(value);
};

function validateInt(value) {
    return /^[-]?\d+$/g.test(value);
};

console.log(validateInt('-37'));
console.log(validateFloat('-33.22'))