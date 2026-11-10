const list = getProducts().filter(p => p.active);

document.getElementById("shopEmpty").classList.toggle("d-none", list.length > 0);

document.getElementById("shopList").innerHTML = list.map(p => `
  <div class="col-sm-6 col-lg-4">
    <div class="product-card h-100">
      <img src="${esc(p.image)}" alt="${esc(p.name)}">
      <div class="p-3">
        <h3 class="h5">${esc(p.name)}</h3>
        <span class="price d-block mb-3">Rs ${esc(p.price)}</span>
        <a href="#" class="btn btn-alime btn-sm order-btn" data-product="${esc(p.name)}" data-price="${esc(p.price)}">Order Now</a>
      </div>
    </div>
  </div>`).join("");