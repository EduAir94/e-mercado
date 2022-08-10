document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login");
  // Loop over them and prevent submission
  form.addEventListener("submit", (event) => {
    form.classList.add("was-validated");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");
    console.log({ email, password });
    event.preventDefault();
    window.location.href = "/market.html";
  });
});
