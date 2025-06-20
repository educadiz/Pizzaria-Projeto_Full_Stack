const MENSAGENS = {
    ERRO_CARREGAR: 'Erro ao carregar clientes',
    ERRO_SALVAR: 'Erro ao salvar cliente',
    ERRO_DELETAR: 'Erro ao excluir cliente',
    ERRO_EDITAR: 'Erro ao carregar cliente para edição',
    CAMPOS_OBRIGATORIOS: 'Por favor, preencha os campos obrigatórios',
    SUCESSO_SALVAR: 'Cliente salvo com sucesso!',
    SUCESSO_DELETAR: 'Cliente excluído com sucesso!',
    CONFIRMA_DELETAR: 'Tem certeza que deseja excluir este cliente?'
};

let editingClientId = null;

async function loadClients() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/clientes`);
        if (!response.ok) throw new Error(MENSAGENS.ERRO_CARREGAR);
        
        const { dados: clients = [] } = await response.json();
        
        // Ordenando os clientes por nome em ordem alfabética
        const sortedClients = clients.sort((a, b) => 
            a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
        );
        
        const clientsList = document.getElementById('clients-list');
        
        clientsList.innerHTML = sortedClients.length === 0 
            ? '<tr><td colspan="6">Nenhum cliente encontrado</td></tr>'
            : sortedClients.map(client => `
                <tr>
                    <td>${client.nome || ''}</td>
                    <td>${client.email || ''}</td>
                    <td>${client.telefone || ''}</td>
                    <td>${client.CEP || ''}</td>
                    <td>
                        ${client.rua || ''} ${client.complemento ? ', ' + client.complemento : ''}<br>
                        ${client.bairro ? client.bairro + ', ' : ''}${client.cidade || ''} - ${client.estado || ''}
                    </td>
                    <td>
                        <button onclick="editClient('${client.id}')" class="btn-small waves-effect waves-light green">
                            <i class="material-icons">edit</i>
                        </button>
                        <button onclick="deleteClient('${client.id}')" class="btn-small waves-effect waves-light red">
                            <i class="material-icons">delete</i>
                        </button>
                        <button onclick="showClientHistory('${client.id}')" class="btn-small waves-effect waves-light blue">
                            <i class="material-icons">history</i>
                        </button>
                    </td>
                </tr>
            `).join('');
    } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        M.toast({html: MENSAGENS.ERRO_CARREGAR});
        document.getElementById('clients-list').innerHTML = 
            '<tr><td colspan="6">Erro ao carregar clientes</td></tr>';
    }
}

async function buscarCep() {
    const cepInput = document.getElementById('clientCep');
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return;
    }

    try {
        const response = await fetch(`${CONFIG.API_URL}/viacep/${cep}`);
        const data = await response.json();

        if (data.erro) {
            Swal.fire({
                title: 'CEP não encontrado',
                text: 'Por favor, insira os dados manualmente.',
                icon: 'warning'
            });
            return;
        }

        document.getElementById('clientRua').value = data.logradouro;
        document.getElementById('clientBairro').value = data.bairro;
        document.getElementById('clientCidade').value = data.localidade;
        document.getElementById('clientEstado').value = data.uf;
        
        M.updateTextFields();
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        Swal.fire({
            title: 'Erro',
            text: 'Não foi possível buscar o CEP. Por favor, insira os dados manualmente.',
            icon: 'error'
        });
    }
}

async function saveClient() {
    const nome = document.getElementById('clientName').value.trim();
    const telefone = document.getElementById('clientPhone').value.trim();

    // Validação dos campos obrigatórios
    if (!nome) {
        Swal.fire({
            icon: 'error',
            title: 'Campo Obrigatório',
            text: 'Por favor, preencha o nome do cliente!',
            confirmButtonColor: '#900404'
        });
        return;
    }

    if (!telefone) {
        Swal.fire({
            icon: 'error',
            title: 'Campo Obrigatório',
            text: 'Por favor, preencha o telefone do cliente!',
            confirmButtonColor: '#900404'
        });
        return;
    }

    const form = document.getElementById('registrationForm');
    const formData = {
        nome: form.nome.value.trim().toUpperCase(),
        email: form.email.value.trim().toLowerCase(),
        telefone: form.telefone.value.trim(),
        CEP: form.cep.value.trim(),
        rua: form.rua.value.trim().toUpperCase(),
        bairro: form.bairro.value.trim().toUpperCase(),
        cidade: form.cidade.value.trim().toUpperCase(),
        estado: form.estado.value.trim().toUpperCase(),
        complemento: form.complemento.value.trim().toUpperCase()
    };

    if (!formData.nome || !formData.email || !formData.telefone) {
        M.toast({html: MENSAGENS.CAMPOS_OBRIGATORIOS});
        return;
    }

    try {
        const url = editingClientId 
            ? `${CONFIG.API_URL}/clientes/${editingClientId}`
            : `${CONFIG.API_URL}/clientes`;
            
        const response = await fetch(url, {
            method: editingClientId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.erro || MENSAGENS.ERRO_SALVAR);

        M.toast({html: data.mensagem || MENSAGENS.SUCESSO_SALVAR});
        form.reset();
        editingClientId = null;
        await loadClients();
    } catch (error) {
        console.error('Erro:', error);
        M.toast({html: error.message || MENSAGENS.ERRO_SALVAR});
    }
}

async function editClient(clientId) {
    try {
        const response = await fetch(`${CONFIG.API_URL}/clientes/${clientId}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.erro || MENSAGENS.ERRO_EDITAR);

        const client = data.dados;
        const form = document.getElementById('registrationForm');
        form.nome.value = client.nome;
        form.email.value = client.email || '';
        form.telefone.value = client.telefone;
        form.cep.value = client.CEP || '';
        form.rua.value = client.rua || '';
        form.bairro.value = client.bairro || '';
        form.cidade.value = client.cidade || '';
        form.estado.value = client.estado || '';
        form.complemento.value = client.complemento || '';
        
        editingClientId = clientId;
        M.updateTextFields();
    } catch (error) {
        console.error(MENSAGENS.ERRO_EDITAR, error);
        M.toast({html: error.message || MENSAGENS.ERRO_EDITAR});
    }
}

