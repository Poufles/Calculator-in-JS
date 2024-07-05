function MDAS(oper1, oper2) {
    return (oper1 == '*' || oper1 == '/') && (oper2 == '+' || oper2 == '-');
};

function solve(num1, oper, num2) {
    let result = 0;
    switch (oper) {
        case '+': result = num1 + num2
        break;
        case '-': result = num1 - num2
        break;
        case '*': result = num1 * num2
        break;
        case '/': result = num1 / num2
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
            next = arr[3];
            if (!MDAS(oper, next)) {
                num1 = num2;
                oper = next;
                num2 = arr[4];
                index = 2;
            }
        }

        arr.splice(index, 3);
        arr.splice(index, 0, solve(num1, oper, num2));
    };

    return arr;
};

function verifyBeforeCalculate(arr) {
    return arr.length % 2 == 0 ? undefined : calculate(arr);
}

console.log(verifyBeforeCalculate([63, '-', 29, '/', 13]));