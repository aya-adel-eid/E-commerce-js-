const baseApi = `https://api.escuelajs.co/api/v1/`;
let idProduct = JSON.parse(localStorage.getItem("idProductToView"));
let showProduct = document.getElementById("rowData");
let backPage=document.getElementById("back");
async function getProductByID(id) {
  let getItim = await fetch(`${baseApi}products/${id}`);
  let product = await getItim.json();
  displayProductByID(product);
  console.log(product);
}
getProductByID(idProduct);
function displayProductByID(product) {
  let box = `
   <div class="col-lg-4">
                    <div class="img">
                        <img src="${product.images[0]}" alt="" class="w-100">
                    </div>
                </div>
                <div class="col-lg-8">
                 <div class="body">
                    <h5 class="title-product py-2">${product.title}</h5>
                    <p>Category: ${product.category.name}</p>
                    <span class="price">${product.price}$</span>
                    <p>${product.description}</p>
                 </div>
                </div>
  `;
  showProduct.innerHTML=box;
}
backPage.addEventListener("click",()=>{
  window.location.href="../index.html"
})
