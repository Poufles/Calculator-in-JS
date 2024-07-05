const input = document.querySelector(`#user-input`);

function contains(stringValue, charValue) {
  return stringValue.indexOf(charValue) > -1;
}

document.addEventListener("keydown", (e) => {
  if (document.activeElement !== input) {
    console.log(e.key);
  }
});

input.addEventListener("keypress", function (e) {
  var allowedChars = "0123456789.-+*/=";
  var invalidKey =
    (e.key.length === 1 && !contains(allowedChars, e.key)) ||
    (e.key === "." && contains(e.target.value, "."));
  invalidKey && e.preventDefault();
});