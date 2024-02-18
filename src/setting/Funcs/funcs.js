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

export { postUsersLoginData };
