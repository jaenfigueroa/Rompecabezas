const piezas = [
  'imagen1', 'imagen2', 'imagen3',
  'imagen4', 'imagen5', 'imagen6',
  'imagen7', 'imagen8', 'imagen9'
]

const tablero = document.querySelector('#tablero')
const caja = document.querySelector('#caja')
const texto1 = document.querySelector('#texto1')
const texto2 = document.querySelector('#texto2')

//LLENAR LOS ESPACIOS EN EL TABLERO//////////////////////
piezas.forEach(pieza => {
  const div = document.createElement('div')
  div.className = `espacio`
  div.dataset.respuesta = pieza
  tablero.append(div)

  /////////////////
  div.addEventListener('dragleave', (evento) => {
    div.classList.remove('pintado')
  })
  /////////////////
  div.addEventListener('dragover', (evento) => {
    evento.preventDefault()

    div.classList.add('pintado')
  })

  //////////////////
  div.addEventListener('drop', (evento) => {
    let idElemento = evento.dataTransfer.getData('idElemento')
    let respuesta = evento.target.dataset.respuesta

    igualdad = idElemento === respuesta

    if (igualdad) {
      div.append(document.getElementById(idElemento))

      mostrarResultado('correcto')

      if (caja.children.length <= 0) {
        mostrarResultado('ganaste')
      }

    } else {
      div.classList.remove('pintado')

      mostrarResultado('noescorrecto')
    }
  })
});

//LLENAR LAS PIEZAS EN CAJA/////////////////////////////
while (piezas.length > 0) {
  let numeroAleatorio = Math.floor(Math.random() * piezas.length)

  let pieza = piezas[numeroAleatorio]
  let div = document.createElement('div')

  div.className = 'pieza'
  div.id = pieza
  div.style.backgroundImage = `url(./assets/grupos/shuek/${pieza}.jpg)`
  div.style.backgroundSize = 'cover'
  div.draggable = true

  caja.append(div)

  ////////////
  div.addEventListener('dragstart', (evento) => {
    let idElemento = evento.target.id
    // console.log(idElemento);
    evento.dataTransfer.setData('idElemento', idElemento)
  })

  piezas.splice(numeroAleatorio, 1)
}

//OTROS/////////////////////////////////////////////////////////
function mostrarResultado(respuesta) {

  if (respuesta == 'noescorrecto') {
    cambiarTexto('That piece does not go there 😅')
    cambiarColor('rojo')

  } else if (respuesta === 'correcto') {
    cambiarTexto('Correct! 😀')
    cambiarColor('verde')

  } else {
    cambiarTexto('⭐ WIN! ⭐')
    cambiarColor('dorado')

    caja.style.display = 'none'
  }
}

function cambiarTexto(contenido) {
  texto1.textContent = contenido
  texto2.textContent = contenido
}

function cambiarColor(color) {
  texto1.className = color
  texto2.className = color
}