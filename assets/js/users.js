document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems,{});})



// const adduserbutton = document.getElementById('add_user_button')
// adduserbutton.addEventListener('click',()=>{
// document.querySelector('.add-user').classList.add('show')
// document.querySelector('.add-user-back').classList.remove('dis-none')
// })
// document.querySelector('.add-user-back').addEventListener('click',()=>{
//   document.querySelector('.add-user').classList.remove('show')
//   document.querySelector('.add-user-back').classList.add('dis-none')
// })
   
// setTimeout(function(){
//   console.log("start.......");
//   fetch('https://jsonplaceholder.typicode.com/users')
//   .then((response) => response.json())
//   .then((json) => {
//     console.log("end.....");
//     console.log(json)

// let html = ""
// for(const user of json){
// html = html + `<tr>
// <td>${user.id}</td>
// <td>${user.name}</td>
// <td>${user.phone}</td>
// <td>${user.email}</td>
// <td>${user.address.city}</td>
// <td>
//   <a href="#delet"> <i class="material-icons red-text gutter_top"> delete_forever 
//    </i></a>
//    <a href="#Edit"><i class="material-icons orange-text darken-2 ">edit
//    </i>
//  </td>
// </tr>`
  
// }


// document.querySelector('.desktop_table_body').innerHTML = html

//   }); 
  



// // },5000)





//   });
