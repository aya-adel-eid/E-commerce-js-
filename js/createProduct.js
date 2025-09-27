const baseApi = `https://api.escuelajs.co/api/v1/`;
let titleProductInput = document.getElementById("titleProduct");
let descriptionProductInput = document.getElementById("descriptionProduct");
let imageProductInput = document.getElementById("imgeProduct");
let priceProductInput = document.getElementById("priceProduct");
let categoryProductInput = document.getElementById("category");
let btnCreateProduct = document.getElementById("createProduct");
const form = document.getElementById("my-form");
let idProductUpdate = JSON.parse(localStorage.getItem("idProductToEdit"));
let updateBtn = document.getElementById("update");
let categoryList;
let productList;
if (idProductUpdate) {
  helpUpdateProduct();
}

async function getCategories() {
  let getAllCategory = await fetch(`${baseApi}categories`);
  categoryList = await getAllCategory.json();
  console.log(`Category`, categoryList);
  displayGategories(categoryList);
}
getCategories();
function displayGategories(arr) {
  categoryProductInput.innerHTML = ``;
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "-- Select Category --";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  categoryProductInput.appendChild(defaultOption);
  for (let i = 0; i < arr.length; i++) {
    createOptionSelect(arr[i].id, arr[i].name);
  }
}
function createOptionSelect(categoryId, categoryName) {
  const option = document.createElement("option");
  option.value = categoryId;
  option.textContent = categoryName;
  categoryProductInput.appendChild(option);
}
btnCreateProduct.addEventListener("click", () => {
  if (
    valdiate(priceProductInput) &&
    valdiate(imageProductInput) &&
    valdiate(descriptionProductInput) &&
    valdiate(titleProductInput)
  ) {
    let newProduct = {
      title: titleProductInput.value,
      price: Number(priceProductInput.value),
      description: descriptionProductInput.value,
      categoryId: Number(categoryProductInput.value),
      images: [imageProductInput.value],
    };
    console.log("Sending product:", newProduct);
    createProduct(newProduct);
  }
});

async function createProduct(product) {
  let req = await fetch(`${baseApi}products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!req.ok) {
    let err = await req.text();
    console.error("API Error:", err);
    return;
  }
  productList = await req.json();
  clear();
  console.log(productList);
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
function clear() {
  priceProductInput.value = " ";
  titleProductInput.value = "";
  descriptionProductInput.value = "";
  imageProductInput.value = "";
  categoryProductInput.selectedIndex = 0;
}
function valdiate(element) {
  let text = element.value;
  const regex = {
    titleProduct: /^[A-Za-z][a-z0-9.\s]{3,50}$/i,
    descriptionProduct: /^[A-Z][a-z0-9.,\s]{20,200}$/i,
    imgeProduct: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
    priceProduct: /^[1-9]\d*$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    console.log("done");

    return true;
  } else {
    console.log("not");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}
async function getProducts() {
  let res = await fetch(`${baseApi}products`);
  return await res.json();
}
async function helpUpdateProduct() {
  let products = await getProducts();
  let productOfID = products.find((item) => item.id === idProductUpdate);
  priceProductInput.value = productOfID.price;
  titleProductInput.value = productOfID.title;
  descriptionProductInput.value = productOfID.description;
  imageProductInput.value = productOfID.images[0];
  categoryProductInput.value = productOfID.category.id;
  btnCreateProduct.classList.add("d-none");
  btnCreateProduct.classList.remove("d-inline");

  updateBtn.classList.add("d-inline");
  updateBtn.classList.remove("d-none");
}
updateBtn.addEventListener("click", function () {
  let updateProduct = {
    title: titleProductInput.value,
    price: Number(priceProductInput.value),
    description: descriptionProductInput.value,
    categoryId: Number(categoryProductInput.value),
    images: [imageProductInput.value],
  };
  update(updateProduct);
});
async function update(updateProduct) {
  let updateData = await fetch(`${baseApi}products/${idProductUpdate}`, {
    method: `PUT`,
    body: JSON.stringify(updateProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
  localStorage.removeItem("idProductToEdit");
  clear();
  updateBtn.classList.add("d-none");
  updateBtn.classList.remove("d-inline");

  btnCreateProduct.classList.add("d-inline");
  btnCreateProduct.classList.remove("d-none");
}
