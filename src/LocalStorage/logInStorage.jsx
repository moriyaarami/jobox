export  function SetLogInStorage(status) {
  localStorage.setItem('userLogIn', status);
  console.log(status)
}

export  function GetLogInStatus(){
    return localStorage.getItem('userLogIn');
}

