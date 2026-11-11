const PRODUCTS_KEY = "alimeProducts";

const defaultProducts = [
    {
        id: 1,
        name: "Gold Pair Bangles",
        price: 250,
        category: "Hair accessories",
        description: "Elegant hair clip",
        image: "Images/FixedProduct1.jpeg",
        active: true
    },
    {
        id: 2,
        name: "Gold Ribbed Hoop Earrings",
        price: 150,
        category: "Jewelry",
        description: "Beautiful pearl necklace",
        image: "Images/FixedProduct2.jpeg",
        active: true
    },
    {
        id: 3,
        name: "Cloud Fluff Claw Clip",
        price: 150,
        category: "Bags",
        description: "Stylish handbag",
        image: "Images/FixedProduct3.jpeg",
        active: true
    }
];

function getProducts() {
    let products = localStorage.getItem(PRODUCTS_KEY);

    if (products === null) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
    }

    return JSON.parse(products);
}

function saveProducts(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
}

// user ka likha text HTML mein safe dikhane ke liye
function esc(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// image ko chhota (max 700px) karke text mein badalta hai, taake localStorage na bhare
function fileToCompressedDataUrl(file, maxSize = 700) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}