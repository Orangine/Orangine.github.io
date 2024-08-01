import { Bokeh1Background } from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.2/build/backgrounds/bokeh1.cdn.min.js';

const bokeh1Background = Bokeh1Background(document.getElementById('webgl-canvas'));
bokeh1Background.loadMap('https://cdn.jsdelivr.net/npm/threejs-components@0.0.2/build/assets/bokeh-particles2.png');
bokeh1Background.setColors([0x6d4862, 0xfd826c, 0x22ccc1]);

document.body.addEventListener('click', () => {
    bokeh1Background.setColors([
        0xffffff * Math.random(),
        0xffffff * Math.random(),
        0xffffff * Math.random()
    ]);
});

function fadeOut() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    loadingScreen.classList.add('fade-out');
    
    // Adicione uma classe oculta à tela de carregamento após o fade-out
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in'); // Adicione a classe fade-in
    }, 1000); // O tempo aqui deve corresponder à duração da animação de fade-out
}

// Chame a função fadeOut após um atraso
setTimeout(fadeOut, 4000);
