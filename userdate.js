const pianoKeys = document.querySelectorAll('.piano-keys');

function StoreUserInput(event) {
  const key = event.target.getAttribute('data-key');
  
  let pressedKeys = JSON.parse(localStorage.getItem('pressedKeys')) || [];
  
  pressedKeys.push(key);
  
  localStorage.setItem('pressedKeys', JSON.stringify(pressedKeys));
}

pianoKeys.forEach(key => {
  key.addEventListener('click', StoreUserInput);
});