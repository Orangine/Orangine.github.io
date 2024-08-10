$(document).ready(function() {
    // Função para criar o HTML para cada item de imagem
    function createImageItem(image) {
        return `
            <div class="wallpaper-item">
                <a href="${image.src}" target="_blank"> <!-- Adiciona um link ao redor da imagem -->
                    <img src="${image.thumb}" alt="${image.title}" class="thumbnail" data-full="${image.src}">
                </a>
                <div class="download-icon">
                    <a href="${image.src}" target="_blank" download="${image.title.replace(/\s+/g, '-')}.jpg">
                        <i class="fa-solid fa-download"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // Filtra as imagens onde o wpp é "sim"
    const filteredImages = images.filter(image => image.wpp === "sim");

    // Adiciona os itens da galeria ao contêiner
    const galleryHtml = filteredImages.map(createImageItem).join('');
    $('#gallery').html(galleryHtml);

    // Inicializa o plugin justifiedGallery
    $('.justified-gallery').justifiedGallery({
        rowHeight: 150, 
        margins: 5, 
        lastRow: 'nojustify'
    });
});