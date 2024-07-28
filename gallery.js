// URL do arquivo JSON com as imagens
const jsonUrl = 'gallery.json'; // Atualize para o caminho correto do seu arquivo JSON

// Variável para armazenar o URL da última imagem vista no modal
let lastModalImageUrl = "";

// Índice da imagem atual no modal
let currentImageIndex = 0;

// Lista de URLs das imagens
let imageUrls = [];

document.addEventListener("DOMContentLoaded", function() {
  async function loadImagesFromJson() {
    try {
      const response = await fetch(jsonUrl);
      const data = await response.json();
      const images = data.images;
      const gallery = document.getElementById("imgur-album");

      images.reverse();

      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        const li = document.createElement("li");
        const img = document.createElement("img");

        // Cria a miniatura usando o Canvas
        createThumbnail(image.link, img);

        // Cria o elemento de descrição e o adiciona à lista
        const description = document.createElement("div");
        description.classList.add("image-description");
        description.innerHTML = `<div>${image.game}</div><div>Por ${image.author}</div>`;
        li.appendChild(img);
        li.appendChild(description);

        gallery.appendChild(li);

        // Adiciona o URL da imagem à lista
        imageUrls.push(image.link);

        // Adiciona um evento de clique para abrir o modal com a imagem clicada
        img.addEventListener("click", function() {
          currentImageIndex = index;
          openModal(image.link, image.game, image.author);
        });

        // Extrai e aplica as cores vibrantes à imagem
        extractAndApplyColors(image.link, li);
      }

      // Define o fundo principal como a última imagem do grid após carregar as imagens
      const lastImage = images[0];
      document.getElementById("main-background").style.backgroundImage = `url('${lastImage.link}')`;
    } catch (error) {
      console.error("Erro ao carregar imagens do JSON:", error);
    }
  }

  // Função para criar uma miniatura usando o Canvas
  function createThumbnail(src, imgElement) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "Anonymous"; // Adiciona esta linha para evitar problemas de CORS
    image.src = src;
    
    image.onload = function() {
      console.log(`Image loaded: ${src}`);
      const maxDimension = 150; // Define o tamanho máximo da miniatura
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxDimension) {
          height *= maxDimension / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width *= maxDimension / height;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);

      // Define o src da imagem do elemento img para a miniatura
      imgElement.src = canvas.toDataURL();
      console.log(`Thumbnail created for: ${src}`);
    };

    image.onerror = function() {
      console.error(`Failed to load image: ${src}`);
    };
  }

  loadImagesFromJson();
});

// Função para extrair e aplicar as cores vibrantes a uma imagem
function extractAndApplyColors(imageUrl, listItem) {
  Vibrant.from(imageUrl).getPalette((err, palette) => {
    if (err) {
      console.error("Erro ao extrair cores vibrantes:", err);
      return;
    }

    // Extraia as cores Vibrant e DarkMuted
    const vibrantColor = palette.Vibrant.getHex();
    const darkMutedColor = palette.DarkMuted.getHex();

    // Crie um gradiente linear diagonal para a borda
    listItem.style.borderImage = `linear-gradient(135deg, ${vibrantColor}, rgba(255, 255, 255, 0.1))`;
    listItem.style.borderImageSlice = 1;
  });
}

// Função para verificar se a imagem é em retrato
function isPortrait(image) {
  return image.width < image.height;
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

  // Atualiza a variável global com o URL da última imagem vista no modal
  lastModalImageUrl = imgSrc;

  // Adiciona eventos de teclado para navegar entre as imagens
  document.addEventListener("keydown", handleKeyboardNavigation);
}

// Função para fechar o modal quando se clica fora da imagem
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    closeModal();
  }
};

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
  const imgDescription = document.querySelectorAll('.image-gallery li')[currentImageIndex].querySelector('.image-description').innerHTML;

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
  const images = document.querySelectorAll('.image-gallery li');
  images.forEach(img => img.style.display = 'flex');
  setActiveNavItem('all');
}

// Função para mostrar apenas imagens em paisagem
function showLandscape() {
  const images = document.querySelectorAll('.image-gallery li');
  images.forEach(img => {
    const imgElement = img.querySelector('img');
    if (imgElement && imgElement.naturalWidth > imgElement.naturalHeight) {
      img.style.display = 'flex';
    } else {
      img.style.display = 'none';
    }
  });
  setActiveNavItem('landscape');
}

// Função para mostrar apenas imagens em retrato
function showPortrait() {
  const images = document.querySelectorAll('.image-gallery li');
  images.forEach(img => {
    const imgElement = img.querySelector('img');
    if (imgElement && imgElement.naturalWidth < imgElement.naturalHeight) {
      img.style.display = 'flex';
    } else {
      img.style.display = 'none';
    }
  });
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
  const images = document.querySelectorAll('.image-gallery li');
  images.forEach(img => {
    const description = img.querySelector('.image-description').textContent.toUpperCase();
    let shouldBeDisplayed = true; // Assume que a imagem deve ser exibida por padrão

    // Verifica se a descrição da imagem contém o filtro de pesquisa
    if (!description.includes(filter)) {
      shouldBeDisplayed = false;
    }

    // Verifica se há um filtro ativo (paisagem ou retrato)
    const activeNavItem = document.querySelector('.navbar a.active')?.getAttribute('data-nav');
    if (activeNavItem) {
      const imgElement = img.querySelector('img');
      if (activeNavItem === 'landscape' && imgElement.naturalWidth < imgElement.naturalHeight) {
        shouldBeDisplayed = false;
      } else if (activeNavItem === 'portrait' && imgElement.naturalWidth > imgElement.naturalHeight) {
        shouldBeDisplayed = false;
      }
    }

    // Define a exibição da imagem com base nos resultados dos filtros
    img.style.display = shouldBeDisplayed ? 'flex' : 'none';
  });
}

// Função para atualizar a exibição das imagens quando houver uma mudança na barra de pesquisa
document.getElementById("searchInput").addEventListener("input", searchImages);

function openFullscreen() {
  const modalImg = document.getElementById("modal-img");
  if (modalImg.requestFullscreen) {
    modalImg.requestFullscreen();
  } else if (modalImg.mozRequestFullScreen) { /* Firefox */
    modalImg.mozRequestFullScreen();
  } else if (modalImg.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    modalImg.webkitRequestFullscreen();
  } else if (modalImg.msRequestFullscreen) { /* IE/Edge */
    modalImg.msRequestFullscreen();
  }
}

// Função para limpar a barra de pesquisa
document.getElementById("clearSearch").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  searchImages();
});

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

document.getElementById('logo').addEventListener('click', function() {
  window.location.href = 'https://orangine.github.io'; // Substitua pelo URL desejado
});
