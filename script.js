let usuarios = {
  'Marcelo': 'Teste123', ///projeto de banco de dados
  'Júlia': 'Julia123',
  'Gabrielly': 'Linda123',
  'Sarah': 'Sarah123',
  'Luiz': 'Luiz123'
}
//array de objetos para armazenar as mensagens
let mensagensChat1 = [
  { autor: 'Sarah', texto: 'Oi pessoal! Alguém já começou o trabalho de PI?' },
  { autor: 'Júlia', texto: 'Eu tô no CSS' },
  { autor: 'Luiz', texto: 'Eu tô configurando o layout' }
]

let mensagensChat2 = [
  { autor: 'Lindalva', texto: 'Como centraliza um elemento com CSS?' },
  { autor: 'Luiz', texto: 'Usa display flex com justify-content center!' },
  { autor: 'Lindalva', texto: 'Funcionou' }
]

let chatAtual = 1 //controla qual sala está ativa
let usuarioLogado = ''  //armazenamento do usuário


function mostrarPagina(nome) {
  //bloqueia o usuário caso ele não esteja logado
  if (nome == 'chat' && usuarioLogado == '') {
    let erro = document.getElementById('msg erro')
    erro.textContent = 'Faça login para acessar o chat!'
    erro.style.display = 'block'
    return
  }
  //esconde todas as páginas removendo a classe 'ativa'
  let paginas = document.querySelectorAll('.pagina')
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].classList.remove('ativa')
  }

  document.getElementById('pagina-' + nome).classList.add('ativa')
}

//funções de login e sair 
function fazerLogin() {
  let usuario = document.getElementById('campo-usuario').value
  let senha = document.getElementById('campo-senha').value
  let erro = document.getElementById('msg-erro')
  //verifica se o usuário existe no objeto e se a senha é igual
  if (usuarios[usuario] && usuarios[usuario] == senha) {
    usuarioLogado = usuario
    erro.style.display = 'none'
    mostrarPagina('chat')
    //sala padrão
    abrirChat(1)
  } else {
    erro.textContent = 'Usuário ou senha incorretos.'
    erro.style.display = 'block'
  }
}

function deslogar() {
  usuarioLogado = ''
  mostrarPagina('login')
}

function abrirChat(numero) {
  chatAtual = numero
  //troca o visual das abas (visual de botão clicado)
  document.getElementById('aba-1').classList.remove('ativa')
  document.getElementById('aba-2').classList.remove('ativa')
  document.getElementById('aba-' + numero).classList.add('ativa')

  renderizarMensagens()
}

function renderizarMensagens() {
  let area = document.getElementById('area-mensagens')
  area.innerHTML = ''
  //escolhe qual lista de mensagens usar 
  let lista = chatAtual == 1 ? mensagensChat1 : mensagensChat2

  for (let i = 0; i < lista.length; i++) {
    let m = lista[i]
    let div = document.createElement('div')

    if (m.autor == usuarioLogado) {
      div.className = 'mensagem-enviada'
      div.textContent = m.texto
    } else {
      div.className = 'mensagem-recebida'
      div.innerHTML = '<span class="autor">' + m.autor + '</span>' + m.texto
    }

    area.appendChild(div)
  }

  area.scrollTop = area.scrollHeight

}

function enviarMensagem() {
  let campo = document.getElementById('campo-mensagem')
  let texto = campo.value.trim()

  if (texto == '') return

  let nova = { autor: usuarioLogado, texto: texto } //cria mensagem

  if (chatAtual == 1) {
    mensagensChat1.push(nova) //empurra a mensagem ao final da lista
  } else {i
    mensagensChat2.push(nova)
  }

  campo.value = '' //limpa o campo de texto
  renderizarMensagens() //atualiza a telaa
}


mostrarPagina('login')
