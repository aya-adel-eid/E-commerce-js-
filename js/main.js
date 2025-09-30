let showAllProducts = document.getElementById("showAllProducts");
const baseApi = `https://api.escuelajs.co/api/v1/`;
let typeCategory=document.getElementById("category");
let minPriceInput=document.getElementById("min-price");
let maxPriceInput=document.getElementById("max-price");
let form=document.getElementById("form");
let subBtn=document.getElementById("sub");
let resetBtn=document.getElementById("res");
let currentProducts;
let categoryList;
form.addEventListener("submit",function(e){
  e.preventDefault();
})
form.addEventListener("reset",function(e){
  e.preventDefault();
})
let productsList;
async function getAllProducts() {
  let requset = await fetch(`${baseApi}products`);
  productsList = await requset.json();
  currentProducts=productsList;
  displayAllProducts(currentProducts,page)
  console.log(productsList);
  return productsList;
}
let page=1;
let numitems=6;
getAllProducts();
getCategories();
async function getCategories() {
  let getAllCategory = await fetch(`${baseApi}categories`);
  categoryList = await getAllCategory.json();
  console.log(`Category`, categoryList);
  displayGategories(categoryList);
}
function displayGategories(arr) {
  typeCategory.innerHTML = ``;
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "-- Select Category --";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  typeCategory.appendChild(defaultOption);
  for (let i = 0; i < arr.length; i++) {
    createOptionSelect(arr[i].id, arr[i].name);
  }
}
function createOptionSelect(categoryId, categoryName) {
  const option = document.createElement("option");
  option.value = categoryId;
  option.textContent = categoryName;
  typeCategory.appendChild(option);
  console.log(option);
}

function displayAllProducts(arr,page) {
    let start=(page-1)*numitems;
    let end=start+numitems;
  let box = ``;
  for (let i = start; i < end&&i<arr.length; i++) {
 
    box += `
        <div class="col-lg-4 col-md-6">
          <div class="inner shadow">
            <div class="imge">
              <img src="${arr[i].images[0]}" alt="" class="w-100">
            </div>
            <div class="body">
              <h5 class="title-product py-2">${arr[i].title.split(" ", 3).join(" ")}</h5>
             <span class="Category ">${arr[i].category.name}</span>
             <p class="py-2">${arr[i].description.split(" ",20).join(" ")}</p>
             <span class="price">${arr[i].price}$</span>
            </div>
          </div>
        </div>
        `;
  }
  showAllProducts.innerHTML=box;
}

document.getElementById("btnNext").addEventListener("click", () => {
  if (page * numitems < currentProducts.length) {
    page++;
   
  }
  else{
    page=1;
  }
   displayAllProducts(currentProducts,page); 
});
document.getElementById("btnPrev").addEventListener("click", () => {
  if (page >1) {
    page--;
   
  }
  else{
    page=Math.ceil(currentProducts.length/numitems);
  }
 displayAllProducts(currentProducts,page);
});
async function searchByCategoryandPrice(id,minPrice,maxPrice){
 let allProducts=await getAllProducts();
  let filterByCategorAndprice=allProducts.filter(item=>{
    return (item.price>=minPrice&&item.price<=maxPrice&&item.category.id===id)
  })
  console.log(filterByCategorAndprice);
  if(filterByCategorAndprice.length>0){
currentProducts=filterByCategorAndprice;
page=1;
    displayAllProducts(currentProducts,page);
  }
  else{
    showAllProducts.innerHTML=`<h3 class="text-center text-danger">No Products available for this filter</h3>`
  }
  return filterByCategorAndprice;

}
subBtn.addEventListener("click",()=>{
  const min=Number(minPriceInput.value);
  const max=Number(maxPriceInput.value);
  const id= Number(typeCategory.value)
  searchByCategoryandPrice(id,min,max);
})
resetBtn.addEventListener("click",()=>{
  minPriceInput.value='';
  maxPriceInput.value='';
 page = 1;
  currentProducts = productsList;
  displayAllProducts(currentProducts, page);
})