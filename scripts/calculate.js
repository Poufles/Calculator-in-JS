function MDAS(oper1, oper2) {
    return (oper1 == '*' || oper1 == '/' || oper2 != undefined) && (oper2 == '+' || oper2 == '-' || oper2 == undefined);
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
        case '/': result = Math.round((num1 / num2) * 100) / 100;
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

    while (arr.length !== 1) {
        num1 = arr[0];
        oper = arr[1];
        num2 = arr[2];
        index = 0;
        if (arr.length !== 3) {
            for (i = 0; i < arr.length; i += 2) {
                next = arr[i + 3];
                console.log(oper);
                console.log(next);
                if (!MDAS(oper, next)) {
                    num1 = num2;
                    oper = next;
                    num2 = arr[i + 4];
                    index = 2;
                }
            }
        }

        console.log(num1);
        console.log(oper);
        console.log(num2);

        console.log(arr);
        arr.splice(index, 3);
        arr.splice(index, 0, solve(num1, oper, num2));
    };

    return arr.toString();
};

function verifyBeforeCalculate(arr) {
    return typeof(arr[arr.length - 1]) === 'string' ? '???' : calculate(arr);
}

console.log(verifyBeforeCalculate([9, '+', 6, 'x', 7, '+', 38, '/', 6]));