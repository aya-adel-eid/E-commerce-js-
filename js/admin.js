const baseApi = `https://api.escuelajs.co/api/v1/`;
let products;
let tableData = document.getElementById("dataBody");
let btnSearch=document.querySelector(".my-search");
let searchInput=document.getElementById("searchInput");
let confirmModal=document.getElementById("confirm-modal");
let deleteProductbyConfirm=document.getElementById("delet");
let closeModal=document.getElementById("close");
let  producID;
let page=1;
let numsrow=7;
async function getProducts() {
  let getApi = await fetch(`${baseApi}products`);
  products = await getApi.json();
  displayProducts(products,page);
  console.log("Products", products);
  return products;
}
getProducts();
function displayProducts(arr,page) {
   tableData.innerHTML ="";
    let start=(page-1)*numsrow;
    let end=numsrow+start;
  let box = ``;
  for (let i = start; i < end&&i<arr.length; i++) {
    box += `
         <tr>
                            <td>${arr[i].id}</td>
                            <td>${arr[i].title}</td>
                            <td>${arr[i].category.name}</td>
                            <td>${arr[i].category.id}</td>
                            <td>
                                <button class="btn bg-success text-white" id="btnView" onclick="ViewProduct(${arr[i].id})">View</button>
                                <button class="btn bg-warning text-white " id="btnEdit" onclick=" EditProduct(${arr[i].id})">Edit</button>
                                <button   class="btn bg-danger text-white" id="btnDelete" onclick="openModalDelete(${arr[i].id})">Delete</button>
                            </td>
                        </tr>
        `;
       
        
  }
  tableData.innerHTML = box;
}
function openModalDelete(id){
  producID=id;
 confirmModal.classList.replace("d-none","d-flex");
  console.log(id);
  
}
deleteProductbyConfirm.addEventListener("click",()=>{
  deleteProduct(producID);
  confirmModal.classList.replace("d-flex","d-none");

})
closeModal.addEventListener("click",()=>{
   confirmModal.classList.replace("d-flex","d-none");
})
 async function deleteProduct(id){
 let prodDelete=await fetch(`${baseApi}products/${id}`,{
    method:"DELETE",
 })
 getProducts();
}

function ViewProduct(id){
    localStorage.setItem("idProductToView",JSON.stringify(id));
    location.href="../html/details.html"
console.log(id);

}
document.getElementById("btnNext").addEventListener("click", () => {
  if (page * numsrow < products.length) {
    page++;
   
  }
  else{
    page=1;
  }
  displayProducts(products,page);
});
document.getElementById("btnPrev").addEventListener("click", () => {
  if (page >1) {
    page--;
   
  }
  else{
    page= Math.ceil(products.length / numsrow);
  }
    displayProducts(products,page);
});

async function searchByNameProduct(productNameInput){
  let products=await getProducts();
  if(productNameInput!==""){
    let fillterByName=products.filter(item=>{
      return item.title.toLowerCase()===productNameInput.toLowerCase();
    })

    displayProducts(fillterByName,page);
    
    return fillterByName;
  }
  else{
    displayProducts(products,page);
    return products;
  }
}
btnSearch.addEventListener("click",()=>{
searchByNameProduct(searchInput.value);

 
})
 function EditProduct(id){
 /*  let products=await getProducts()
  let productOfID=products.find((item)=>item.id=id);
   */
   localStorage.setItem("idProductToEdit",JSON.stringify(id));
    location.href="../html/createProduct.html"
  console.log(productOfID);
  
}