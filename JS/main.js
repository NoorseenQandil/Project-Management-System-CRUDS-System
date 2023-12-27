// ************** All Id Values ***********************
let ddlcategory = document.getElementById("ddlcategory");
let category = document.getElementById("category");
let product = document.getElementById("product");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let bodyCate = document.getElementById("bodyCate");

// Create a new array to save in it the category data
let categoryArry;

// Create a new array to save in it the product data
let productArray;

//Btn status - add & update
let btnStatus = "Create";

// to send the id value then update
let proID;

// Add on the old Category Data
localStorage.category != null? categoryArry = JSON.parse(localStorage.category) : categoryArry = [];

// Add on the old Products Data
localStorage.Product != null? productArray = JSON.parse(localStorage.Product) : productArray = [];

//***************  Category  **************************

// Save Category
function saveCategory(){
    let objCategory={
        category: category.value
    };
    // Insert object data in the array
    categoryArry.push(objCategory);
    // Save in local storage
    localStorage.setItem("category",JSON.stringify(categoryArry));
    // Reset
    resetCategory();
    // Show Data
    showCategory()
    // Save changes in category table
    showTableCategory();
    // Save changes in categories number
    countCategory();
}


// Reset Category
function resetCategory(){
    category.value = " ";
}


// Show Data 
function showCategory(){
    let item = "";
    item += `<option value="">Select Category..</option>`
    for(var i = 0; i < categoryArry.length; i++){
        item += `
        <option value="${i}">${categoryArry[i].category}</option>
        `
    }
    ddlcategory.innerHTML = item;
}


