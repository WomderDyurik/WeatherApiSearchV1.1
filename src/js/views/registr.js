export class Registr {
  constructor() {
    this.profileEl = document.querySelector('.header__pop');
  }

  render(name, el) {
    const item = this.renderProfile(name);
    const children = this.renderProfileItems(el);
    this.profileEl.insertAdjacentHTML('afterbegin', item);
    const items = document.querySelector('.profile-items');
    items.insertAdjacentHTML('afterbegin', children);
  }

  renderProfile(name) {
    return `
		<div class="profile-pop">
			<div class="profile-name">${name}</div>
			<div class="profile-items">
			</div>
		</div>
		`;
  }

  renderProfileItems(arr) {
    if (!Array.isArray(arr)) {
      const item = this.renderProfileItem(el);
      return item;
    }
    let fragment = '';
    arr.forEach((el) => {
      const item = this.renderProfileItem(el);
      fragment += item;
    });
    return fragment;
  }

  renderProfileItem(el) {
    return `
			<div class="profile-item">${el.name}, ${el.country}</div>
		`;
  }
}
const registr = new Registr();
export default registr;
