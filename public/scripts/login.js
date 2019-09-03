function login() {
  //Check fields
  if(document.getElementById("username").value.length < 1 || document.getElementById("password").value.length <1){
    alertify.error('Please fill in the required fields.');
    return;
  }

    //Change bellow url from localhost to actual host for the login API
    const Url = "http://127.0.0.1:8000/admin/login";
    const requestBody =
      `username=${document.getElementById("username").value}` +
      `&password=${document.getElementById("password").value}`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post(Url, requestBody, config).then(function (response) {
        localStorage.setItem('token', `${response.data.token}`);
        //Change bellow actual panel url
        window.location.replace('http://127.0.0.1:8000/admin/panel');
      })
      .catch(error => {
        alertify.error('Wrong username and/or password.')
      });
  }

  //Send request to validate token if it exists to skip login process, token is valid for one day only
  function onPage(){
    if(localStorage.getItem('token')){
    const Url = "http://127.0.0.1:8000/admin/";
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  };
  axios.post(Url, {}, config).then(function (response) {
      //If token exists redirect to panel page, change localhost to actual one
      window.location.replace(`http://127.0.0.1:8000/admin/panel?token=${localStorage.getItem('token')}`);
    })
    .catch(error => {});
  }
  }

  window.onload = onPage();