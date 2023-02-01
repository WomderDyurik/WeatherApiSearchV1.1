import api from './services/apiService';
import itemsUI, { ItemsUI } from './views/createElements';
import cityConfig from './config/defaultCongif';
import UI from './config/uiConfig';
import validate from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import login from './services/authServices';
import { notify } from './views/notifications';
import profileRender from './views/profileRender';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.weather-btn');
  const input = document.querySelector('.weather-input');
  const container = document.querySelector('.weather-items');
  const headerProfile = document.querySelector('.header__profile-image');
  const {
    form, inputEmail, inputPassword, inputName,
  } = UI;
  const inputs = [inputEmail, inputPassword, inputName];

  initApp();

  btn.addEventListener('click', () => {
    itemsUI.clearContainer();
    api.searchGeoLocation(input.value)
      .then((el) => {
        for (let i = 0; i < el.length - 1; i++) {
          if (el[i].country == el[i + 1].country && el[i].name == el[i + 1].name) {
            delete el[i];
          }
        }
        el.forEach((element) => {
          api.searchWeatherOnCity(element.name, element.country)
            .then((el) => {
              container.insertAdjacentHTML('afterbegin', ItemsUI.itemTemplate(el));
            });
        });
      });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
  });
  inputs.forEach((el) => el.addEventListener('focus', () => removeInputError(el)));

  headerProfile.addEventListener('click', () => {
    const pop = document.querySelector('.header__pop');
    pop.classList.toggle('show');
  });

  async function initApp() {
    await itemsUI.defaultRender(cityConfig);
  }

  async function onSubmit() {
    const isValidForm = inputs.every((el) => {
      const isValidInput = validate(el);
      if (!isValidInput) {
        showInputError(el);
      }
      return isValidInput;
    });
    if (!isValidForm) return;

    try {
      await login(inputEmail.value, inputPassword.value);
      // form.reset();
      notify({ msg: 'Login success', className: 'alert-success' });
      const arr = [{ name: 'Moscow', country: 'RU' }, { name: 'Rio', country: 'BR' }];
      const arr1 = { name: 'Moscow', country: 'RU' };
      if (inputName.value.length == 0) {
        form.remove();
        profileRender.renderProfile('User1', arr1);
      } else {
        form.remove();
        profileRender.renderProfile(inputName.value, arr1);
      }
    } catch (error) {
      notify({ msg: 'Login failed', className: 'alert-danger' });
    }
  }
});