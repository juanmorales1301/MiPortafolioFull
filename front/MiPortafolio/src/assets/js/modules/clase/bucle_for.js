/**
 * Ejercicios del ciclo for
 */

console.log(`Imprime los números del 1 al 10:
Escribe un programa que utilice un bucle for para imprimir los números del 1 al 10 en la consola.`);
for (let i = 1; i <= 10; i++) {
    console.log(`Numero ${i}`);
}



console.log(`Imprime los números del 10 al 1:
Escribe un programa que utilice un bucle for para imprimir los números del 10 al 1 en orden descendente.`);
for (let i = 10; i <= 1; i--) {
    console.log(`Numero ${i}`);
}


console.log(`Imprime los números pares del 2 al 20:
Escribe un programa que utilice un bucle for para imprimir todos los números pares entre 2 y 20.`);
for (let i = 2; i <= 20; i++) {
    if (i % 2 == 0) {
        console.log(`Numero ${i}`);
    }
}


console.log(`Imprime los números impares del 1 al 19:
Escribe un programa que utilice un bucle for para imprimir todos los números impares entre 1 y 19.`);
for (let i = 1; i <= 19; i++) {
    if (i % 2 != 0) {
        console.log(`Numero ${i}`);
    }
}


console.log(`Imprime la tabla de multiplicar del 5:
Escribe un programa que utilice un bucle for para imprimir la tabla de multiplicar del 5, desde 5x1 hasta 5x10.`);
for (let i = 5; i <= 50; i = i + 5) {
    console.log(`Numero 5*${i / 5} = ${i}`);
}


console.log(`Imprime los primeros 10 números cuadrados:
Escribe un programa que utilice un bucle for para imprimir los primeros 10 números elevados al cuadrado (1², 2², 3², ...).`);
for (let i = 1; i <= 10; i++) {
    console.log(`Numero ${i * i}`);
}


console.log(`Imprime los números del 1 al 10 y su doble:
Escribe un programa que utilice un bucle for para imprimir los números del 1 al 10 junto con su doble (por ejemplo: "1 - 2", "2 - 4", ...).`);
for (let i = 1; i <= 10; i++) {
    console.log(`Numero ${i} - ${i * 2}`);
}


console.log(`Imprime los primeros 10 números en forma de lista:
Escribe un programa que utilice un bucle for para imprimir los primeros 10 números, cada uno en una línea diferente, con el formato: "Número: X".`);
for (let i = 1; i <= 10; i++) {
    console.log(`Número: ${i}.`);
}


console.log(`Suma de los primeros 10 números:
Escribe un programa que utilice un bucle for para calcular la suma de los primeros 10 números enteros (1+2+3+...+10).`);
var suma = 0;
for (let i = 1; i <= 10; i++) {
    suma += i;
}
console.log(`Total suma enteros del 1 al 10: ${suma}.`);



console.log(`Imprime una secuencia de asteriscos:
Escribe un programa que utilice un bucle for para imprimir 10 asteriscos en una sola línea (**********).`);
var strResult = "";
for (let i = 1; i <= 10; i++) {
    strResult += i;
}
console.log(`Resultado: ${strResult}.`);



console.log(`Imprime los elementos de un array:
Escribe un programa que utilice un bucle for para imprimir todos los elementos de un array de números, uno por línea.`);
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let item of array) {
    console.log(`Numero: ${item}.`);
}



console.log(`Suma de los elementos de un array:
Escribe un programa que utilice un bucle for para calcular la suma de todos los elementos en un array de números.`);
var array = [0, 2, 3, 6, 8, 3, 6, 8];
var sumaArr = 0;
for (let item of array) {
    sumaArr += item;
}
console.log(`Resultado suma array: ${sumaArr}.`);



console.log(`Encuentra el número más grande en un array:
Escribe un programa que utilice un bucle for para encontrar y mostrar el número más grande en un array de números.`);
var array = [0, 2, 1, 6, 9, 3, 6, 8];
var numMayor = array[0];
for (let item of array) {
    if (item > numMayor) numMayor = item;
}
console.log(`Numero mayor del Array: ${numMayor}.`);



console.log(`Cuenta cuántos números son mayores que 10 en un array:
Escribe un programa que utilice un bucle for para contar cuántos números en un array son mayores que 10.`);
var array = [0, 20, 1, 62, 9, 32, 6, 81];
var contMayor10 = 0;
for (let item of array) {
    if (item > 10) contMayor10++;
}
console.log(`Conteo de numeros mayores de 10: ${contMayor10}.`);



