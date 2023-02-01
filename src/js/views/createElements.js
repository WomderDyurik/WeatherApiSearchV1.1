import api from '../services/apiService';

export class ItemsUI {
  constructor() {
    this.container = document.querySelector('.weather-items');
  }

  defaultRender(arr) {
    const fragment = '';
    arr.forEach((el) => {
      api.searchWeatherOnCity(el.city, el.country)
        .then((el) => {
          const itemTemplate = ItemsUI.itemTemplate(el);
          this.container.insertAdjacentHTML('afterbegin', itemTemplate);
        });
    });

    this.container.innerHTML = fragment;
  }

  renderItems(arr) {
    this.clearContainer();

    if (!arr.length) {
      this.showEmptyMessage();
      return;
    }

    let fragment = '';

    arr.forEach((element) => {
      const itemTemplate = ItemsUI.itemTemplate(element);
      fragment += itemTemplate;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMessage() {
    const template = ItemsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
			<div class='empty-msg'>По вашему запросу ничего не найдено</div>
		`;
  }

  static itemTemplate(item) {
    const { country } = item.sys;
    return `
			<div class="weather-item">
				<div class="item-city">${item.name}, ${country}</div>
				<div class="item-right">
					<div class="item-deg">${`${Math.round(item.main.temp - 273)}&deg;`}</div>
					<div class="item-description">${item.weather[0].description}</div>
					<div class="features">
						<img class="item-image" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
					</div>
					<div class="item-delete">x</div>
				</div>
			</div>
			`;
  }
}

const itemsUI = new ItemsUI();

export default itemsUI;