// Show Table Category
function showTableCategory(){
    let table = "";
    for(var i =0; i < categoryArry.length; i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${categoryArry[i].category}</td>
            <td>
                <button class="btn btn-danger" onclick = "DeleteCategory(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
        `
    }
    bodyCate.innerHTML = table;
}


// Delete Category
function DeleteCategory(index){
    // Show a confirm message before delete from category table
    if(confirm('Are you sure from deleted..?') == true){
        categoryArry.splice(index ,1);
        localStorage.category = JSON.stringify(categoryArry);
        showTableCategory();      // to show the update in the table
        showCategory();           // to show the update in the category list
        countCategory();// Save changes in categories number
    }
}


// Count Category
function countCategory(){
    document.getElementById("countCategory").innerHTML = `-Total Category (${categoryArry.length})`;
}


// Validate Category
function validateCategory(){
    let valid = true;
    if(category.value == ''){
        alert("Enter Category Name...");
        valid = false;
    }
    else{
        saveCategory();
        valid = true;
    }
    return valid;
}

//***************  Product  **************************
// Get Total Product
function getTotal(){
    if(price.value != 0){    
        let Total = (quantity.value * price.value) - descount.value;
            total.value = Total;
            total.className.replace("form-control text-center bg-danger-subtle");
            total.className = "form-control text-center bg-success-subtle";
        }
        else{
            total.value = 0;
            total.className.replace("form-control text-center bg-success-subtle");
            total.className = "form-control text-center bg-danger-subtle";
        }
}


// Save Product
function saveProduct(){
    // Create Object
    let = NewProduct = {
        ddlcategory: ddlcategory.options[ddlcategory.selectedIndex].text,
        product: product.value,
        quantity: quantity.value,
        price: price.value,
        descount: descount.value,
        total: total.value
    };
    if(btnStatus === "Create"){
        // Push object in array
        productArray.push(NewProduct);
    }else{
        // update depending on the id value
        productArray[proID] = NewProduct;
         // Catch element to change bg-color
    document.getElementById("BtnSave").className.replace("btn btn-info w-25");
    document.getElementById("BtnSave").className = "btn btn-primary w-25";
    }
    // Localstorage override the change in array
    localStorage.setItem("Product", JSON.stringify(productArray));
    // Reset all inputs after add data
    Reset();
    // add new row for data
    showTableProducts()
    // Calc products number
    countProducts();
    // Get total Products
    getTotal();
}


// Reset Data
function Reset(){
    ddlcategory.options[ddlcategory.selectedIndex].text = "Select Category..";
    product.value = " ";
    quantity.value = 0;
    price.value = 0;
    descount.value = 0;
    total.value = 0;
    // Catch element to change bg-color
    document.getElementById("BtnSave").className.replace("btn btn-info w-25");
    document.getElementById("BtnSave").className = "btn btn-primary w-25";
}


// Show Table
function showTableProducts(){
    let tableProduct = " ";
    for(var i = 0; i < productArray.length; i++){
        tableProduct += `
        <tr>
            <td>${i}</td>
            <td>${productArray[i].ddlcategory}</td> 
            <td>${productArray[i].product}</td>
            <td>${productArray[i].quantity}</td>
            <td>${productArray[i].price}</td>
            <td>${productArray[i].descount}</td>
            <td>${productArray[i].total}</td>
            <td>
                <button class="btn btn-info" onclick="updateProduct(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = tableProduct;
}


// Delete Product
function deleteProduct(id){
    if(confirm("Are you sure from deleted?") == true){
        productArray.splice(id, 1);
        localStorage.setItem("Product", JSON.stringify(productArray));
        showTableProducts();
        countProducts();     // Calc products number
    }
}


// Update Product
function updateProduct(id){
    // Retrive Data
    ddlcategory.options[ddlcategory.selectedIndex].text = productArray[id].ddlcategory;
    product.value = productArray[id].product;
    quantity.value = productArray[id].quantity;
    price.value = productArray[id].price;
    descount.value = productArray[id].descount;
    total.value = productArray[id].total;

    // Change in the button to save changes
    btnStatus = "Edit";
    // take the id value
    proID = id;
    // Catch element to change bg-color
    document.getElementById("BtnSave").className.replace("btn btn-primary w-25");
    document.getElementById("BtnSave").className = "btn btn-info w-25";
}

// Count Product
function countProducts(){
    document.getElementById("countPro").innerHTML = `-TotalProducts (${productArray.length})`
}
// Validate Product
function validateinputs(){
    let lbcate = document.getElementById("lbcate");
    let lbProduct = document.getElementById("lbProduct");
    let lbquantity = document.getElementById("lbquantity");
    let lbprice = document.getElementById("lbprice");
    let valid = true;

    // Category Validation
    if(ddlcategory.options[ddlcategory.selectedIndex].text == 'Select Category..'){
        lbcate.innerHTML = 'Category : * [Required]';
        lbcate.style.color = 'red'; 
        valid = false;
    }else{
        lbcate.innerHTML = 'Category : *';
        lbcate.style.color = 'black'; 
        valid = true; 
    }

    // Product name validation
    if(product.value == ''){
        lbProduct.innerHTML = 'Product Name: * [Required]';
        lbProduct.style.color = 'red'; 
        valid = false;
    }else{
        lbProduct.innerHTML = 'Product Name: *';
        lbProduct.style.color = 'black'; 
        valid = true; 
    }

    // Quatity validation
    if(quantity.value == 0){
        lbquantity.innerHTML = 'Quantity: * [Required]';
        lbquantity.style.color = 'red';
        valid = false;
    }else{
        lbquantity.innerHTML = 'Quantity: *';
        lbquantity.style.color = 'black'; 
        valid = true;
    }

    // Price Validation
    if(price.value == 0){
        lbprice.innerHTML = 'Price: * [Required]';
        lbprice.style.color = 'red';
        valid = false;
    }else{
        lbprice.innerHTML = 'Price: *';
        lbprice.style.color = 'black'; 
        valid = true;
    }

    // All are true
    if(ddlcategory.options[ddlcategory.selectedIndex].text != '' && product.value != '' && quantity.value != 0 && price.value != 0){
        saveProduct();
    }

    return valid
}

// Table Data
$(document).ready( function() {
    showCategory();         // Show ready data
    showTableCategory();   // Show categories
    countCategory();       // Show all categories number
    showTableProducts()   // Add new row of data
    countProducts();      // To calc all products number
    $('#tablPro').DataTable();
});