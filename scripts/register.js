const nome = document.getElementById('nome');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const nascimento = document.getElementById('nascimento');
const whatsapp = document.getElementById('whatsapp');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmar-senha');
const form = document.querySelector('form');

form.addEventListener( 'submit' , function (event) {
    console.log(nome.value, email.value, cpf.value, nascimento.value);
})