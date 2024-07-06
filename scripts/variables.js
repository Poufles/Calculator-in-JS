const keys = document.querySelectorAll('.keys');
const numpads = document.querySelectorAll('.numpad');
const key_dot = document.querySelector('.dot');
const key_ac = document.querySelector('#all-clear');
const key_c = document.querySelector('#clear');
const op_container = document.querySelector('.operation-container');
const calculator_screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');

let input_arr = [];
let user_input = '';
let verify_font_size = 0;