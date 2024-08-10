document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.filter-button');
    const contentSections = document.querySelectorAll('.content-section');
    const sideMenu = document.querySelector('.side-menu');
    const toggleMenuButton = document.querySelector('.toggle-menu');
    const galleryImagesContainer = document.getElementById('gallery-images');
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const filterPer = document.getElementById('filter-per');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            contentSections.forEach(section => {
                section.classList.remove('show');
                section.style.zIndex = '0';
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.zIndex = '1';
                targetSection.classList.add('show');

                if (targetId === 'gallery-content') {
                    filterImages();
                }
            }
        });
    });

    function renderGalleryImages(filteredImages) {
        galleryImagesContainer.innerHTML = '';

        const colorThief = new ColorThief();

        filteredImages.forEach(image => {
            const anchor = document.createElement('a');
            anchor.href = image.src;
            anchor.setAttribute('data-lightbox', 'gallery');
            anchor.setAttribute('data-title', `${image.title}<br>Por: <span style="color:white">${image.author}</span>`);
            
            const img = document.createElement('img');
            img.src = image.thumb;
            img.alt = image.title;
            img.crossOrigin = 'Anonymous';

            img.addEventListener('load', function() {
                const palette = colorThief.getPalette(img, 5);  // Obtém as 5 cores mais dominantes
            
                // Função para calcular o brilho de uma cor RGB
                const calculateBrightness = (rgb) => {
                    return Math.sqrt(
                        0.299 * (rgb[0] * rgb[0]) +
                        0.587 * (rgb[1] * rgb[1]) +
                        0.114 * (rgb[2] * rgb[2])
                    );
                };
            
                // Encontra a cor mais brilhante na paleta
                let brightestColor = palette[0];
                let maxBrightness = calculateBrightness(palette[0]);
            
                for (let i = 1; i < palette.length; i++) {
                    const brightness = calculateBrightness(palette[i]);
                    if (brightness > maxBrightness) {
                        maxBrightness = brightness;
                        brightestColor = palette[i];
                    }
                }
            
                // Converte a cor mais brilhante para o formato hex
                const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
            
                const hexColor = rgbToHex(brightestColor[0], brightestColor[1], brightestColor[2]);
            
                // Aplica a cor mais brilhante à borda do link
                anchor.setAttribute('data-dominant-color', hexColor);
                anchor.style.borderColor = hexColor;
            });            

            const captionDiv = document.createElement('div');
            captionDiv.classList.add('jg-caption');
            captionDiv.innerHTML = `<div class="description">${image.title}<br>Por <span style="color:white">${image.author}</span></div>`;
            
            anchor.appendChild(img);
            anchor.appendChild(captionDiv);
            galleryImagesContainer.appendChild(anchor);
        });

        // Reaplica o Justified Gallery após renderizar novas imagens
        $('.gallery-images').justifiedGallery({
            rowHeight: 275,
            margins: 10,
            lastRow: 'nojustify',
            captions: true
        });

        // Aplica a cor da borda no hover usando o atributo de dados
        $('.justified-gallery > a').hover(function() {
            const dominantColor = $(this).data('dominant-color');
            if (dominantColor) {
                const gradient = `linear-gradient(135deg, ${dominantColor}, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05), ${dominantColor})`;
                $(this).css('border-image', gradient);
                $(this).css('border-image-slice', 1);
            }
        }, function() {
            // Remove o gradiente ao sair do hover
            $(this).css('border-image', '');
        });
    }

    function convertToDate(dateString) {
        // Espera o formato 'DD-MM-AAAA'
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }
    
    function filterImages() {
        const activeFilter = document.querySelector('.gallery-filter.active')?.innerText.toLowerCase() || 'tudo';
        const sortOrder = filterPer.value || 'decrescente';
    
        let filteredImages = images.filter(image => {
            if (activeFilter === 'tudo') return true;
            return image.type === activeFilter;
        });
    
        filteredImages.sort((a, b) => {
            const dateA = convertToDate(a.date);
            const dateB = convertToDate(b.date);
            return sortOrder === 'crescente' ? dateA - dateB : dateB - dateA;
        });
    
        renderGalleryImages(filteredImages);
    }    

    galleryFilters.forEach(filterButton => {
        filterButton.addEventListener('click', function() {
            galleryFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterImages();
        });
    });

    filterPer.addEventListener('change', filterImages);

    // Inicializa a galeria com todos os filtros padrão ao carregar a página
    filterImages();

    toggleMenuButton.addEventListener('click', function() {
        const isCompact = sideMenu.classList.toggle('compact');
        toggleMenuButton.setAttribute('title', isCompact ? 'Mostrar Menu' : 'Esconder Menu');
        toggleMenuButton.querySelector('i').classList.toggle('fa-chevron-left', !isCompact);
        toggleMenuButton.querySelector('i').classList.toggle('fa-chevron-right', isCompact);
    });

    // Reaplica o Justified Gallery para a galeria inicialmente visível
    $('.gallery-images').justifiedGallery({
        rowHeight: 275,
        margins: 10,
        lastRow: 'nojustify',
        captions: true
    });

    lightbox.option({ 
        'albumLabel': ""
    });
});
