
function validarMayorEdad(Edad) {
  if (Edad >= 18) {
    console.log(`Eres mayor de edad, tu edad es ${Edad}`);
  } else {
    console.log(`Eres menor de edad, tu edad es ${Edad}`);
  }
}

function validarMayores(a, b) {
  let respuesta = "";
  if (a > b) {
    respuesta = `A es mayor`;
  } else {
    if (a == b) {
      respuesta = `Son iguales`;
    } else {
      respuesta = `B es mayor`;
    }
  }

  return respuesta;
}

function calcularMayor() {
  let numA = document.getElementById("numA").value;
  let numB = document.getElementById("numB").value;

  document.getElementById("resultado").innerHTML = validarMayores(numA, numB);
}

validarMayores(0, 2);
validarMayores(3, 2);
validarMayores(2, 2);
validarMayores(-3, 2);