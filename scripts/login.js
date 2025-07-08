const email = document.getElementById('email');
const senha = document.getElementById('senha');
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    console.log(email.value, senha.value);
});