console.log(`Imprime los números del 1 al 100, pero solo los múltiplos de 3:
Escribe un programa que utilice un bucle for para imprimir solo los números entre 1 y 100 que sean múltiplos de 3.`);
for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0) {
        console.log(`Numero entre 1 a 100 multiplo de 3: ${i}.`);
    }
}



console.log(`Reversa los elementos de un array:
Escribe un programa que utilice un bucle for para imprimir los elementos de un array en orden inverso.`);
var array = [0, 20, 1, 62, 9, 32, 6, 81];
for (let i = array.length; i > 0; i--) {
    console.log(`Numero en orden inverso array: ${array[i]}.`);
}



console.log(`Imprime los primeros 10 números Fibonacci:
Escribe un programa que utilice un bucle for para imprimir los primeros 10 números de la secuencia de Fibonacci.`);
var ultNum = 0, countNum = 1;
for (let i = 1; i <= 10; i = i + 2) {
    const numCache = countNum;
    console.log(`Primeros 10 numeros Fibonacci: Posicion ${i} -> ${numCache}.`);
    ultNum = ultNum + countNum;
    console.log(`Primeros 10 numeros Fibonacci: Posicion ${i + 1} -> ${ultNum}.`);
    countNum = numCache + ultNum;
}


console.log(`Imprime las letras de una palabra:
Escribe un programa que utilice un bucle for para imprimir cada letra de una palabra (string) en una línea diferente.`);
var palabra = "Hola mundo";
for (let i = 1; i <= palabra.length; i++) {
    console.log(`Letra ${i}: ${palabra[i - 1]}`);
}


console.log(`Convierte todos los elementos de un array a mayúsculas:
Escribe un programa que utilice un bucle for para recorrer un array de strings y convertir cada elemento a mayúsculas.`);
var arrLetras = ['h', 'o', 'l', 'a', 'm', 'u', 'n', 'd', 'o'];
for (let i = 1; i <= arrLetras.length; i++) {
    console.log(`Letra ${i}: ${String(arrLetras[i - 1]).toUpperCase()}`);
}


console.log(`Crea un patrón de pirámide con asteriscos:
Escribe un programa que utilice un bucle for para crear una pirámide de asteriscos como la siguiente:
*
**
***
****
*****
------------
`);
for (let i = 1; i <= 5; i++) {
    var str = "";
    for (let e = 1; e <= i; e++) {
        str += '*';
    }
    console.log(str);
}


console.log(`Verifica si un array contiene un número específico:
Escribe un programa que utilice un bucle for para verificar si un array contiene un número específico. Si el número está presente, imprime "Encontrado"; de lo contrario, imprime "No encontrado".`);
const numBusq = 3;
const arrNums = [1, 2, 4, 5, 6, 7, 9, 2, 7, 3];
var found = false;
for (let num of arrNums) {
    if (num == numBusq) {
        console.log(`Encontrado`);
        found = true;
        break;
    }
}
if (!found) console.log(`No encontrado`);


console.log(`Imprime los elementos en posiciones impares de un array:
Escribe un programa que utilice un bucle for para imprimir los elementos que están en posiciones impares de un array.`);
const arrBusqImp = [1, 2, 4, 5, 6, 7, 9, 2, 7, 3];
for (let i = 1; i <= arrBusqImp.length; i++) {
    if ((i % 2) > 0) {
        console.log(arrBusqImp[i - 1]);
    }
}


console.log(`Calcula el promedio de un array de números:
Escribe un programa que utilice un bucle for para calcular el promedio de todos los números en un array.`);
const arrNum = [1, 2, 4, 5, 6, 7, 9, 2, 7, 3];
var countProm = 0;
for (let i = 1; i <= arrNum.length; i++) {
    countProm += arrNum[i - 1];
}
console.log(`Promedio Array: `, countProm / arrNum.length);


console.log(`Cuenta cuántos elementos en un array son strings:
Escribe un programa que utilice un bucle for para contar cuántos elementos en un array son de tipo string.`);
const arrStr = [1, "2", 4, 5, "6", "7", "9", 2, 7, "3"];
var countStr = 0;
for (let i = 1; i <= arrStr.length; i++) {
    if (typeof arrStr[i - 1] == 'string') {
        countStr++;
    }
}
console.log(`Conteo de string dentro de array: `, countStr);



