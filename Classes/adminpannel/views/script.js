document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dispcat_id');
    const resultDiv = document.getElementById('result');
  
    dropdown.addEventListener('change', () => {
      
      const selectedValue = dropdown.value;
      
      // Send an AJAX request to the Express server
      fetch(`/getData?selectedValue=${selectedValue}`)
        .then((response) => response.json())
        .then((data) => {
          let tr = '';
          data.forEach((e)=>{
            tr += `<tr><td>${e._id}</td><td>${e.cat_id.catname}</td><td>${e.name}</td><td><a href="/admin/editSubCat/${e._id}">Edit</a><a href="/admin/deleteSubCat/${e._id}">Delete</a></td></tr>`;
          })
          resultDiv.innerHTML = tr;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    });
    const searchbox = document.getElementById("search");
    searchbox.addEventListener('keyup', () => {
      
      const selectedValue = searchbox.value;
      console.log(selectedValue);
      // Send an AJAX request to the Express server
      fetch(`/getfilterData?selectedValue=${selectedValue}`)
        .then((response) => response.json())
        .then((data) => {
          let tr = '';
          data.forEach((e)=>{
            tr += `<tr><td>${e._id}</td><td>${e.cat_id.catname}</td><td>${e.name}</td><td><a href="/admin/editSubCat/${e._id}">Edit</a><a href="/admin/deleteSubCat/${e._id}">Delete</a></td></tr>`;
          })
          resultDiv.innerHTML = tr;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      
    });   
  });


  const catdropdown = document.getElementById('cat_id');

    catdropdown.addEventListener('change', () => {
      
      const selectedValue = catdropdown.value;
      const subDiv = document.getElementById("sub_id");
      // Send an AJAX request to the Express server
      fetch(`/getSubData?selectedValue=${selectedValue}`)
        .then((response) => response.json())
        .then((data) => {
          let tr = '<option>--Select SubCategory--</option>';
          data.forEach((e)=>{
            tr += `<option value="${e._id}">${e.name}</option>`;
          })
          subDiv.innerHTML = tr;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    });
  