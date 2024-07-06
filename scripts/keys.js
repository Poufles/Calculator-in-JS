// Validate decimal
function isDecimal(value) {
  return value.includes(".");
}

// Numpad value
numpads.forEach((numpad) => {
  numpad.addEventListener("mousedown", () => {
    op_container.textContent += numpad.textContent;
    user_input =
      user_input === ""
        ? numpad.textContent
        : user_input + numpad.textContent;

    console.log(user_input);

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
  });
});

// Dot Key Value
key_dot.addEventListener("mousedown", () => {
  if (!isDecimal(user_input)) {
    if (user_input === "" && input_arr.length === 0) {
      op_container.textContent = `0${key_dot.textContent}`;
    } else if (user_input !== "" && input_arr.length === 0) {
      op_container.textContent = op_container.textContent + key_dot.textContent
    } else if (user_input === "" && input_arr.length !== 0) {
      op_container.textContent = op_container.textContent + `0${key_dot.textContent}`;
    } else {
      op_container.textContent = op_container.textContent + key_dot.textContent;
    };

    user_input = user_input === "" ? `0${key_dot.textContent}` : user_input + key_dot.textContent;
    console.log(user_input);
  }
});

// Operator Keys Vale
operators.forEach((operator) => {
  operator.addEventListener("mousedown", () => {
    if (op_container.textContent[op_container.textContent.length - 1] === " ") {
      op_container.textContent =
        op_container.textContent.slice(0, op_container.textContent.length - 2) +
        `${operator.textContent} `;
      input_arr[input_arr.length - 1] = operator.textContent;
    } else {
      let numeric = 0;
      if (isDecimal(user_input)) {
        numeric = parseFloat(user_input);
      } else {
        numeric = parseInt(user_input);
      };

      input_arr.push(numeric);
      op_container.textContent += ` ${operator.textContent} `;
      input_arr.push(operator.textContent);
      user_input = "";
    }

    console.log(input_arr);
    console.log(user_input);
  });
});

// All Clear Value
key_ac.addEventListener("mousedown", () => {
  op_container.textContent = "";
  op_container.classList.remove("mid-font");
  op_container.classList.remove("small-font");
  verify_font_size = 0;
  user_input = "";
  input_arr.splice(0, input_arr.length);
  console.log(input_arr);
  console.log(user_input);
});

// Clear Value
key_c.addEventListener("mousedown", () => {
  if (op_container.textContent[op_container.textContent.length - 1] == " ") {
    op_container.textContent = op_container.textContent.slice(0, op_container.textContent.length - 3);
    user_input = op_container.textContent;
    input_arr.splice(input_arr.length - 2);
  } else {
    op_container.textContent = op_container.textContent.slice(0, op_container.textContent.length - 1);
    user_input = user_input.slice(0, user_input.length - 1);
  }

  console.log(input_arr);
  console.log(user_input);

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