console.log(`Concatena todos los elementos de un array en un solo string:
Escribe un programa que utilice un bucle for para concatenar todos los elementos de un array en un solo string, separado por comas.`);
const arrData = [1, "2", 4, 5, "6", "7", "9", 2, 7, "3"];
var result = "";
for (let i = 1; i <= arrData.length; i++) {
    if (i == 1) {
        result += arrData[i - 1];
    } else {
        result += `, ${arrData[i - 1]}`;
    }
}
console.log(`Array con datops concatenados: `, result);



console.log(`Crea un patrón de pirámide invertida con asteriscos:
Escribe un programa que utilice un bucle for para crear una pirámide invertida de asteriscos como la siguiente:

*****
****
***
**
*
------------`);
for (let i = 5; i >= 1; i--) {
    var str = "";
    for (let e = 1; e <= i; e++) {
        str += '*';
    }
    console.log(str);
}



console.log(`Convierte un array de strings a un array de números:
Escribe un programa que utilice un bucle for para convertir un array de strings que representan números (por ejemplo, ["1", "2", "3"]) en un array de números (por ejemplo, [1, 2, 3]).`);
const arrData2 = ["1", "2", "4", "5", "6", "7", "9", "2", "7", "3"];
var newArr = [];

for (let i = 1; i <= arrData2.length; i++) {
    newArr.push(Number(arrData2[i - 1]));
}
console.log("Arreglo anterior:", arrData2);
console.log("Arreglo nuevo:", newArr);



console.log(`Filtra los números mayores a 50 en un array:
Escribe un programa que utilice un bucle for para filtrar todos los números mayores a 50 de un array y los almacene en un nuevo array.`);
const arrData3 = ["18", "24", "42", "53", "64", "73", "92", "23", "74", "35"];
var newArr2 = [];

for (let i = 1; i <= arrData3.length; i++) {
    if (Number(arrData3[i - 1]) > 50) {
        newArr2.push(Number(arrData3[i - 1]));
    }
}
console.log("Arreglo anterior:", arrData3);
console.log("Arreglo nuevo con mayores de 50:", newArr2);



console.log(`Ordena un array de números de menor a mayor:
Escribe un programa que utilice un bucle for (sin utilizar métodos de ordenación integrados) para ordenar un array de números de menor a mayor.`);
const arrData4 = [18, 24, 42, 53, 64, 73, 92, 23, 74, 35];
var newArr3 = [];

for (let i = 0; i < arrData4.length; i++) {
    let foundNum = arrData4[i];
    let pos = 0;

    for (let e = 0; e < newArr3.length; e++) {
        if (foundNum > newArr3[e]) {
            pos = e + 1;
        } else {
            break;
        }
    }

    newArr3.splice(pos, 0, foundNum);
}

console.log("Arreglo anterior:", arrData4);
console.log("Arreglo ordenado:", newArr3);



console.log(`Imprime la matriz transpuesta de una matriz 2D:
Escribe un programa que utilice un bucle for para imprimir la matriz transpuesta de una matriz 2D (array de arrays).`);
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("Matriz:", matriz);
let resultMt = "";
for (let item of matriz) {
    resultMt = "";

    for (let det of item) {
        resultMt += `${det} `
    }

    console.log(resultMt);
}



console.log(`Verifica si un array es palíndromo:
Escribe un programa que utilice un bucle for para verificar si un array de números o letras es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).`);

var arrDataP = ['h', 'o', 'l', 'a', 2, 1, 1, 2, "a", "l", "o", "h"];
var strComp1 = "", strComp2 = "";
for (let i = 1; i <= arrDataP.length; i++) {
    strComp1 += (typeof arrDataP[i - 1] == 'string' ? 'S' : 'N') + arrDataP[i - 1];
}
for (let i = arrDataP.length; i >= 1; i--) {
    strComp2 += (typeof arrDataP[i - 1] == 'string' ? 'S' : 'N') + arrDataP[i - 1];
}

console.log(`Arreglo: `, arrDataP);
if(strComp1 == strComp2){
    console.log(`El array es un palindromo`);
}else{
    console.log(`El array no es palindromo`);
}



console.log(`Encuentra el segundo número más grande en un array:
Escribe un programa que utilice un bucle for para encontrar el segundo número más grande en un array de números.`);
var array = [0, 2, 1, 6, 9, 3, 7, 8];
var numMayor = array[0];
var numSegMayor = array[0];
for (let item of array) {
    if (item > numMayor) {
        numMayor = item;
    }

    if(item < numMayor){
        numSegMayor = item;
    }
}

console.log(`Segundo numero mayor del Array: ${numSegMayor}.`);