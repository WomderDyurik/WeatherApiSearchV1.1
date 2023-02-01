import { Registr } from './registr';
import itemsUI, { ItemsUI } from './createElements';
import api from '../services/apiService';

class ProfileRender extends Registr {
  constructor() {
    super();
    this.container = document.querySelector('.weather-items');
  }

  renderProfile(name, arr) {
    if (Array.isArray(arr)) {
      super.render(name, arr);
    } else {
      this.renderItem(name, arr);
    }
    const profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach((el) => {
      el.addEventListener('click', () => {
        const text = el.textContent.split(',');
        itemsUI.clearContainer();
        api.searchWeatherOnCity(text[0].trim(), text[1].trim())
          .then((el) => {
            this.container.insertAdjacentHTML('afterbegin', ItemsUI.itemTemplate(el));
          });
      });
    });
  }

  renderItem(name, arr) {
    const item = super.renderProfile(name);
    const children = super.renderProfileItem(arr);
    this.profileEl.insertAdjacentHTML('afterbegin', item);
    const items = document.querySelector('.profile-items');
    items.insertAdjacentHTML('afterbegin', children);
  }
}

const profileRender = new ProfileRender();

export default profileRender;