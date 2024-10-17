document.addEventListener('DOMContentLoaded', function() {
    const galleryImagesContainer = document.getElementById('gallery-images');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.btn-search');
    const suggestionsContainer = document.getElementById('suggestions');
    const switchInputs = document.querySelectorAll('.switch-input');
    const colorThief = new ColorThief();

    function convertToDate(dateString) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    function fetchImagesData() {
        const sortedImages = images
            .map((image, index) => ({ ...image, index }))
            .sort((a, b) => {
                const dateA = convertToDate(a.date);
                const dateB = convertToDate(b.date);
                return dateB - dateA || b.index - a.index;
            });
    
        // Atualiza o fundo com a última imagem
        if (sortedImages.length > 0) {
            const lastImage = sortedImages[0].src; // Pega a URL da última imagem
            document.getElementById('background-div').style.backgroundImage = `url('${lastImage}')`;
        }
    
        return sortedImages;
    }

    function getAuthorStyle(author) {
        switch(author) {
            case 'Orangine': return 'color: orange; text-shadow: 0px 0px 4px black;';
            case 'Jujuba': return 'color: rgb(169, 48, 255); text-shadow: 0px 0px 4px black;';
            default: return 'color: white; text-shadow: 0px 0px 4px black;';
        }
    }

    function calculateBrightness(rgb) {
        return Math.sqrt(0.299 * (rgb[0] ** 2) + 0.587 * (rgb[1] ** 2) + 0.114 * (rgb[2] ** 2));
    }

    function rgbToHex(r, g, b) {
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    let lastClickedImage = null; // Variável para armazenar a última imagem clicada

function updateCircleColors(image) {
    if (image) {
        const img = new Image();
        img.src = image.src;
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            const palette = colorThief.getPalette(img, 3);
            document.querySelector('.circle-one').style.backgroundColor = `rgb(${palette[0].join(',')})`;
            document.querySelector('.circle-two').style.backgroundColor = `rgb(${palette[1].join(',')})`;
            document.querySelector('.circle-three').style.backgroundColor = `rgb(${palette[2].join(',')})`;
        };
    }
}

function renderGalleryImages(images) {
    galleryImagesContainer.innerHTML = '';
    let imagesLoaded = 0;

    images.forEach(image => {
        const anchor = document.createElement('a');
        anchor.href = image.src;
        anchor.classList.add('swipebox');

        const img = document.createElement('img');
        img.src = image.thumb;
        img.alt = image.title;
        img.crossOrigin = 'Anonymous';

        img.onload = function() {
            const palette = colorThief.getPalette(img, 5);
            const brightestColor = palette.reduce((prev, curr) => {
                return calculateBrightness(curr) > calculateBrightness(prev) ? curr : prev;
            });
            const hexColor = rgbToHex(...brightestColor);
            anchor.setAttribute('data-dominant-color', hexColor);
            anchor.style.borderColor = hexColor;

            imagesLoaded++;
            if (imagesLoaded === images.length) applyJustifiedGallery();
        };

        // Evento de clique na imagem para alterar o fundo e as cores dos círculos
        img.onclick = function() {
            // Atualiza o fundo do div com a imagem clicada
            document.getElementById('background-div').style.backgroundImage = `url('${image.src}')`;
            lastClickedImage = image; // Atualiza a última imagem clicada
            updateCircleColors(image); // Atualiza as cores dos círculos
        };

        const captionDiv = document.createElement('div');
        captionDiv.classList.add('jg-caption');
        captionDiv.innerHTML = `<div class="description">${image.title}<br>Por <span style="${getAuthorStyle(image.author)}">${image.author}</span></div>`;
        
        anchor.appendChild(img);
        anchor.appendChild(captionDiv);
        galleryImagesContainer.appendChild(anchor);
    });

    $('.swipebox').swipebox();
    
    // Define a imagem de fundo como a última imagem ao carregar a galeria
    if (images.length > 0) {
        const initialImage = images[0];
        document.getElementById('background-div').style.backgroundImage = `url('${initialImage.src}')`;
        updateCircleColors(initialImage); // Atualiza as cores dos círculos com a primeira imagem
    }
}

    function applyJustifiedGallery() {
        $('.gallery-images').justifiedGallery({
            rowHeight: 250,
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

    function filterImages(images) {
        const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
        const searchTerm = searchInput.value.toLowerCase();
        return images.filter(image => {
            const matchesFilter = selectedFilter === 'I' || image.type.toLowerCase() === selectedFilter.toLowerCase();
            const matchesSearch = image.title.toLowerCase().includes(searchTerm) || image.author.toLowerCase().includes(searchTerm);
            return matchesFilter && matchesSearch;
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Alterna entre lupa e "X"
        if (searchTerm !== '') {
            searchButton.innerHTML = '<i class="fas fa-times"></i>';
            searchButton.classList.add('clear-active');
        } else {
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
            searchButton.classList.remove('clear-active');
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }

        updateSuggestions(searchTerm);
    });

    // Função para limpar o campo de pesquisa ao clicar no "X"
    searchButton.addEventListener('click', function() {
        if (searchButton.classList.contains('clear-active')) {
            searchInput.value = '';
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
            searchButton.classList.remove('clear-active');
            updateGallery();
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });

    function updateSuggestions(searchTerm) {
        if (searchTerm === '') {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            return;
        }

        // Lógica de sugestões
        suggestionsContainer.innerHTML = '';
        const uniqueTitles = new Set();
        const uniqueAuthors = new Set();
        const lastWord = searchTerm.split(' ').pop();

        images.forEach(image => {
            if (image.author.toLowerCase().includes(lastWord) && !uniqueAuthors.has(image.author)) {
                uniqueAuthors.add(image.author);
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerHTML = `<i>Autor:</i> <span style="${getAuthorStyle(image.author)}">${image.author}</span>`;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = image.author;
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';
                    updateGallery();
                });
                suggestionsContainer.appendChild(suggestionItem);
            }
        });

        images.forEach(image => {
            if (image.title.toLowerCase().includes(lastWord) && !uniqueTitles.has(image.title)) {
                uniqueTitles.add(image.title);
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerHTML = `${image.title}`;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = image.title;
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';
                    updateGallery();
                });
                suggestionsContainer.appendChild(suggestionItem);
            }
        });

        suggestionsContainer.style.display = uniqueTitles.size || uniqueAuthors.size ? 'block' : 'none';
    }

    function updateGallery() {
        const images = fetchImagesData();
        const filteredImages = filterImages(images);
        renderGalleryImages(filteredImages);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchButton = document.querySelector('.btn-search'); 
        searchButton.classList.toggle('active', searchTerm !== '');

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

        images.forEach(image => {
            if (image.author.toLowerCase().includes(lastWord) && !uniqueAuthors.has(image.author)) {
                uniqueAuthors.add(image.author);
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerHTML = `<i>Autor:</i> <span style="${getAuthorStyle(image.author)}">${image.author}</span>`;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = image.author;
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';
                    updateGallery();
                });
                suggestionsContainer.appendChild(suggestionItem);
            }
        });

        images.forEach(image => {
            if (image.title.toLowerCase().includes(lastWord) && !uniqueTitles.has(image.title)) {
                uniqueTitles.add(image.title);
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerHTML = `${image.title}`;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = image.title;
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';
                    updateGallery();
                });
                suggestionsContainer.appendChild(suggestionItem);
            }
        });

        suggestionsContainer.style.display = uniqueTitles.size || uniqueAuthors.size ? 'block' : 'none';
    });

    switchInputs.forEach(input => input.addEventListener('change', updateGallery));

    updateGallery();

    // Loading screen
    document.body.classList.add('loading');
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.body.classList.remove('loading');
            document.getElementById('content').style.display = 'block';
        }, 1000);
    }, 4000);

    lightbox.option({ 'albumLabel': "" });
});