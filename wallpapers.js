document.addEventListener('DOMContentLoaded', () => {
    const wallpaperContainer = document.getElementById('wallpaper-container');
    const wallpaper = document.getElementById('wallpaper');
    const gameSpan = document.getElementById('game');
    const authorSpan = document.getElementById('author');
    const menu = document.getElementById('menu');
    const nextBtn = document.getElementById('next-btn');
    const viewBtn = document.getElementById('view-btn');
    const menuToggle = document.getElementById('menu-toggle');

    let images = [];
    let currentImageIndex = 0;

    const loadWallpapers = async () => {
        try {
            const response = await fetch('gallery.json');
            const data = await response.json();
            images = data.images;

            const setWallpaper = (index) => {
                const image = images[index];
                wallpaper.src = image.link;
                gameSpan.textContent = image.game;
                authorSpan.textContent = image.author;
            };

            const setRandomWallpaper = () => {
                currentImageIndex = Math.floor(Math.random() * images.length);
                setWallpaper(currentImageIndex);
            };

            setRandomWallpaper();

            setInterval(() => {
                setRandomWallpaper();
            }, 1800000);

            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                setWallpaper(currentImageIndex);
            });

            viewBtn.addEventListener('click', () => {
                window.open(images[currentImageIndex].link, '_blank');
            });
        } catch (error) {
            console.error('Error loading wallpapers:', error);
        }
    };

    const toggleMenu = () => {
        menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
    };

    loadWallpapers();

    menuToggle.addEventListener('click', toggleMenu);
});
