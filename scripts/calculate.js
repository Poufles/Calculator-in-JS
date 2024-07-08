function MDAS(oper1, oper2) {
    // Validate if MD
    if ((oper1 == 'x' || oper1 == '/') && (oper2 == 'x' || oper2 == '/') || (oper1 == 'x' || oper1 == '/') && (oper2 == '+' || oper2 == '-')) {
        return 'MD';
    }

    // Validate if AD
    if ((oper1 == '+' || oper1 == '-') && (oper2 == '+' || oper2 == '-')) {
        return 'AD';
    // Validate if switch
    } else {
        return 'next';
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

    return result;
};

function calculate(arr) {
    let num1;
    let oper;
    let num2;
    let next;
    let index;

    console.log(arr);
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
                console.log(`${num1} | ${oper} | ${num2} | ${next}`);
                // Validate with (PE)MDAS
                if (MDAS(oper, next) === 'MD') {
                    break;
                } else if (MDAS(oper,next) === 'AD') {
                    continue;
                } else {
                    // Change values
                    num1 = arr[i + 2];
                    oper = next;
                    num2 = arr[i + 4];
                    index = i + 2;
                }
            }
        }

        console.log(`Final: ${num1} | ${oper} | ${num2} | ${next}`);
        // Remove num1, oper, and num2 values
        arr.splice(index, 3);
        // Then change it to their answer
        arr.splice(index, 0, solve(num1, oper, num2));
        // console.log(arr); // re-enable for debug
        // When answer is infinity
        if (arr[index].toString() == Infinity || isNaN(arr[index])) {
            return 'Yes';
        };
    };


    // Return answer
    return (Math.round(arr * 100) / 100).toString();
};

function verifyBeforeCalculate(arr) {
    return typeof (arr[arr.length - 1]) === 'string' ? '???' : calculate(arr);
}

// console.log(verifyBeforeCalculate([0, '/', 0]));
