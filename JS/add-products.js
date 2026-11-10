const tbody = document.getElementById("productTable");
const emptyBox = document.getElementById("emptyProducts");
const tableWrap = document.getElementById("tableWrap");

function render() {
  const list = getProducts();
  emptyBox.classList.toggle("d-none", list.length > 0);
  tableWrap.classList.toggle("d-none", list.length === 0);

  tbody.innerHTML = list.map(p => `
    <tr>
      <td><div class="d-flex align-items-center gap-3">
        <img src="${esc(p.image)}" alt="" class="thumb"><span>${esc(p.name)}</span>
      </div></td>
      <td>Rs ${esc(p.price)}</td>
      <td><span class="pill ${p.active ? "pill-ok" : "pill-off"}">${p.active ? "Active" : "Hidden"}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-alime" data-act="delete" data-id="${p.id}" aria-label="Delete ${esc(p.name)}"><i class="bi bi-trash"></i></button>
      </td>
    </tr>`).join("");
}

// ADD PRODUCT
document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const file = document.getElementById("pImg").files[0];
  if (!file) return;

  const image = await fileToCompressedDataUrl(file);
  const list = getProducts();
  list.push({
    id: Date.now(),
    name: document.getElementById("pName").value.trim(),
    price: document.getElementById("pPrice").value,
    category: document.getElementById("pCat").value,
    description: document.getElementById("pDesc").value.trim(),
    image: image,
    active: true
  });

  try {
    saveProducts(list);
  } catch (err) {
    alert("Storage full. Use a smaller image or delete old products.");
    return;
  }
  this.reset();
  render();
});

// DELETE and SHOW/HIDE
tbody.addEventListener("click", function (e) {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  let list = getProducts();

  if (btn.dataset.act === "delete") {
    if (!confirm("Delete this product?")) return;
    list = list.filter(p => p.id !== id);
  } else {
    list = list.map(p => p.id === id ? { ...p, active: !p.active } : p);
  }
  saveProducts(list);
  render();
});

render();