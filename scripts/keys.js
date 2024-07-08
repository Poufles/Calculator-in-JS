// Validate if num is already decimal
function isDecimal(value) {
  return value.includes(".");
}

// Validate float
function validateFloat(value) {
  return /^[-]?\d+.\d+$/g.test(value);
};

// Validate int
function validateInt(value) {
  return /^[-]?\d+$/g.test(value);
};

// Create Answer container
function createAnswerContainer() {
  let tempArr = []
  const answer_container = document.createElement('div');
  const left_part = document.createElement('p');
  const right_part = document.createElement('p');
  answer_container.classList.add('answer-container');
  left_part.classList.add('equal-sign');
  left_part.textContent = '='
  right_part.classList.add('answer');
  answer_container.appendChild(left_part);
  answer_container.appendChild(right_part);
  bottom_screen.appendChild(answer_container);
  op_container.classList.remove('active');

  for (value of input_arr) {
    tempArr.push(value);
  }

  right_part.textContent = verifyBeforeCalculate(tempArr);
};

// Remove Answer container
function removeAnswerContainer() {
  bottom_screen.removeChild(bottom_screen.querySelector('.answer-container'));
  op_container.classList.add('active');
};

// Validate for Possible History Container Creation
function validateHistoryCreation() {
  if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
    createHistoryContainer();
    input_arr = [];
    op_container.classList.add('active');
    removeAnswerContainer();
  }
};

// Create History Container
function createHistoryContainer() {
  if (!upper_screen.contains(upper_screen.querySelector('.history-container'))) {
    // Create elements / component
    const history_container = document.createElement('button');
    const history_operation_container = document.createElement('div');
    const history_answer_container = document.createElement('div');
    const left_part = document.createElement('p');
    const right_part = document.createElement('p');
    // Add proper class
    history_container.classList.add('history-container');
    history_operation_container.classList.add('operation-container');
    history_answer_container.classList.add('answer-container');
    left_part.classList.add('equal-sign');
    right_part.classList.add('answer');
    // Append children
    history_answer_container.appendChild(left_part);
    history_answer_container.appendChild(right_part);
    history_container.appendChild(history_operation_container);
    history_container.appendChild(history_answer_container);
    upper_screen.appendChild(history_container)
    screen.classList.toggle('history-active');
    screen.classList.toggle('screen-initial');

    // Add history values
    history_operation_container.textContent = op_container.textContent;
    left_part.textContent = '=';
    right_part.textContent = bottom_screen.querySelector('.answer-container').querySelector('.answer').textContent;

    // Add functionality to history container
    history_container.addEventListener('mousedown', () => {
      // Verify if answer container exists for reinitialization
      if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
        // Remove answer container
        bottom_screen.removeChild(bottom_screen.querySelector('.answer-container'));
        // Reinitialize visual text
        op_container.classList.toggle('active');
      };
      // Retrieve visual text history
      op_container.textContent = history_operation_container.textContent;
      // Retrieve history operation
      input_arr = history_operation_container.textContent.split(' ');
      for (i = 0; i < input_arr.length; i++) {
        let value = input_arr[i];
        if (value == '+' || value == '-' || value == 'x' || value == '/') {
          ;
        } else if (validateFloat(value)) {
          value = parseFloat(value);
        } else {
          value = validateInt(value);
        }

        input_arr[i] = value;
      }
      // Retrieve last number value
      user_input = pre_history_user_input;
      // Reinitialize back-end array
      input_arr = [];
      // Remove history container
      upper_screen.removeChild(history_container);
      // Reinitialize screen
      screen.classList.toggle('screen-initial');
      screen.classList.toggle('history-active');
      console.log('History | user_input: ' + user_input);
      console.log('History | input_arr: ' + input_arr);
    });
  } else {
    // Retrieve upper screen containers
    const history_operation_container = upper_screen.querySelector('.operation-container');
    const answer = upper_screen.querySelector('.answer');

    history_operation_container.textContent = op_container.textContent;
    answer.textContent = bottom_screen.querySelector('.answer-container').querySelector('.answer').textContent;
  }

  // Reinitialize visual text
  op_container.textContent = "";

  console.log('History | user_input: ' + user_input);
  console.log('History | input_arr: ' + input_arr);
};

// Changing font when text exceeds
function dynamicFont() {
  if (
    op_container.getBoundingClientRect().width >=
    calculator_screen.getBoundingClientRect().width * 0.95
  ) {
    if (verify_font_size === 0) {
      op_container.classList.toggle("mid-font");
      verify_font_size = 1;
    } else if (verify_font_size === 1) {
      op_container.classList.toggle("mid-font");
      op_container.classList.toggle("small-font");
      verify_font_size = 2;
    }
  }
}

