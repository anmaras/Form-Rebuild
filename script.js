const app = {
  form: document.querySelector('.form'),
  email: document.getElementById('mail'),
  userName: document.getElementById('userName'),
  password: document.getElementById('password'),
  pswText: document.querySelector('.psw-text'),
  pswIcon: document.querySelector('.psw-eye'),
  mainErrMsg: document.querySelector('.entry-error-container'),

  init() {
    app.addEventListener();
  },

  addEventListener() {
    const { form, email, userName, password, pswText } = app;

    /* email */
    email.addEventListener('change', app.test);
    email.addEventListener('invalid', app.error);
    email.addEventListener('input', app.removeError);
    email.addEventListener('focus', (e) => e.target.classList.add('focus'));
    email.addEventListener('blur', (e) => e.target.classList.remove('focus'));

    /* userName */
    userName.addEventListener('change', app.test);
    userName.addEventListener('invalid', app.error);
    userName.addEventListener('input', app.removeError);
    userName.addEventListener('focus', (e) => e.target.classList.add('focus'));
    userName.addEventListener('blur', (e) =>
      e.target.classList.remove('focus')
    );

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

    pswText.addEventListener('click', this.passwordVisible);
  },

  validate(e) {
    /* validate form on submit */
    const { email, userName, password, mainErrMsg } = app;

    const arr = [
      {
        valid: email.validity.valid,
        error() {
          app.error(this, 'mail');
        },
      },
      {
        valid: userName.validity.valid,
        error() {
          app.error(this, 'userName');
        },
      },
      {
        valid: password.validity.valid,
        error() {
          app.error(this, 'password');
        },
      },
    ];

    arr.forEach((obj) => {
      if (!obj.valid) {
        obj.error();
        mainErrMsg.classList.remove('hidden');
        e.preventDefault();
      }
    });
  },

  test(e) {
    const target = e.target;
    const errMsg = target.parentNode.lastElementChild;
    /* reset the validation object */
    target.setCustomValidity('');
    /* check the input attributes and return boolean  */
    const isValid = target.checkValidity();

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
    if (field.id === 'mail' && valueMissing) {
      errMsg.textContent = 'Please enter a value.';
    }

    if (field.id === 'userName' && valueMissing) {
      errMsg.textContent = 'Please enter a value';
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

  passwordVisible() {
    let { password, pswIcon, pswText } = app;

    if (password.type === 'password') {
      password.type = 'text';
      pswIcon.textContent = 'visibility_off';
      pswText.textContent = 'Hide';
    } else {
      password.type = 'password';
      pswIcon.textContent = 'visibility';
      pswText.textContent = 'Show';
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
