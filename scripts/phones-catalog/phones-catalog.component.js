import {BaseComponent} from "../shared/component/base/base.component.js";

export class PhonesCatalogComponent extends BaseComponent {
    constructor({element, phones, onPhoneSelected}) {
        super({element});
        this._phones = phones;
        this._onPhoneSelected = onPhoneSelected;
        this._render();
        this._element.addEventListener('click', (event)=>{
            const parentLi = event.target.closest('.phone');
            if(!parentLi) {
                return;
            }
            this._onPhoneSelected(parentLi.dataset.phoneId)
        })
    }

    _render() {
        this._element.innerHTML = `
              <ul class="phones">
              ${this._phones.map((phone) => `
                      <li class="thumbnail phone" data-phone-id=${phone.id}>
          <a href="#!/phones/${phone.id}" class="thumb">
            <img alt=${phone.name} src=${phone.imageUrl}>
          </a>

          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success">
              Add
            </a>
          </div>

          <a href="#!/phones/${phone.id}">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>`).join('')}
      </ul>
        `
    }
}
