let posicionActual = 0;

function moverCarrusel(direccion) {
    const carrusel = document.querySelector('.carrusel');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const totalTarjetas = tarjetas.length;

    posicionActual += direccion;

    if (posicionActual < 0) {
        posicionActual = totalTarjetas - 1;
    } else if (posicionActual >= (totalTarjetas - 1)) {
        posicionActual = 0;
    }

    carrusel.style.transform = `translateX(${(-posicionActual * 320) + 265}px)`;
}