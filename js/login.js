document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login');
  // Loop over them and prevent submission
  form.addEventListener('submit', (event) => {
    const data = new FormData(form);
    const email = data.get('email');
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      if (email) {
        document.getElementById('email_invalid_feedback').innerHTML = 'E-mail no es válido';
      } else {
        document.getElementById('email_invalid_feedback').innerHTML = 'Ingresa tu e-mail';
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    localStorage.setItem('email', email);
    event.preventDefault();
    window.location.href = '/market.html';
  });

  const showHidePass = document.querySelector('.btn_show_hide_pass');
  const passInput = document.getElementById('password');
  showHidePass.addEventListener('click', (e) => {
    e.preventDefault();
    const i = showHidePass.querySelector('i');
    const show = i.classList.contains('bi-eye');
    if (show) {
      i.classList.remove('bi-eye');
      i.classList.add('bi-eye-slash');
      passInput.type = 'text';
    } else {
      i.classList.add('bi-eye');
      i.classList.remove('bi-eye-slash');
      passInput.type = 'password';
    }
  });
});

const clientId = document
  .querySelector('#g_id_onload')
  .getAttribute('data-client_id');

async function googleLogin(response) {
  let responsePayload;
  if (response.access_token) {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${
      response.access_token}`;
    responsePayload = await fetch(url).then((res) => res.json());
  } else {
    // eslint-disable-next-line no-undef
    responsePayload = jwt_decode(response.credential);
  }
  const { email } = responsePayload;
  localStorage.setItem('email', email);
  window.location.href = '/market.html';
}

// eslint-disable-next-line no-undef
const client = google.accounts.oauth2.initTokenClient({
  client_id: clientId,
  scope: 'openid',
  ux_mode: 'popup',
  response_type: 'id_token token',
  callback: googleLogin,
});

document
  .querySelector('#login_with_google')
  .addEventListener('click', (e) => {
    client.requestAccessToken();
    e.preventDefault();
  });
