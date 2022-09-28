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

    email.addEventListener('change', app.test);
    email.addEventListener('invalid', app.error);
    email.addEventListener('input', (e) => {
      const errMsg = e.target.parentNode.lastElementChild;
      email.classList.remove('notValidInput');
      errMsg.classList.add('hidden');
    });

    userName.addEventListener('change', app.test);
    userName.addEventListener('invalid', app.error);

    form.addEventListener('submit', app.validate);
  },

  validate(e) {
    e.preventDefault();
    const { email, userName, password } = app;

    if (!email.validity.valid) {
      app.error(this, 'mail');
    }
    if (!userName.validity.valid) {
      app.error(this, 'userName');
    }
  },

  test(e) {
    const target = e.target;
    const errMsg = target.parentNode.lastElementChild;

    target.setCustomValidity('');

    /* check the input attributes and return boolean  */
    const currently = target.checkValidity();
    if (currently) {
      target.classList.remove('notValidInput');
      errMsg.classList.add('hidden');
      target.classList.add('validInput');
    }
  },

  error(e, element) {
    const field = e.target || document.getElementById(element);
    const errMsg = field.parentNode.lastElementChild;
    const { valid, valueMissing, patternMismatch } = field.validity;

    field.classList.add('notValidInput');
    errMsg.classList.remove('hidden');

    if (field.id === 'mail' && patternMismatch) {
      errMsg.textContent = 'Not the correct email pattern';
    }
    if (field.id === 'userName' && patternMismatch) {
      errMsg.textContent = 'Not the correct userName pattern';
    }

    console.log(field.validity);
  },
};

document.addEventListener('DOMContentLoaded', app.init);