async function deleteClient(clientId) {
    const result = await Swal.fire({
        title: 'Confirmar exclusão',
        text: 'Tem certeza que deseja excluir este cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;
    
    try {
        const response = await fetch(`${CONFIG.API_URL}/clientes/${clientId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.erro || MENSAGENS.ERRO_DELETAR);

        Swal.fire({
            title: 'Sucesso!',
            text: data.mensagem || MENSAGENS.SUCESSO_DELETAR,
            icon: 'success'
        });
        await loadClients();
    } catch (error) {
        console.error('Erro:', error);
        Swal.fire({
            title: 'Erro!',
            text: error.message || MENSAGENS.ERRO_DELETAR,
            icon: 'error'
        });
    }
}

async function showClientHistory(clientId) {
    try {
        const response = await fetch(`${CONFIG.API_URL}/clientes/${clientId}/historico`);
        const data = await response.json();
        
        if (!data.sucesso) {
            throw new Error(data.erro || 'Erro ao carregar histórico');
        }

        const historicoList = document.getElementById('historicoList');
        const clienteNome = document.getElementById('clienteHistoricoNome');
        
        clienteNome.textContent = `Cliente: ${data.cliente_nome}`;
        
        if (data.historico && data.historico.length > 0) {
            historicoList.innerHTML = data.historico.map(pedido => `
                <tr>
                    <td>${new Date(pedido.data_pedido).toLocaleDateString('pt-BR')} ${new Date(pedido.data_pedido).toLocaleTimeString('pt-BR')}</td>
                    <td>${pedido.produtos.map(p => 
                        `${p.sabor} (${p.quantidade}x - ${p.tamanho})`
                    ).join(', ')}</td>
                    <td>R$ ${Number(pedido.preco_total).toFixed(2)}</td>
                </tr>
            `).join('');
        } else {
            historicoList.innerHTML = '<tr><td colspan="3" class="center-align">Cliente sem pedidos registrados</td></tr>';
        }

        const modal = M.Modal.getInstance(document.getElementById('modalHistoricoPedidos'));
        modal.open();
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        M.toast({html: 'Erro ao carregar histórico de pedidos'});
    }
}

function toggleClientesList() {
    const table = $('#clientesTable');
    const buttonText = document.getElementById('toggleButtonText');
    if (table.is(':visible')) {
        table.hide();
        buttonText.textContent = 'Exibir Clientes';
    } else {
        loadClients();
        table.show();
        buttonText.textContent = 'Ocultar Lista';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadClients();
    const modalElem = document.getElementById('modalCepNaoEncontrado');
    M.Modal.init(modalElem);
    const modalHistorico = document.getElementById('modalHistoricoPedidos');
    M.Modal.init(modalHistorico);

    // Implementação da máscara de telefone
    const phoneInput = document.getElementById('clientPhone');
    const maskPhoneOptions = {
        mask: '+55 (00) 0 0000-0000'
    };
    IMask(phoneInput, maskPhoneOptions);

    // Implementação da máscara de CEP
    const cepInput = document.getElementById('clientCep');
    const maskCepOptions = {
        mask: '00000-000'
    };
    IMask(cepInput, maskCepOptions);
});
