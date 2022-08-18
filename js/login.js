document.addEventListener("DOMContentLoaded", function () {
  const validate_email = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const form = document.getElementById("login");
  // Loop over them and prevent submission
  form.addEventListener("submit", (event) => {
    const data = new FormData(form);
    const email = data.get("email");
    form.classList.add("was-validated");
    if (form.checkValidity() === false) {
      if (email) {
        document.getElementById("email_invalid_feedback").innerHTML =
          "E-mail no es válido";
      } else {
        document.getElementById("email_invalid_feedback").innerHTML =
          "Ingresa tu e-mail";
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const password = data.get("password");
    localStorage.setItem("email", email);
    event.preventDefault();
    window.location.href = "/market.html";
  });

  const show_hide_pass = document.querySelector(".btn_show_hide_pass");
  const pass_input = document.getElementById("password");
  show_hide_pass.addEventListener("click", function (e) {
    e.preventDefault();
    const i = show_hide_pass.querySelector("i");
    const show = i.classList.contains("bi-eye");
    if (show) {
      i.classList.remove("bi-eye");
      i.classList.add("bi-eye-slash");
      pass_input.type = "text";
    } else {
      i.classList.add("bi-eye");
      i.classList.remove("bi-eye-slash");
      pass_input.type = "password";
    }
  });
});

const client_id = document
  .querySelector("#g_id_onload")
  .getAttribute("data-client_id");

async function google_login(response) {
  let responsePayload;
  if (response.access_token) {
    const url =
      "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
      response.access_token;
    responsePayload = await fetch(url).then((res) => res.json());
  } else {
    responsePayload = jwt_decode(response.credential);
  }
  const email = responsePayload.email;
  localStorage.setItem("email", email);
  window.location.href = "/market.html";
}

var client = google.accounts.oauth2.initTokenClient({
  client_id: client_id,
  scope: "openid",
  ux_mode: "popup",
  response_type: "id_token token",
  callback: google_login,
});

document
  .querySelector("#login_with_google")
  .addEventListener("click", function (e) {
    client.requestAccessToken();
    e.preventDefault();
  });
