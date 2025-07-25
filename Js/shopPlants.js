console.log('shopPlants.js loaded');
const plants = [
  {
    id: 1,
    name: "Fiddle Leaf Fig",
    price: 1300,
    category: "Warm",
    img: "Images/Cold/PostCard1.png",
    description: "Large, violin-shaped leaves bringing tropical elegance to any room."
  },
  {
    id: 2,
    name: "Areca Palm",
    price: 1250,
    category: "Warm",
    img: "Images/Warm/PostCard9.png",
    description: "Air-purifying feathery fronds, perfect for bright corners."
  },
  {
    id: 3,
    name: "ZZ Plant",
    price: 1350,
    category: "Warm",
    img: "Images/Warm/PostCard10.png",
    description: "Low-maintenance plant with glossy leaves for any space."
  },
  {
    id: 4,
    name: "Monstera Deliciosa",
    price: 1400,
    category: "Warm",
    img: "Images/Warm/PostCard12.png",
    description: "Iconic split leaves adding a lush tropical vibe indoors."
  },
  {
    id: 5,
    name: "English Ivy",
    price: 950,
    category: "Cold",
    img: "Images/Cold/PostCard2.png",
    description: "Trailing vines perfect for shelves and hanging baskets."
  },
  {
    id: 6,
    name: "Spider Plant",
    price: 1000,
    category: "Cold",
    img: "Images/Cold/PostCard3.png",
    description: "Air-purifying plant with arching green-and-white leaves."
  },
  {
    id: 7,
    name: "Chinese Evergreen",
    price: 1150,
    category: "Cold",
    img: "Images/Cold/PostCard4.png",
    description: "Colorful foliage ideal for low-light rooms and offices."
  },
  {
    id: 8,
    name: "Snake Plant",
    price: 1050,
    category: "Warm",
    img: "Images/Warm/PostCard11.png",
    description: "Vertical leaves adding structure and filtering air efficiently."
  },
  {
    id: 9,
    name: "Peace Lily",
    price: 1200,
    category: "Off Season",
    img: "Images/OffSeason/PostCard5.png",
    description: "Elegant white blooms and lush leaves for tranquility."
  },
  {
    id: 10,
    name: "Cast Iron Plant",
    price: 1150,
    category: "Off Season",
    img: "Images/OffSeason/PostCard6.png",
    description: "Nearly indestructible, perfect for low-light conditions."
  },
  {
    id: 11,
    name: "Philodendron",
    price: 1100,
    category: "Off Season",
    img: "Images/OffSeason/PostCard7.png",
    description: "Heart-shaped leaves and trailing vines for warm ambiance."
  },
  {
    id: 12,
    name: "Dracaena",
    price: 1250,
    category: "Off Season",
    img: "Images/OffSeason/PostCard8.png",
    description: "Tall, spiky foliage adding height to indoor plant collections."
  }
];

const plantContainer = document.getElementById('plant-cards-container');

function renderPlants(plantsToRender) {
  plantContainer.innerHTML = '';
  plantsToRender.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <div class="heart-icon" aria-label="wishlist" role="button">
        <svg viewBox="0 0 24 24" class="heart-svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
          2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
          4.5 2.09C13.09 3.81 14.76 3 16.5 
          3 19.58 3 22 5.42 22 8.5c0 
          3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="transparent" stroke="var(--olive)" stroke-width="2"/>
        </svg>
      </div>
      <img src="${plant.img}" alt="${plant.name}">
      <div class="card-content">
        <div class="title-row">
          <h3>${plant.name}</h3>
          <span class="category-badge">${plant.category}</span>
        </div>
        <p class="description">${plant.description}</p>
        <div class="bottom-row">
          <p class="price">Rs ${plant.price.toLocaleString()}</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;
    plantContainer.appendChild(card);

    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      addToCart(plant); 
      showToast(`${plant.name} added to cart!`);
    });
  });
  function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}


  document.querySelectorAll('.heart-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('liked');
      const path = icon.querySelector('path');
      if (icon.classList.contains('liked')) {
        path.setAttribute('fill', 'var(--olive)');
      } else {
        path.setAttribute('fill', 'transparent');
      }
    });
  });
}

