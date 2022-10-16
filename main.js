const piezas = [
  'imagen1', 'imagen2', 'imagen3',
  'imagen4', 'imagen5', 'imagen6',
  'imagen7', 'imagen8', 'imagen9'
]

const tablero = document.querySelector('#tablero')
const caja = document.querySelector('#caja')
const texto = document.querySelector('#texto')

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

      mostrarTexto('Correcto! 😀')

      if (caja.children.length <= 0) {
        mostrarTexto('Ganaste! ⭐')
      }

    } else {
      div.classList.remove('pintado')

      mostrarTexto('Esa pieza no va ahi 😅')
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
function mostrarTexto(respuesta) {
  texto.textContent(respuesta)
}