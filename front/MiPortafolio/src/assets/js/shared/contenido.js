function cargarContenido(idDiv, url) {
    fetch(url).then(response => {
        if (!response.ok) throw new Error('Error al cargar el contenido');
        return response.text();
    }).then(html => {
        const container = document.getElementById(idDiv);
        container.innerHTML = html;

        // Crear un DOMParser para analizar el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const scripts = doc.querySelectorAll('script');

        // Cargar los scripts del HTML cargado
        scripts.forEach(script => {
            if (script.src) {
                // Si el script tiene un src, crear un nuevo script con esa src
                const newScript = document.createElement('script');
                newScript.src = script.src;
                //newScript.onload = () => console.log(`${script.src} cargado correctamente`);
                newScript.onerror = () => console.error(`Error al cargar ${script.src}`);
                document.body.appendChild(newScript);
            } else if (script.textContent) {
                // Si el script tiene contenido en línea, evaluarlo
                const inlineScript = document.createElement('script');
                inlineScript.textContent = script.textContent;
                document.body.appendChild(inlineScript);
            }
        });
    }).catch(error => console.error('Error:', error));
}