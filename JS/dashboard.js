const STATUSES = ["Pending", "Delivered", "Cancelled"];
const PILL = { Pending: "pill-wait", Delivered: "pill-ok", Cancelled: "pill-off" };

function renderDashboard() {
  const products = getProducts();
  const orders = getOrders();
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD (local)

  // STATS
  document.getElementById("statProducts").textContent = products.length;
  document.getElementById("statTotal").textContent = orders.length;
  document.getElementById("statPending").textContent =
    orders.filter(o => o.status === "Pending").length;
  document.getElementById("statToday").textContent =
    orders.filter(o => new Date(o.date).toLocaleDateString("en-CA") === today).length;

  // RECENT ORDERS (last 5, newest first)
  const tbody = document.getElementById("recentOrders");
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center login-muted py-4">No orders yet</td></tr>';
  } else {
    tbody.innerHTML = orders.slice(-5).reverse().map(o => `
      <tr>
        <td>#${o.id}</td>
        <td>${new Date(o.date).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}</td>
        <td>${esc(o.product)}</td>
        <td>Rs ${esc(o.price)}</td>
        <td>
          <select class="form-select form-select-sm status-select ${PILL[o.status]}" data-id="${o.id}" aria-label="Status of order ${o.id}">
            ${STATUSES.map(s => `<option ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}
          </select>
        </td>
      </tr>`).join("");
  }

  // BEST SELLERS (top 3 by order count)
  const counts = {};
  orders.forEach(o => { counts[o.product] = (counts[o.product] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const box = document.getElementById("bestSellers");

  if (top.length === 0) {
    box.innerHTML = '<p class="login-muted mb-0">No orders yet</p>';
  } else {
    box.innerHTML = top.map(([name, n]) => {
      const p = products.find(x => x.name === name);
      const img = p
        ? `<img src="${esc(p.image)}" alt="" class="thumb">`
        : '<div class="thumb ph">Photo</div>';
      return `
        <div class="d-flex align-items-center gap-3 mb-3">
          ${img}
          <div><div class="fw-medium small">${esc(name)}</div><small class="login-muted">${n} order${n > 1 ? "s" : ""}</small></div>
        </div>`;
    }).join("");
  }
}

// STATUS CHANGE
document.getElementById("recentOrders").addEventListener("change", function (e) {
  const sel = e.target.closest(".status-select");
  if (!sel) return;
  const list = getOrders().map(o => o.id === Number(sel.dataset.id) ? { ...o, status: sel.value } : o);
  saveOrders(list);
  renderDashboard();
});

renderDashboard();