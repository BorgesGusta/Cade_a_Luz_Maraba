document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SELEÇÃO DOS ELEMENTOS DO HTML ---
    const formDenuncia = document.getElementById('form-denuncia');
    const listaDenunciasUL = document.getElementById('lista-denuncias');
    const btnEnviar = document.querySelector('.btn-enviar');
    const filtroInput = document.getElementById('filtro-bairro');

    // --- 2. FUNÇÕES PRINCIPAIS ---

    /**
     * Pega a lista de denúncias do LocalStorage.
     * @returns {Array} A lista de denúncias ou uma lista vazia.
     */
    function getTodasDenuncias() {
        return JSON.parse(localStorage.getItem('denuncias')) || [];
    }

    /**
     * Desenha uma lista de denúncias na tela (na <ul>).
     * @param {Array} denuncias - A lista de denúncias a ser exibida.
     */
    function renderizarDenuncias(denuncias) {
        // Limpa a lista atual para não duplicar itens
        listaDenunciasUL.innerHTML = '';

        // Se a lista estiver vazia, mostra uma mensagem
        if (denuncias.length === 0) {
            listaDenunciasUL.innerHTML = '<li>Nenhuma denúncia encontrada.</li>';
            return;
        }

        // Para cada denúncia, cria um elemento <li> e o insere na <ul>
        denuncias.forEach(function(denuncia) {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `
                <span>Bairro ${denuncia.bairro}</span>
                <span>${denuncia.descricao}</span>
                <span>${denuncia.data}</span>
                <a href="#"><i class="fas fa-search"></i></a>
            `;
            listaDenunciasUL.appendChild(itemLista);
        });
    }

    // --- 3. EVENT LISTENERS (OS "OUVINTES" DE AÇÕES) ---

    // Evento para o campo de FILTRO (dispara a cada tecla digitada)
    filtroInput.addEventListener('keyup', function() {
        const termoBusca = filtroInput.value.toLowerCase();
        const todasDenuncias = getTodasDenuncias();

        // Cria uma nova lista apenas com as denúncias que correspondem à busca
        const denunciasFiltradas = todasDenuncias.filter(function(denuncia) {
            return denuncia.bairro.toLowerCase().includes(termoBusca);
        });

        // Desenha na tela apenas a lista filtrada
        renderizarDenuncias(denunciasFiltradas);
    });

    // Evento para o CLICK no botão de ENVIAR DENÚNCIA
    btnEnviar.addEventListener('click', function(event) {
        // Impede que a página recarregue ao enviar o formulário
        event.preventDefault();

        // Pega os elementos do formulário
        const inputBairro = document.getElementById('denuncia-bairro');
        const textareaDescricao = document.getElementById('denuncia-descricao');
        
        // Pega os valores e remove espaços em branco
        const bairroValue = inputBairro.value.trim();
        const descricaoValue = textareaDescricao.value.trim();

        // Validação simples
        if (bairroValue === '' || descricaoValue === '') {
            alert('Por favor, preencha o bairro e a descrição da ocorrência.');
            return;
        }

        // Lógica para salvar a nova denúncia
        const todasDenuncias = getTodasDenuncias();
        const novaDenuncia = {
            bairro: bairroValue,
            descricao: descricaoValue,
            data: new Date().toLocaleDateString('pt-BR'),
            id: Date.now()
        };
        todasDenuncias.push(novaDenuncia);
        localStorage.setItem('denuncias', JSON.stringify(todasDenuncias));

        // Feedback para o usuário e limpeza
        alert('Denúncia realizada com sucesso!');
        formDenuncia.reset(); // Limpa os campos do formulário
        filtroInput.value = ''; // Limpa o campo de filtro

        // Atualiza a lista na tela para mostrar a nova denúncia
        renderizarDenuncias(getTodasDenuncias());
    });

    // --- 4. CHAMADA INICIAL ---
    // Renderiza a lista completa de denúncias assim que a página carrega
    renderizarDenuncias(getTodasDenuncias());
});