document.addEventListener('DOMContentLoaded', function() {
    const galleryImagesContainer = document.getElementById('gallery-images');
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions'); // Contêiner para sugestões
    const switchInputs = document.querySelectorAll('.switch-input');

    function fetchImagesData() {
        return images
            .map((image, index) => ({
                ...image,
                index: index
            }))
            .sort((a, b) => {
                const dateA = convertToDate(a.date);
                const dateB = convertToDate(b.date);

                if (dateA.getTime() !== dateB.getTime()) {
                    return dateB.getTime() - dateA.getTime();
                }

                return b.index - a.index;
            });
    }

    function getAuthorStyle(author) {
        switch(author) {
            case 'Orangine':
                return 'color: orange; text-shadow: 0px 0px 4px black;';
            case 'Jujuba':
                return 'color: rgb(169, 48, 255); text-shadow: 0px 0px 4px black;';
            default:
                return 'color: white;';
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
    
        // Após renderizar as imagens, atualizamos as cores dos círculos
        updateCircleColors(images);
    }
    
    function updateCircleColors(images) {
        const colorThief = new ColorThief();
        const lastImage = images[0]; // A primeira imagem no array é a mais recente
        if (lastImage) {
            const img = new Image();
            img.src = lastImage.src;
            img.crossOrigin = 'Anonymous'; // Importante para o Color Thief funcionar com imagens de outras origens
    
            img.addEventListener('load', function() {
                const palette = colorThief.getPalette(img, 3); // Pegamos as 3 cores mais dominantes
    
                // Aplica as cores dominantes aos círculos
                if (palette.length >= 3) {
                    document.querySelector('.circle-one').style.backgroundColor = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
                    document.querySelector('.circle-two').style.backgroundColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;
                    document.querySelector('.circle-three').style.backgroundColor = `rgb(${palette[2][0]}, ${palette[2][1]}, ${palette[2][2]})`;
                }
            });
        }
    }
    
    function updateGallery() {
        const images = fetchImagesData();
        const filteredImages = filterImages(images);
        renderGalleryImages(filteredImages);
    }
    
    // Chama a função updateGallery para inicializar
    updateGallery();
    

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

    // Modificação na parte onde as sugestões são exibidas
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        const searchButton = document.querySelector('.btn-search'); 
        if (searchTerm !== '') {
            searchButton.classList.add('active');
        } else {
            searchButton.classList.remove('active');
        }
        
        if (searchTerm === '') {
            updateGallery(); 
            suggestionsContainer.innerHTML = ''; 
            suggestionsContainer.style.display = 'none'; 
            return;
        }
        
        suggestionsContainer.innerHTML = ''; 
        const uniqueTitles = new Set(); 
        const uniqueAuthors = new Set(); 
        const lastWord = searchTerm.split(' ').pop(); 
    
        // Primeiro, verificamos os autores
        images.forEach(image => {
            const author = image.author.toLowerCase();
    
            // Verifica se o autor contém a última palavra digitada
            if (author.includes(lastWord) && !uniqueAuthors.has(author)) {
                uniqueAuthors.add(author);
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                const authorStyle = getAuthorStyle(image.author); 
                suggestionItem.innerHTML = `<i>Autor:</i> <span style="${authorStyle}">${image.author}</span>`;
                suggestionItem.addEventListener('click', function() {
                    searchInput.value = image.author; 
                    suggestionsContainer.innerHTML = ''; 
                    suggestionsContainer.style.display = 'none'; 
                    updateGallery(); 
                });
                suggestionsContainer.appendChild(suggestionItem);
            }
        });
    
        // Agora, verificamos os títulos
        images.forEach(image => {
            const title = image.title.toLowerCase();
    
            // Verifica se o título contém a última palavra digitada
            if (title.includes(lastWord) && !uniqueTitles.has(title)) {
                uniqueTitles.add(title);
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerHTML = `${image.title}`; // Sugestão de título
                suggestionItem.addEventListener('click', function() {
                    searchInput.value = image.title; 
                    suggestionsContainer.innerHTML = ''; 
                    suggestionsContainer.style.display = 'none'; 
                    updateGallery(); 
                });
                suggestionsContainer.appendChild(suggestionItem);
            }
        });
    
        // Exibe o container se houver sugestões
        suggestionsContainer.style.display = uniqueTitles.size || uniqueAuthors.size ? 'block' : 'none'; 
        updateGallery();
    });    

    
    switchInputs.forEach(input => {
        input.addEventListener('change', updateGallery);
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