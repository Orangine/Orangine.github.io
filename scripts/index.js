document.addEventListener('DOMContentLoaded', function() {
    const galleryImagesContainer = document.getElementById('gallery-images');
    const searchInput = document.getElementById('search-input');
    const switchInputs = document.querySelectorAll('.switch-input');

    // Não é mais necessário buscar os dados de uma planilha Google Sheets, pois estamos usando o arquivo images.js
    function fetchImagesData() {
        return images // Usamos diretamente o array images do arquivo images.js
            .map((image, index) => ({
                ...image, // Mantém as propriedades da imagem
                index: index // Adiciona o índice para manter a ordem de adição
            }))
            .sort((a, b) => {
                const dateA = convertToDate(a.date);
                const dateB = convertToDate(b.date);

                if (dateA.getTime() !== dateB.getTime()) {
                    return dateB.getTime() - dateA.getTime(); // Ordena por data decrescente
                }

                return b.index - a.index; // Ordena pela ordem de adição se as datas forem iguais
            });
    }

    function getAuthorStyle(author) {
        switch(author) {
            case 'Orangine':
                return 'color: orange;';
            case 'Jujuba':
                return 'color: rgb(169, 48, 255);';
            default:
                return 'color: white;'; // Estilo padrão
        }
    }

    function renderGalleryImages(images) {
        galleryImagesContainer.innerHTML = '';
        const colorThief = new ColorThief();
        let imagesLoaded = 0;

        images.forEach((image) => {
            const anchor = document.createElement('a');
            anchor.href = image.src;
            anchor.setAttribute('data-lightbox', 'gallery');

            const img = document.createElement('img');
            img.src = image.thumb;
            img.alt = image.title;
            img.crossOrigin = 'Anonymous';

            img.addEventListener('load', function() {
                const palette = colorThief.getPalette(img, 5);
                const calculateBrightness = (rgb) => Math.sqrt(
                    0.299 * (rgb[0] * rgb[0]) +
                    0.587 * (rgb[1] * rgb[1]) +
                    0.114 * (rgb[2] * rgb[2])
                );

                let brightestColor = palette[0];
                let maxBrightness = calculateBrightness(palette[0]);

                for (let i = 1; i < palette.length; i++) {
                    const brightness = calculateBrightness(palette[i]);
                    if (brightness > maxBrightness) {
                        maxBrightness = brightness;
                        brightestColor = palette[i];
                    }
                }

                const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');

                const hexColor = rgbToHex(brightestColor[0], brightestColor[1], brightestColor[2]);
                anchor.setAttribute('data-dominant-color', hexColor);
                anchor.style.borderColor = hexColor;

                const authorStyle = getAuthorStyle(image.author);
                anchor.setAttribute('data-title', `${image.title}<br>Por <span style="${authorStyle}">${image.author}</span>`);

                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    applyJustifiedGallery();
                }
            });

            anchor.addEventListener('click', function(event) {
                event.preventDefault();
                lightbox.start($(this)[0]);
            });

            const captionDiv = document.createElement('div');
            captionDiv.classList.add('jg-caption');

            const authorStyle = getAuthorStyle(image.author);
            captionDiv.innerHTML = `<div class="description">${image.title}<br>Por <span style="${authorStyle}">${image.author}</span></div>`;

            anchor.appendChild(img);
            anchor.appendChild(captionDiv);
            galleryImagesContainer.appendChild(anchor);
        });
    }

    function applyJustifiedGallery() {
        $('.gallery-images').justifiedGallery({
            rowHeight: 275,
            margins: 10,
            lastRow: 'nojustify',
            captions: true
        });

        $('.justified-gallery > a').hover(function() {
            const dominantColor = $(this).data('dominant-color');
            if (dominantColor) {
                const gradient = `linear-gradient(135deg, ${dominantColor}, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05), ${dominantColor})`;
                $(this).css('border-image', gradient);
                $(this).css('border-image-slice', 1);
            }
        }, function() {
            $(this).css('border-image', '');
        });
    }

    function convertToDate(dateString) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    function filterImages(images) {
        const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
        const searchTerm = searchInput.value.toLowerCase();

        return images.filter(image => {
            const matchesFilter = selectedFilter === 'I' || image.type.toLowerCase() === selectedFilter.toLowerCase();
            const matchesSearch = image.title.toLowerCase().includes(searchTerm) || image.author.toLowerCase().includes(searchTerm);
            return matchesFilter && matchesSearch;
        });
    }

    function updateGallery() {
        const images = fetchImagesData();
        const filteredImages = filterImages(images);
        renderGalleryImages(filteredImages);
    }

    switchInputs.forEach(input => {
        input.addEventListener('change', updateGallery);
    });

    searchInput.addEventListener('input', function() {
        // Adiciona ou remove a classe 'active' ao botão de pesquisa
        if (searchInput.value.trim() !== "") {
            document.querySelector('.btn-search').classList.add('active');
        } else {
            document.querySelector('.btn-search').classList.remove('active');
        }
        updateGallery(); // Certifique-se de que a função updateGallery seja chamada para filtrar as imagens
    });
    

    // Inicializa a exibição da galeria
    updateGallery();

    lightbox.option({
        'albumLabel': ""
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loading');
    
    // Função para obter uma imagem aleatória
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex].src; // Supondo que o objeto da imagem tenha uma propriedade 'src'
    }

    // Define a imagem aleatória na tela de carregamento
    const loadingImageDiv = document.getElementById('loading-image');
    const randomImage = getRandomImage();
    loadingImageDiv.style.backgroundImage = `url('${randomImage}')`;
    loadingImageDiv.style.backgroundSize = 'cover';
    loadingImageDiv.style.backgroundPosition = 'center';

    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
            document.body.classList.remove('loading');
            document.getElementById('content').style.display = 'block';
        }, 1000);
    }, 4000);
});
