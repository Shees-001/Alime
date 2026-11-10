const ORDERS_KEY = "alimeOrders";

function getOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch (e) { return []; }
}

function saveOrders(list) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
}

function addOrder(product, price) {
  const list = getOrders();
  const nextId = list.length ? Math.max(...list.map(o => o.id)) + 1 : 1001;
  list.push({
    id: nextId,
    product: product,
    price: price,
    date: new Date().toISOString(),
    status: "Pending"
  });
  saveOrders(list);
}