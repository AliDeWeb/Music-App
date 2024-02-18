function postUsersLoginData(url, userData, callback) {
  fetch(url, {
    method: "POST",
    "Content-Type": "application/json",
    body: userData,
  }).then((res) => {
    if (res.ok) {
      callback();
    } else {
      return false;
    }
  });
}

//? Regex Auth
function emailAuth(email) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}

export { postUsersLoginData, emailAuth };
