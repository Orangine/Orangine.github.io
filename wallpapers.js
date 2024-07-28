document.addEventListener('DOMContentLoaded', () => {
    const wallpaperContainer = document.getElementById('wallpaper-container');
    const wallpaper = document.getElementById('wallpaper');
    const gameSpan = document.getElementById('game');
    const authorSpan = document.getElementById('author');

    // Função para carregar o JSON e configurar a troca de wallpapers
    const loadWallpapers = async () => {
        try {
            const response = await fetch('gallery.json');
            const data = await response.json();
            const images = data.images;

            const setRandomWallpaper = () => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                wallpaper.src = randomImage.link;
                gameSpan.textContent = randomImage.game;
                authorSpan.textContent = randomImage.author;
            };

            // Set initial wallpaper
            setRandomWallpaper();

            // Change wallpaper every 30 minutes (1800000 milliseconds)
            setInterval(setRandomWallpaper, 1800000);
        } catch (error) {
            console.error('Error loading wallpapers:', error);
        }
    };

    // Carregar wallpapers
    loadWallpapers();
});
