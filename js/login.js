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

  const google_login = () => {
    const start_app = function () {
      gapi.load("auth2", function () {
        auth2 = gapi.auth2.init({
          client_id:
            "305807321503-rqapibjl40pakon4rr586u07c8iucpot.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
        });
        attach_sign_in(document.getElementById("login_with_google"));
      });
    };

    function attach_sign_in(element) {
      auth2.attachClickHandler(
        element,
        {},
        function (googleUser) {
          const profile = googleUser.getBasicProfile();
          console.log(profile);
        },
        function (error) {
          alert(JSON.stringify(error, undefined, 2));
        },
      );
    }
    start_app();
  };

  google_login();
});
