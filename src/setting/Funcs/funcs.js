function postUsersLoginData(url, userData, callback) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((res) => {
      callback(res);
    });
}

function getUsersData(url, callback) {
  fetch(`${url}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((res) => callback(res));
}

function getUserData(url, userId, callback) {
  fetch(`${url}${userId}.json`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((res) => callback(res));
}

function postSongData(url, songData, callback) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((res) => callback(res));
}

function deleteUser(url, userId, callback) {
  fetch(`${url}${userId}.json`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((res) => callback(res));
}

function editUserData(url, userData, userId, callback) {
  fetch(`${url}${userId}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .then((res) => callback(res));
}

//? Regex Auth
function emailAuth(email) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}

//? Admin Username
const adminUsername = "alideweb";

export {
  adminUsername,
  postUsersLoginData,
  emailAuth,
  getUserData,
  postSongData,
  getUsersData,
  deleteUser,
  editUserData,
};
