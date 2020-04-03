 function valid (form) {
     var name = form.name.value;
     var password = form.password.value;
     var RePassword = form.RePassword.value;

     let error =  document.getElementById('error');
     let errorPass =  document.getElementById('errorPass');
     let errorRePass =  document.getElementById('errorRePass');
    
     if (name == "" || name == " ")
     error.innerHTML = 'Вы не ввели логин!'
   else
     if (password == "") 
     errorPass.innerHTML = 'Вы не ввели пароль!'
   else{
    errorPass.innerHTML = ''
   }
     if (RePassword == "") 
     errorRePass.innerHTML = 'Подтвердите пароль!'
   else{
    errorRePass.innerHTML = ""
   }
     if (password !== RePassword) 
     errorRePass.innerHTML = 'Пароли не совпадают!'
    else{
      errorRePass.innerHTML = ""
    }
  }

    function Revalid (form) {
      var name = form.name.value;
      var password = form.password.value;
      var RePassword = form.RePassword.value;
 
      let error1 =  document.getElementById('error');
      let errorPass1 =  document.getElementById('errorPass');
      let errorRePass1 =  document.getElementById('errorRePass');
     
      if (name !== "" || name == " ")
      error1.innerHTML = '' 
    else{}
     }

  function gears (form) {
    var fail = false;
    var name = form.name.value;
    var password = form.password.value;
    var RePassword = form.RePassword.value;

    let smallGear1 =  document.getElementById('smallGear1');
    let bigGear2 =  document.getElementById('bigGear2');

     if (name !== "" && password !== "" && RePassword !== "" && RePassword == password){
      smallGear1.style.transform = 'rotateZ(-360deg)'
      smallGear1.style.fill = 'green'
      smallGear1.style.transition = '1.0s'
      bigGear2.style.transform = 'rotateZ(360deg)'
      bigGear2.style.fill = 'green'
      bigGear2.style.transition = '1.0s'
     }
  }
  function greenInp (form) {
    var fail = false;
    var name = form.name.value;
    var password = form.password.value;
    var RePassword = form.RePassword.value;

    let name2 =  document.getElementById('name');
    let password2 =  document.getElementById('password');
    let RePassword2 =  document.getElementById('RePassword');
    let btn = document.getElementById('btn');

     if (name !== "" && password !== "" && RePassword !== "" && RePassword == password){
      name2.style.background = 'green'
      password2.style.background = 'green'
      RePassword2.style.background = 'green'
      btn.style.background = 'green'
      btn.style.color = 'black'
     }
  }
   
window.onload = function() {
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
}