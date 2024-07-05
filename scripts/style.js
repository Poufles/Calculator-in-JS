keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        key.classList.toggle('key-press');
    })
});

keys.forEach(key => {
    key.addEventListener('mouseup', () => {
        key.classList.toggle('key-press');
    })
});

keys.forEach(key => {
    key.addEventListener('mouseleave', () => {
        if (key.classList.contains('key-press'))
        key.classList.toggle('key-press');
    })
});