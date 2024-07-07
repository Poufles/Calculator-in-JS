function MDAS(oper1, oper2) {
    if ((oper1 == 'x' || oper1 == '/') && (oper2 == '*' || oper2 == '/')) {
        return true;
    } else if ((oper1 == 'x' || oper1 == '/') && (oper2 == '+' || oper2 == '-')) {
        return true;
    } else {
        return false;
    }
};

function solve(num1, oper, num2) {
    let result = 0;
    switch (oper) {
        case '+': result = num1 + num2
        break;
        case '-': result = num1 - num2
        break;
        case 'x': result = num1 * num2
        break;
        case '/': result = num1 / num2;
        break;
    }

    return Math.round(result * 100) / 100;
};

function calculate(arr) {
    let num1;
    let oper;
    let num2;
    let next;
    let index;

    // Validate number of elements in array
    // As Array.length == 1 signifies answer
    while (arr.length !== 1) {
        // Initialize numbers and operators
        num1 = arr[0];
        oper = arr[1];
        num2 = arr[2];
        // Index for splicing array
        index = 0;
        // Validate if array length is more than 3
        // Since (PE)MDAS will be used for complex operations
        if (arr.length !== 3) {
            // Loop to point to next numbers
            // And operators
            for (i = 0; i <= arr.length - 4; i += 2) {
                // Pointer for the next operator
                next = arr[i + 3];
                // Validate with (PE)MDAS
                if (!MDAS(oper, next)) {
                    // Change values
                    num1 = num2;
                    oper = next;
                    num2 = arr[i + 4];
                    index = i + 2;
                } else {
                    // Break if current operator
                    // And next operator are M/D
                    // Or next operator is A/S
                    break;
                }
            }
        }

        console.log(arr);
        // Remove num1, oper, and num2 values
        arr.splice(index, 3);
        // Then change it to their answer
        arr.splice(index, 0, solve(num1, oper, num2));
    };

    // Return answer
    return arr.toString();
};

function verifyBeforeCalculate(arr) {
    return typeof(arr[arr.length - 1]) === 'string' ? '???' : calculate(arr);
}

console.log(verifyBeforeCalculate([98, '/', 6, '+', 0.32, '-', 9, '+', 0.98]));