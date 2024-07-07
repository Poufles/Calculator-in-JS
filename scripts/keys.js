// Validate decimal
function isDecimal(value) {
  return value.includes(".");
}

// Create Answer container
function createAnswerContainer(arrayValue) {
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
    arrayValue.push(value);
  }

  right_part.textContent = verifyBeforeCalculate(arrayValue);
};

// Remove Answer container
function removeAnswerContainer() {
  bottom_screen.removeChild(bottom_screen.querySelector('.answer-container'));
  op_container.classList.add('active');
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
    // Visual effect
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
    // Verify if current visual text is an operator
    // " " signifies that the text inside the op_container
    // Has this format (num operator ) || (1 + ) 
    if (op_container.textContent[visualTextLength - 1] === " ") {
      // Change the operator visually
      op_container.textContent = op_container.textContent.slice(0, visualTextLength - 2) + `${operator.textContent} `;
      // Change the operator in the array
      input_arr[input_arr.length - 1] = operator.textContent;
      // Else when the format is (num || 12)
    } else {
      // Create temp variable
      let numeric = 0;
      // Verify is decimal(float) or not
      // Then parse to proper data type
      if (isDecimal(user_input)) {
        numeric = parseFloat(user_input);
      } else {
        numeric = parseInt(user_input);
      };

      // Add value to the back-end array
      input_arr.push(numeric);
      // Update visual text
      op_container.textContent = op_container.textContent[visualTextLength - 1] === '.' ? `${op_container.textContent.slice(0, visualTextLength - 1)} ${operator.textContent} ` : `${op_container.textContent} ${operator.textContent} `;
      // Update back-end array, add operator
      input_arr.push(operator.textContent);
      // Reinitialize back-end value for next num
      user_input = "";
      console.log('Operator | user_input: ' + user_input);
      console.log('Operator | input_arr: ' + input_arr);
    }

    console.log(input_arr);
    console.log(user_input);
    dynamicFont();
  });
});

// All Clear Value
key_ac.addEventListener("mousedown", () => {
  if (bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
    removeAnswerContainer();
  }

  // Reinitialize all || Delete All
  op_container.textContent = "";
  op_container.classList.remove("mid-font");
  op_container.classList.remove("small-font");
  verify_font_size = 0;
  user_input = "";
  input_arr.splice(0);
  console.log('All Clear | input_arr:' + input_arr);
  console.log('All Clear | user_input:' + user_input);
});

// Clear Value
key_c.addEventListener("mousedown", () => {
  let visualTextLength = op_container.textContent.length; // Length of visual text
  let arrayLength = input_arr.length; // Length of back-end value array

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
    // Take the previous num value
    user_input = input_arr[arrayLength - 2].toString();
    // Remove the previous value and the operator
    input_arr.splice(arrayLength - 2);
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
      user_input = input_arr.pop().toString();
      user_input = user_input.slice(0, user_input.length - 1)
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
  let answer = []; // Temp array
  let visualTextLength = op_container.textContent.length; // Length of visual text

  // Check if current visual text is an operator
  // Format: (num operator) || (93 / )
  if (op_container.textContent[op_container.textContent.length - 1] === ' ') {
    // Answer with ???
    createAnswerContainer(answer);
    // Anything else
  } else {
    let numeric = 0; // Temp answer variable

    // Verify if current visual text ends with "."
    // Format: (num.) || (32.)
    if (op_container.textContent[visualTextLength - 1] === '.') {
      // Remove decimal on visual text
      op_container.textContent = op_container.textContent.slice(0, visualTextLength - 1);
      // Remove decimal on back-end value
      user_input = user_input.slice(0, user_input.length - 1);
    }

    // Check if decimal
    // Then parse into proper data type
    if (isDecimal(user_input)) {
      numeric = parseFloat(user_input);
    } else {
      numeric = parseInt(user_input);
    };

    // Input value to the back-end array
    input_arr.push(numeric);
    // Reinitialize back-end value
    user_input = '';
    console.log('Equal | user_input' + user_input);
    console.log('Equal | input_arr' + input_arr);
    // Create answer container
    if (!bottom_screen.contains(bottom_screen.querySelector('.answer-container'))) {
      createAnswerContainer(answer);
    }
  }
});