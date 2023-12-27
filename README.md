# Project-Management-System-CRUDS-System
 CRUDS System created with HTML, CSS, Bootstrap and Java Script

 ## Main objective
 CRUDS System, to save data, retrive, update and delete it.

 ## Design
![Cruds](https://github.com/NoorseenQandil/Project-Management-System-CRUDS-System/assets/70522199/896ecc66-ed46-4bb6-9656-50aec6c69c24)


## Features
### 1.User-Friendly Interface:
* The user interface is clean, intuitive, and easy to navigate.
* A visually appealing layout ensures a positive user experience.

### 2. Warning For Validation.
* IF the validation processes aren't true, this shows a warning alert message.
![validate](https://github.com/NoorseenQandil/Project-Management-System-CRUDS-System/assets/70522199/8504f5c1-5867-4663-9de2-b59ca3d38c88)

### 3. Save data in table and local storage.
* Entered data is saved in the shown table and in local storage too.
  
### 4. Update data in the table and in the local storage too.
* Update data in the table and in the local storage too.

### 5. Delete Data
* Delete the entered data from the table and from the local storage too.

### 6. Alert Message Before Delete
* Show alert message before delete data.
![alert](https://github.com/NoorseenQandil/Project-Management-System-CRUDS-System/assets/70522199/edc35416-9eb9-4d1d-8357-cbedf8704d55)

### 7. Calculate Total
* Calculate total depending on discount, price and quantity.

### 8. Choose how many row of data you want to show
* You can choose how many row of data you want to show (10, 25, 50, 100).

### 9. Choose the page number to show with data
* Choose the page number to show with data(1, 2, etc...).

### 10. Show all the saved categories with counter
* Show all the saved categories in a seperated table.
![table](https://github.com/NoorseenQandil/Project-Management-System-CRUDS-System/assets/70522199/ae367270-2b25-41ad-8785-6f07b3717aa5)

### 11. Products Counter
* Products Counter count the number of saved data.
![calc](https://github.com/NoorseenQandil/Project-Management-System-CRUDS-System/assets/70522199/735f2a0d-9126-4897-af7c-223639e43d08)

### 12. Real Time Search
* Real Time Search. Type any character and the result will include all data rows with the typed character.

### 13. Clear inputs
* After update or add the entered data, clear all inputs.
  
### 14. Responsive Design
* Page design is responsive for all devices.


## Getting Started
1- Clone or download this repository to your local machine.

2- Open the index.html file in a web browser.

## Java script Functions
* Save Category
  ```
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
  ```
  
* Reset Category
  ```
      function resetCategory(){
      category.value = " ";
     }
  ```

* Show Category
 ```
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
 ```

* Show Table Category
 ```
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
 ```

* Delete Category
  ```
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
  ```
  
* Count Category
   ```
   function countCategory(){
    document.getElementById("countCategory").innerHTML = `-Total Category (${categoryArry.length})`;
   }
   ```

* Validate Category
  ```
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
  ```

* Get Total Of Products
  ```
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
  ```

* Save Product
  ```
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
  ```

* Reset
  ```
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
  ```

* Show Products Table
  ```
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
  ```
 
 * Delete Product
   ```
     function deleteProduct(id){
      if(confirm("Are you sure from deleted?") == true){
          productArray.splice(id, 1);
          localStorage.setItem("Product", JSON.stringify(productArray));
          showTableProducts();
          countProducts();     // Calc products number
      }
   }
   ```
 
 * Update Products
   ```
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
   ```

* Count Products
  ```
   function countProducts(){
     document.getElementById("countPro").innerHTML = `-TotalProducts (${productArray.length})`
   }
  ```

* Validate Inputs
  ```
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
  ```

  ## Live Demo
Experience the Tabs Project in action! Click the link below to access the live demo:

[Live Demo] (https://noorseenqandil.github.io/Project-Management-System-CRUDS-System/)

Feel free to interact with the project, browse through different jobs, and explore the user-friendly interface. The live demo provides a hands-on experience to see the Tabs Project in action.

## Contributing
If you have suggestions or find issues with the template, feel free to open an issue or create a pull request. Contributions are welcome!

## Contact
If you have any questions, feedback, or suggestions, please feel free to reach out to us at NourseenQandil@gmail.com We value your input and would love to hear from you!