// Numpad (0-9) functions
numpads.forEach((numpad) => {
  numpad.addEventListener("mousedown", () => {
    let visualTextLength = op_container.textContent.length;
    // Verify visual text
    // This is meant to add a second number
    // To a missing operation
    // Format: (num oper ) || (320 / )
    if (bottom_screen.contains(bottom_screen.querySelector('.answer-container')) && op_container.textContent[visualTextLength - 1] === ' ') {
      // Update visual text
      op_container.textContent = op_container.textContent.slice(0) + numpad.textContent;
      removeAnswerContainer();
      // Reinitialize font size
      return;
    };

    // Verify if next visual text input
    // Is a new one then creates history
    validateHistoryCreation();

    // Visual text
    op_container.textContent += numpad.textContent;
    // Back-end value
    user_input += user_input === "" ? numpad.textContent : numpad.textContent;

    console.log('Numpad | user_input: ' + user_input);
    // Verify if visual text overflows
    dynamicFont();
  });
});

// Dot Key Value
key_dot.addEventListener("mousedown", () => {
  // Verify if next visual text input
  // Is a new one then creates history
  validateHistoryCreation();

  // Check if back-end value is already a decimal(float) or not
  if (!isDecimal(user_input)) {
    if (user_input === "") {
      // If visual value is the next number
      op_container.textContent += `0${key_dot.textContent}`;
    } else {
      // If visual value is already a number
      op_container.textContent += key_dot.textContent;
    }

    // Back-end value
    user_input += user_input === "" ? `0${key_dot.textContent}` : key_dot.textContent;
    console.log('Dot | user_input: ' + user_input);
    // Verify if visual text overflows
    dynamicFont();
  }
});

// Operator Keys Value
operators.forEach((operator) => {
  operator.addEventListener("mousedown", () => {
    let visualTextLength = op_container.textContent.length; // Length of visual text

    // Validate user error
    // Check if output is '???'
    if (bottom_screen.contains(bottom_screen.querySelector('.answer-container')) && bottom_screen.querySelector('.answer-container').querySelector('.answer').textContent === '???') {
      validateHistoryCreation();
      op_container.textContent = `0 ${operator.textContent} `;
      return;
    };

    // Validate next visual value
    // If answer is available
    // And user wants to continue operation
    if (bottom_screen.contains(bottom_screen.querySelector('.answer-container')) && bottom_screen.querySelector('.answer-container').contains(bottom_screen.querySelector('.answer-container').querySelector('.answer'))) {
      let temp = '';

      temp = `${bottom_screen.querySelector('.answer-container').querySelector('.answer').textContent} ${operator.textContent} `;
      validateHistoryCreation();
      op_container.textContent = temp;
      return;
    }

    validateHistoryCreation();

    // Validate '-' sign as a negative after MD
    if ((op_container.textContent[visualTextLength - 2] === 'x' || op_container.textContent[visualTextLength - 2] === '/') && operator.textContent === '-') {
      user_input = '-';
      op_container.textContent = `${op_container.textContent.slice(0, -1)} ${operator.textContent}`;
      console.log('Operator | user_input: ' + user_input);
      console.log('Operator | input_arr: ' + input_arr);
      return;
    }

    // Validate '-' sign as a negative
    // When operation container is empty
    if (op_container.textContent === '' && operator.textContent === '-') {
      user_input = '-';
      op_container.textContent = operator.textContent;
      console.log('Operator | user_input: ' + user_input);
      console.log('Operator | input_arr: ' + input_arr);
      return;
    }

    // Validate if operator has to be changed
    if (op_container.textContent.slice(-1) === ' ') {
      op_container.textContent = `${op_container.textContent.slice(0, -2)}${operator.textContent} `;
      return;
    }

    // Validate that the current 'operator' is not negative
    // This is to prohibit addition of an operator
    // Without a number after a negative sign
    // Format: (num oper negative) || (23 x -)
    if (op_container.textContent.slice(-1) !== '-') {
      // Update visual text
      // Add operator
      op_container.textContent += ` ${operator.textContent} `;
      user_input = '';
    }

    console.log('Operator | user_input: ' + user_input);
    console.log('Operator | input_arr: ' + input_arr);
    dynamicFont();
  });
});

// All Clear Value
key_ac.addEventListener("mousedown", () => {
  if (upper_screen.contains(upper_screen.querySelector('.history-container'))) {
    upper_screen.removeChild(upper_screen.querySelector('.history-container'));
    screen.classList.toggle('screen-initial');
    screen.classList.toggle('history-active');
  }

  if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
    op_container.classList.toggle('active');
    removeAnswerContainer();
  }

  // Reinitialize all || Delete All
  op_container.textContent = "";
  op_container.classList.remove("mid-font");
  op_container.classList.remove("small-font");
  verify_font_size = 0;
  user_input = "";
  input_arr = [];
  console.log('All Clear | input_arr:' + input_arr);
  console.log('All Clear | user_input:' + user_input);
});

