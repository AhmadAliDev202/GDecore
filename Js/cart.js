const cartItemsContainer = document.getElementById('cart-items');
const emptyCart = document.getElementById('empty-cart');
const orderSummary = document.getElementById('order-summary');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');

const isCartPage = cartItemsContainer && emptyCart && orderSummary && subtotalEl && totalEl;

let cart = [];

function renderCart() {
  if (!cartItemsContainer || !emptyCart || !orderSummary || !subtotalEl || !totalEl) {
    console.log("Not on cart page, skipping renderCart.");
    return;
  }
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    emptyCart.classList.remove('hidden');
    orderSummary.classList.add('hidden');
    return;
  }

  emptyCart.classList.add('hidden');
  orderSummary.classList.remove('hidden');

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.category}</p>
        <p>${item.description}</p>
        <div class="cart-item-qty">
          <button onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">Rs ${(item.price * item.qty).toLocaleString()}</div>
      <button onclick="removeItem(${item.id})">🗑️</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  subtotalEl.textContent = `Rs ${subtotal.toLocaleString()}`;
  totalEl.textContent = `Rs ${subtotal.toLocaleString()}`;
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

showToast('Proceeding to checkout...');

function continueShopping() {
  window.location.href = 'Index.html';
}



function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}


if (cart.length === 0) {
  cart = [
    {
      id: 1,
      name: "Fiddle Leaf Fig",
      price: 1300,
      qty: 2,
      img: "Images/Cold/PostCard1.png",
      category: "Warm",
      description: "Large, violin-shaped leaves bringing tropical elegance to any room."
    },
    {
      id: 5,
      name: "English Ivy",
      price: 950,
      qty: 1,
      img: "Images/Cold/PostCard2.png",
      category: "Cold",
      description: "Trailing vines perfect for shelves and hanging baskets."
    }
  ];
}

renderCart();
