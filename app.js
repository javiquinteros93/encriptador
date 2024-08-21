let parrafoResultado = document.getElementById("parrafo__resultado");
let parrafo = document.getElementById("parrafo");
let h2Viejo = document.getElementById("h2bloque2");
let muñeco = document.getElementById("muñeco");
let contenedorBloque2 = document.getElementById("contenedor__bloque2");
let botonCopiar = document.getElementById("boton__copiar");

const mediaBp = matchMedia("(min-width: 950px)");
const changeSize = (mq) => {
  mq.matches
    ? document.getElementById("muñeco").removeAttribute("hidden")
    : document.getElementById("muñeco").setAttribute("hidden", "");
};

mediaBp.addEventListener("change", changeSize);
changeSize(mediaBp);

function Encriptar() {
  let input_texto = document.getElementById("caja__texto").value;
  let input_texto_lowerCase = input_texto.toLowerCase();
  if (input_texto.length != 0) {
    if (input_texto === input_texto_lowerCase) {
      eliminarAcentos(input_texto);
      if (input_texto === input_textoSinAcentos) {
        textoCifrado = input_texto
          .replace(new RegExp("e", "g"), "enter")
          .replace(new RegExp("i", "g"), "imes")
          .replace(new RegExp("a", "g"), "ai")
          .replace(new RegExp("o", "g"), "ober")
          .replace(new RegExp("u", "g"), "ufat");

        AsignarTextoElemento(textoCifrado);
      } else {
        alertaCaracter("Debe ingresar carácteres sin acentuación", "amarillo");
      }
    } else {
      alertaCaracter("Debe ingresar carácteres en minuscula", "amarillo");
    }
  } else {
    normalizarPanelEncriptado();
  }
}

function Desencriptar() {
  let input_texto = document.getElementById("caja__texto").value;
  let input_texto_lowerCase = input_texto.toLowerCase();
  if (input_texto.length != 0) {
    if (input_texto === input_texto_lowerCase) {
      eliminarAcentos(input_texto);
      if (input_texto === input_textoSinAcentos) {
        textoDescifrado = input_texto
          .replace(new RegExp("enter", "g"), "e")
          .replace(new RegExp("imes", "g"), "i")
          .replace(new RegExp("ai", "g"), "a")
          .replace(new RegExp("ober", "g"), "o")
          .replace(new RegExp("ufat", "g"), "u");

        AsignarTextoElemento(textoDescifrado);
      } else {
        alertaCaracter("Debe ingresar carácteres sin acentuación", "amarillo");
      }
    } else {
      alertaCaracter("Debe ingresar carácteres en minuscula", "amarillo");
    }
  } else {
    normalizarPanelEncriptado();
  }
}

function AsignarTextoElemento(texto) {
  contenedorBloque2.setAttribute("class", "contenedor__bloque2__encriptado");
  parrafoResultado.innerHTML = texto;
  h2Viejo.innerHTML = "";
  muñeco.setAttribute("hidden", "");
  parrafo.innerHTML = "";
  botonCopiar.removeAttribute("hidden");
}

function normalizarPanelEncriptado() {
  alertaCaracter("Debe ingresar aunque sea 1 carácter", "amarillo");
  parrafo.innerHTML = "Ingresa el texto que desees encriptar o desencriptar";
  parrafoResultado.innerHTML = "";
  h2Viejo.innerHTML = "Ningún mensaje fue encontrado";
  contenedorBloque2.setAttribute("class", "contenedor__bloque2");
  botonCopiar.setAttribute("hidden", "");
  if (mediaBp.matches === true) {
    muñeco.removeAttribute("hidden");
  }
}

function copiarAlPortapapeles() {
  let textoCopiado = document.getElementById("parrafo__resultado").innerHTML;
  navigator.clipboard.writeText(textoCopiado);
  alertaCaracter("Texto copiado con éxito!", "verde");
}

function eliminarAcentos(texto) {
  input_textoSinAcentos = texto
    .replace(/\u00E1/g, "a")
    .replace(/\u00E9/g, "e")
    .replace(/\u00ED/g, "i")
    .replace(/\u00F3/g, "o")
    .replace(/\u00FA/g, "u");
  return texto;
}

function alertaCaracter(mensajeAlerta, color) {
  let alerta = document.getElementById("alerta");
  if (color === "amarillo") {
    alerta.removeAttribute("class");
    alerta.setAttribute("class", "alerta mostrar alertaAmarilla");
    setTimeout(() => {
      alerta.removeAttribute("class");
      alerta.setAttribute("class", "alerta esconder alertaAmarilla");
    }, 5000);

    let mensaje = document.getElementById("alerta_texto");
    mensaje.innerHTML = mensajeAlerta;

    let img = document.getElementById("alerta_icono");
    img.removeAttribute("src");
    img.setAttribute("src", "exclamacion.png");
  } else {
    alerta.removeAttribute("class");
    alerta.setAttribute("class", "alerta mostrar alertaVerde");
    setTimeout(() => {
      alerta.removeAttribute("class");
      alerta.setAttribute("class", "alerta esconder alertaVerde");
    }, 5000);

    let mensaje = document.getElementById("alerta_texto");
    mensaje.innerHTML = mensajeAlerta;

    let img = document.getElementById("alerta_icono");
    img.removeAttribute("src");
    img.setAttribute("src", "check.png");
  }
}
