document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Seleciona o formulário de login
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            // 2. Pega os valores dos campos de email e senha
            // No seu HTML de login, os inputs não têm ID, então vamos pegá-los pelo atributo 'name'
            const emailInput = document.querySelector('input[name="email"]');
            const senhaInput = document.querySelector('input[name="senha"]');

            const emailValue = emailInput.value.trim();
            const senhaValue = senhaInput.value.trim();

            if (emailValue === '' || senhaValue === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // --- INÍCIO DA LÓGICA DE LOGIN ---

            // 3. Lê a lista de usuários do LocalStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // 4. Procura por um usuário que tenha o mesmo email E a mesma senha
            // O método .find() é perfeito para isso. Ele retorna o primeiro elemento que satisfaz a condição, ou 'undefined' se não encontrar ninguém.
            const foundUser = users.find(user => user.email === emailValue && user.senha === senhaValue);

            // 5. Verifica se o usuário foi encontrado
            if (foundUser) {
                // Se 'foundUser' não for 'undefined', o login foi um sucesso!
                alert(`Login bem-sucedido! Bem-vindo, ${foundUser.nome}!`);
                
                // Redireciona para a página principal de denúncias
                window.location.href = 'denunciacomLista.html';
            } else {
                // Se 'foundUser' for 'undefined', as credenciais estão erradas.
                alert('E-mail ou senha incorretos. Por favor, tente novamente.');
            }
        });
    }
});