// Clear Value
key_c.addEventListener("mousedown", () => {
  let visualTextLength = op_container.textContent.length; // Length of visual text

  // Verify if the current visual text is an operator
  // Format: (num operator ) || (12 - )
  if (op_container.textContent[visualTextLength - 1] == " ") {
    // Verify if answer container is already displayed
    if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
      // Remove answer container
      removeAnswerContainer();
    }

    // Update visual text
    // By removing operator and spaces around it
    op_container.textContent = op_container.textContent.slice(0, visualTextLength - 3);
    // Pre-history back-up value
    console.log(pre_history_user_input);
    user_input = pre_history_user_input;
    // If next visual text number is 0.
  } else if (user_input === '0.') {
    // Verify if answer container is already displayed
    if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
      // Remove answer container
      removeAnswerContainer();
    }

    // Update visual text
    op_container.textContent = op_container.textContent.slice(0, visualTextLength - 2);
    // Update back-end value
    user_input = "";
    // Anything else
  } else {
    // Verify if answer container is already displayed
    if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
      // Remove answer container
      removeAnswerContainer();
      // Take last back-end array value 
      user_input = pre_history_arr.pop().toString();
      user_input = user_input.slice(0, user_input.length - 1)
      // Reinitialize pre-history array
      pre_history_arr = [];
      // Anything else
    } else {
      user_input = user_input.slice(0, user_input.length - 1);
    }

    // Update visual text
    op_container.textContent = op_container.textContent.slice(0, visualTextLength - 1);
  }

  console.log('Clear | user_input: ' + user_input);
  console.log('Clear | input_arr: ' + input_arr);

  // Verify if visual text can be rendered larger 
  if (
    op_container.getBoundingClientRect().width <
    calculator_screen.getBoundingClientRect().width * 0.5
  ) {
    if (verify_font_size === 2) {
      op_container.classList.toggle("small-font");
      op_container.classList.toggle("mid-font");
      verify_font_size = 1;
    } else if (verify_font_size === 1) {
      op_container.classList.toggle("mid-font");
      verify_font_size = 0;
    }
  }
});

// Equal Function (See calculate.js for calculate functions)
key_equal.addEventListener('mousedown', () => {
  let visualTextLength = op_container.textContent.length; // Length of visual text

  // Verify if visual text is empty
  if (op_container.textContent === "") {
    return;
  };

  // Verify if last visual text is just negative sign
  if (op_container.textContent.slice(-1) === '-') {
    op_container.textContent = op_container.textContent.slice(0, -1);
  };

  // Add back-end values to array
  input_arr = op_container.textContent.split(' ');
  let tempValue; // Create temp value holder
  // Validate if float, int, or operator
  for (let i = 0; i < input_arr.length; i++) {
    tempValue = input_arr[i]; // Add value on temp var
    if (validateFloat(tempValue)) {
      numeric = parseFloat(tempValue);
    } else if (validateInt(tempValue)) {
      numeric = parseInt(tempValue);
    } else {
      continue;
    }

    // Change element
    input_arr.splice(i, 1, numeric);
  }

  // Check if current visual text is an operator
  // Format: (num operator) || (93 / )
  if (op_container.textContent[op_container.textContent.length - 1] === ' ') {
    // Answer with ???
    createAnswerContainer();
    // Anything else
  } else {
    // Verify if current visual text ends with "."
    // Format: (num.) || (32.)
    if (op_container.textContent[visualTextLength - 1] === '.') {
      // Remove decimal on visual text
      op_container.textContent = op_container.textContent.slice(0, visualTextLength - 1);
      // Remove decimal on back-end value
      user_input = user_input.slice(0, user_input.length - 1);
    }

    console.log('Equal | user_input: ' + user_input);
    console.log('Equal | input_arr: ' + input_arr);

    // Create answer container
    if (!bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
      createAnswerContainer();
    }

    // Back up back-end value in case of revision before a history
    pre_history_user_input = user_input;
    // Reinitialize back-end value
    user_input = '';
    // Back-up array in case of revision before a history
    pre_history_arr[0] = input_arr.pop();
    console.log('Equal | user_input: ' + user_input);
    console.log('Equal | input_arr: ' + input_arr);
    console.log('Equal | pre_history_user_input: ' + pre_history_user_input);
    console.log('Equal | pre_history_arr: ' + pre_history_arr);
  }
});

// Operation container function
op_container.addEventListener('mousedown', () => {
  let answer_container = bottom_screen.querySelector('.answer-container');

  if (bottom_screen.contains(answer_container)) {
    removeAnswerContainer();
    if (op_container.textContent[op_container.textContent.length - 1] !== " ") {
      user_input = pre_history_user_input;
    }
  }

  console.log('Pre-History | user_input: ' + user_input);
  console.log('Pre-History | input_arr: ' + input_arr);
});