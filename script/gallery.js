// URL do arquivo JSON com as imagens
const jsonUrl = './gallery.json'; // Atualize para o caminho correto do seu arquivo JSON

// Função para carregar as imagens do gallery.json
async function loadImagesFromJson() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    const images = data.images;
    const gallery = $('#mygallery');

    // Inverte a ordem das imagens
    images.reverse();

    images.forEach((image, index) => {
      const imgElement = `<a href="${image.link}" title="${image.game}"><img src="${image.link}" alt="${image.game}" /></a>`;
      gallery.append(imgElement);

      // Adiciona o URL da imagem à lista
      imageUrls.push(image.link);

      // Adiciona um evento de clique para abrir o modal com a imagem clicada
      gallery.on("click", "img", function() {
        const src = $(this).attr("src");
        const alt = $(this).attr("alt");
        const description = $(this).closest("a").attr("title");
        openModal(src, alt, description);
      });

      // Extrai e aplica as cores vibrantes à imagem
      extractAndApplyColors(image.link, gallery);
    });

    // Inicializa a galeria Justified Gallery
    gallery.justifiedGallery({
      rowHeight: 300, // Ajuste este valor conforme necessário
      lastRow: 'nojustify', // Ajuste como preferir
      margins: 5 // Ajuste conforme necessário
    });

    // Define o fundo principal como a última imagem do grid após carregar as imagens
    const lastImage = images[0];
    document.getElementById("main-background").style.backgroundImage = `url('${lastImage.link}')`;
  } catch (error) {
    console.error("Erro ao carregar imagens do JSON:", error);
  }
}

// Função para extrair e aplicar as cores vibrantes a uma imagem
function extractAndApplyColors(imageUrl, galleryElement) {
  Vibrant.from(imageUrl).getPalette((err, palette) => {
    if (err) {
      console.error("Erro ao extrair cores vibrantes:", err);
      return;
    }

    // Extraia as cores DarkVibrant e DarkMuted
    const vibrantColor = palette.Vibrant.getHex();
    const darkMutedColor = palette.DarkMuted.getHex();

    // Crie um gradiente linear diagonal para a borda
    galleryElement.find('a').css('border-image', `linear-gradient(135deg, ${vibrantColor}, rgba(255, 255, 255, 0.1))`);
    galleryElement.find('a').css('border-image-slice', 1);
  });
}

// Função para abrir o modal com a imagem clicada
function openModal(imgSrc, imgAlt, imgDescription) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = imgSrc;
  modalImg.alt = imgAlt;
  captionText.innerHTML = `${imgAlt}<br>Por ${imgDescription}`;

  // Atualiza o fundo principal com o URL da última imagem vista no modal
  document.getElementById("main-background").style.backgroundImage = `url('${imgSrc}')`;

  // Adiciona eventos de teclado para navegar entre as imagens
  document.addEventListener("keydown", handleKeyboardNavigation);
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
  // Remove os eventos de teclado ao fechar o modal
  document.removeEventListener("keydown", handleKeyboardNavigation);
}

// Função para lidar com a navegação entre as imagens usando as setas do teclado
function handleKeyboardNavigation(event) {
  if (event.key === "ArrowLeft") {
    // Navega para a imagem anterior
    currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
  } else if (event.key === "ArrowRight") {
    // Navega para a próxima imagem
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  } else if (event.key === "Escape") {
    // Fecha o modal quando a tecla ESC é pressionada
    closeModal();
    return;
  }

  // Atualiza o modal com a nova imagem e descrição
  const imgSrc = imageUrls[currentImageIndex];
  const imgAlt = document.getElementById("modal-img").alt;
  const imgDescription = document.querySelectorAll('.image-gallery a')[currentImageIndex].getAttribute('title');

  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");

  modalImg.src = imgSrc;
  modalImg.alt = imgAlt;
  captionText.innerHTML = imgDescription;

  // Atualiza o fundo principal com o URL da imagem atual no modal
  document.getElementById("main-background").style.backgroundImage = `url('${imgSrc}')`;
}

// Função para mostrar todas as imagens
function showAll() {
  $('#mygallery').justifiedGallery('refresh');
  setActiveNavItem('all');
}

// Função para mostrar apenas imagens em paisagem
function showLandscape() {
  // A Justified Gallery não suporta filtros diretamente, então você pode precisar fazer isso manualmente ou usar CSS
  // Filtre as imagens visíveis
  $('#mygallery').justifiedGallery('refresh');
  setActiveNavItem('landscape');
}

// Função para mostrar apenas imagens em retrato
function showPortrait() {
  // A Justified Gallery não suporta filtros diretamente, então você pode precisar fazer isso manualmente ou usar CSS
  // Filtre as imagens visíveis
  $('#mygallery').justifiedGallery('refresh');
  setActiveNavItem('portrait');
}

// Função para definir o item da barra de navegação como ativo
function setActiveNavItem(navItem) {
  const navItems = document.querySelectorAll('.navbar a');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-nav') === navItem) {
      item.classList.add('active');
    }
  });
  searchImages(); // Chama a função de pesquisa após definir o filtro ativo
}

// Função para pesquisar imagens com base no texto da descrição
function searchImages() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const images = document.querySelectorAll('#mygallery a');
  images.forEach(img => {
    const description = img.querySelector('img').alt.toUpperCase();
    let shouldBeDisplayed = description.includes(filter);
    img.style.display = shouldBeDisplayed ? 'block' : 'none';
  });
}

// Função para atualizar a exibição das imagens quando houver uma mudança na barra de pesquisa
document.getElementById("searchInput").addEventListener("input", searchImages);

// Função para exibir o conteúdo completo ao iniciar a página
window.onload = showAll;

// Chama a função para carregar as imagens do gallery.json
loadImagesFromJson();

// Função para alternar a visualização do grid
function setGridView(view) {
  const gallery = document.querySelector('.image-gallery');
  const toggleIcons = document.querySelectorAll('.view-toggle-icons i');

  if (view === 'square') {
    gallery.classList.remove('default-view');
    gallery.classList.add('square-view');
  } else {
    gallery.classList.remove('square-view');
    gallery.classList.add('default-view');
  }

  // Atualiza o ícone ativo
  toggleIcons.forEach(icon => {
    icon.classList.remove('active');
    if (icon.getAttribute('data-view') === view) {
      icon.classList.add('active');
    }
  });
}

// Defina a visualização padrão ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  setGridView('default');
});

// Adiciona eventos de clique para os ícones de alternância de visualização
document.querySelectorAll('.view-toggle-icons i').forEach(icon => {
  icon.addEventListener('click', function() {
    const view = this.getAttribute('data-view');
    setGridView(view);
  });
});

// Adiciona evento de clique para o logo
document.getElementById('logo').addEventListener('click', function() {
  window.location.href = 'https://orangine.github.io'; // Substitua pelo URL desejado
});