renderPlants(plants);

document.getElementById('toggle-category-filter').addEventListener('click', () => {
  const menu = document.getElementById('category-filter-menu');
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
});

document.getElementById('toggle-price-filter').addEventListener('click', () => {
  const menu = document.getElementById('price-filter-menu');
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
});

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    if (category === 'All') {
      renderPlants(plants);
    } else {
      const filtered = plants.filter(p => p.category === category);
      renderPlants(filtered);
    }
  });
});

document.querySelectorAll('.price-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sort = btn.getAttribute('data-sort');
    const sortedPlants = [...plants].sort((a, b) => sort === 'high' ? b.price - a.price : a.price - b.price);
    renderPlants(sortedPlants);
  });
});

const activeFiltersContainer = document.getElementById('active-filters');
let activeCategory = null;
let activeSort = null;

function updateActiveFiltersDisplay() {
  activeFiltersContainer.innerHTML = '';

  if (!activeCategory && !activeSort) {
    activeFiltersContainer.innerHTML = '<span>No filters applied.</span>';
    return;
  }

  if (activeCategory) {
    const categorySpan = document.createElement('span');
    categorySpan.textContent = `Category: ${activeCategory}`;
    activeFiltersContainer.appendChild(categorySpan);
  }

  if (activeSort) {
    const sortSpan = document.createElement('span');
    sortSpan.textContent = `Sort: ${activeSort === 'high' ? 'High → Low' : 'Low → High'}`;
    activeFiltersContainer.appendChild(sortSpan);
  }

  const clearButton = document.createElement('button');
  clearButton.className = 'clear-filters';
  clearButton.textContent = 'Clear Filters';
  clearButton.addEventListener('click', () => {
    activeCategory = null;
    activeSort = null;
    renderPlants(plants);
    updateActiveFiltersDisplay();
  });
  activeFiltersContainer.appendChild(clearButton);
}

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    activeCategory = (category === 'All') ? null : category;
    const filtered = activeCategory ? plants.filter(p => p.category === activeCategory) : plants;
    if (activeSort) {
      const sorted = [...filtered].sort((a, b) => activeSort === 'high' ? b.price - a.price : a.price - b.price);
      renderPlants(sorted);
    } else {
      renderPlants(filtered);
    }
    updateActiveFiltersDisplay();
  });
});
document.getElementById('view-collection').addEventListener('click', function() {
  document.getElementById('shop-plants').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.price-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sort = btn.getAttribute('data-sort');
    activeSort = sort;
    let filtered = plants;
    if (activeCategory) {
      filtered = plants.filter(p => p.category === activeCategory);
    }
    const sorted = [...filtered].sort((a, b) => sort === 'high' ? b.price - a.price : a.price - b.price);
    renderPlants(sorted);
    updateActiveFiltersDisplay();
  });
});


updateActiveFiltersDisplay();

document.addEventListener('click', (e) => {
  const categoryToggle = document.getElementById('toggle-category-filter');
  const priceToggle = document.getElementById('toggle-price-filter');
  const categoryMenu = document.getElementById('category-filter-menu');
  const priceMenu = document.getElementById('price-filter-menu');

  const isClickInsideCategory = categoryToggle.contains(e.target) || categoryMenu.contains(e.target);
  const isClickInsidePrice = priceToggle.contains(e.target) || priceMenu.contains(e.target);

  if (!isClickInsideCategory) {
    categoryMenu.style.display = 'none';
  }

  if (!isClickInsidePrice) {
    priceMenu.style.display = 'none';
  }
});
document.getElementById('search-toggle').addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  searchInput.classList.toggle('active');
  if (searchInput.classList.contains('active')) {
    searchInput.focus();
  }
});


const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    const isClickInside = sidebar.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside) {
        sidebar.classList.remove('active');
    }
});


