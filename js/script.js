// Usuários e senhas
let usuarios = {
  'Marcelo': 'Teste123',
  'Júlia':      'Julia123',
  'Gabrielly':   'Linda123',
  'Sarah':      'Sarah123',
  'Luiz':       'Luiz123'
}

// Mensagens iniciais dos dois chats
let mensagensChat1 = [
  { autor: 'Sarah',   texto: 'Oi pessoal! Alguém já começou o trabalho de PPI? (é até dia 10/05)' },
  { autor: 'Júlia',   texto: 'O meu grupo já. Eu tô no CSS.' },
  { autor: 'Luiz',    texto: 'O meu tbm já começou. Tô configurando o layout' }
]

let mensagensChat2 = [
  { autor: 'Lindalva', texto: 'Gnt, como centraliza um elemento com CSS??' },
  { autor: 'Luiz',     texto: 'É só usar display flex com justify-content center!' },
  { autor: 'Lindalva', texto: 'Ahh funcionou! Vlw!!' }
]

let chatAtual = 1
let usuarioLogado = ''

// Mostrar/esconder páginas
function mostrarPagina(nome) {
  if (nome == 'chat' && usuarioLogado == '') {
    let erro = document.getElementById('msg erro')
    erro.textContent = 'Faça login para acessar o chat!'
    erro.style.display = 'block'
    return
  }

  let paginas = document.querySelectorAll('.pagina')
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].classList.remove('ativa')
  }

  document.getElementById('pagina-' + nome).classList.add('ativa')
}

// Login
function fazerLogin() {
  let usuario = document.getElementById('campo-usuario').value
  let senha = document.getElementById('campo-senha').value
  let erro = document.getElementById('msg-erro')

  if (usuarios[usuario] && usuarios[usuario] == senha) {
    usuarioLogado = usuario
    erro.style.display = 'none'
    mostrarPagina('chat')
    abrirChat(1)
  } else {
    erro.textContent = 'Usuário ou senha incorretos.'
    erro.style.display = 'block'
  }
}

// Logout
function fazerLogout() {
  usuarioLogado = ''
  mostrarPagina('login')
}

// Abrir chat
function abrirChat(numero) {
  chatAtual = numero

  document.getElementById('aba-1').classList.remove('ativa')
  document.getElementById('aba-2').classList.remove('ativa')
  document.getElementById('aba-' + numero).classList.add('ativa')

  renderizarMensagens()
}

// Renderiza as mensagens na tela
function renderizarMensagens() {
  let area = document.getElementById('area-mensagens')
  area.innerHTML = ''

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

// Enviar mensagem
function enviarMensagem() {
  let campo = document.getElementById('campo-mensagem')
  let texto = campo.value.trim()

  if (texto == '') return

  let nova = { autor: usuarioLogado, texto: texto }

  if (chatAtual == 1) {
    mensagensChat1.push(nova)
  } else {
    mensagensChat2.push(nova)
  }

  campo.value = ''
  renderizarMensagens()
}

// Começa na página de login
mostrarPagina('login')
