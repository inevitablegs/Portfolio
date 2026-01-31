api.post("/token/", {
  username,
  password
}).then(res => {
  localStorage.setItem("access", res.data.access);
});
