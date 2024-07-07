const keys = document.querySelectorAll('keys');
const numpads = document.querySelectorAll('.numpad');
const key_dot = document.querySelector('.dot');
const key_ac = document.querySelector('#all-clear');
const key_c = document.querySelector('#clear');
const calculator_screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');
const key_equal = document.querySelector('.equal');
const bottom_screen = document.querySelector('.bottom-screen');
const op_container = bottom_screen.querySelector('.operation-text');
const temp_equalValue = "";

let input_arr = [];
let user_input = '';
let verify_font_size = 0;