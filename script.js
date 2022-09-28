const app = {
  form: document.querySelector('.form'),
  email: document.getElementById('mail'),
  userName: document.getElementById('userName'),
  password: document.getElementById('password'),

  init() {
    app.addEventListener();
  },

  addEventListener() {
    const { form, email, userName, password } = app;

    /* email */
    email.addEventListener('change', app.test);
    email.addEventListener('invalid', app.error);
    email.addEventListener('focus', (e) => e.target.classList.add('focus'));
    email.addEventListener('blur', (e) => e.target.classList.remove('focus'));
    email.addEventListener('input', app.removeError);

    /* userName */
    userName.addEventListener('change', app.test);
    userName.addEventListener('invalid', app.error);
    userName.addEventListener('focus', (e) => e.target.classList.add('focus'));
    userName.addEventListener('blur', (e) =>
      e.target.classList.remove('focus')
    );
    userName.addEventListener('input', app.removeError);

    /* password */
    password.addEventListener('change', app.test);
    password.addEventListener('invalid', app.error);
    password.addEventListener('input', (e) => {
      app.test(e);
      app.removeError(e);
    });
    password.addEventListener('focus', (e) => e.target.classList.add('focus'));
    password.addEventListener('blur', (e) =>
      e.target.classList.remove('focus')
    );

    form.addEventListener('submit', app.validate);
  },

  validate(e) {
    const { email, userName, password } = app;

    if (!email.validity.valid) {
      app.error(this, 'mail');
      e.preventDefault();
    }
    if (!userName.validity.valid) {
      app.error(this, 'userName');
      e.preventDefault();
    }

    if (!password.validity.valid) {
      app.error(this, 'password');
      e.preventDefault();
    }
  },

  test(e) {
    const target = e.target;
    const errMsg = target.parentNode.lastElementChild;

    /* reset the validation object */
    target.setCustomValidity('');

    /* check the input attributes and return boolean  */
    const isValid = target.checkValidity();
    console.log(isValid);
    if (isValid) {
      target.classList.remove('notValidInput');
      errMsg.classList.add('hidden');
      target.classList.add('validInput');
    }
  },

  error(e, element) {
    /* if e not an element use the other parameter */
    const field = e.target || document.getElementById(element);
    const errMsg = field.parentNode.lastElementChild;
    const { valueMissing, patternMismatch } = field.validity;

    field.classList.add('notValidInput');
    errMsg.classList.remove('hidden');

    if (field.id === 'mail' && patternMismatch) {
      errMsg.textContent = 'Your email is not valid.';
    }

    if (field.id === 'userName' && valueMissing) {
      errMsg.textContent = 'Please enter a value';
      errMsg.classList.remove('hidden');
    }

    if (field.id === 'password') {
      const regUpper = /[A-Z]/g;
      const regLower = /[a-z]/g;
      const regSpecial = /\W+/g;
      const regNumber = /\d/g;

      field.value.match(regLower)
        ? app.match('lowercase-char')
        : app.noMatch('lowercase-char');

      field.value.match(regUpper)
        ? app.match('uppercase-char')
        : app.noMatch('uppercase-char');

      field.value.match(regSpecial)
        ? app.match('special-char')
        : app.noMatch('special-char');

      field.value.match(regNumber)
        ? app.match('number-char')
        : app.noMatch('number-char');

      field.value.length >= 8
        ? app.match('min-chars')
        : app.noMatch('min-chars');
    }
  },

  match(element) {
    document.querySelector(`.${element}`).classList.add('validPsw');
    document.querySelector(`.${element} span`).textContent = 'check';
  },

  noMatch(element) {
    document.querySelector(`.${element}`).classList.remove('validPsw');
    document.querySelector(`.${element} span`).textContent = 'close';
  },

  removeError(e) {
    const target = e.target;
    const id = e.target.id;
    const errMsg = e.target.parentNode.lastElementChild;
    if (id === 'mail' || id === 'userName') {
      target.classList.remove('notValidInput');
      errMsg.classList.add('hidden');
    }
    if (id === 'password') {
      target.classList.remove('notValidInput');
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);
