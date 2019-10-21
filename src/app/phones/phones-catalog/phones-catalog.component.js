import {BaseComponent} from "../../shared/component/base/base.component.js";

export class PhonesCatalogComponent extends BaseComponent {

    constructor({element}) {
        super({element});
        this._phones = [];
        this._render();

        this
            .on('click', '.thumb', ({delegateTarget: {dataset: {phoneId}}}) => {
                this.emit('phone-selected', phoneId);
            })
            .on('click', '.add', ({delegateTarget: {dataset: {phoneId}}}) => {
                this.emit('add-to-cart', phoneId);
            })
    }

    show(phones) {
        this._phones = phones;
        this._render();
        super.show();
    }


    _render() {
        this._element.innerHTML = `
              <ul class="phones">
              ${this._phones.map((phone) => `
                      <li class="thumbnail phone" data-phone-id=${phone.id}>
          <a href="#!/phones/${phone.id}" class="thumb" data-phone-id=${phone.id}>
            <img alt=${phone.name} src=${phone.imageUrl}>
          </a>

          <div class="phones__btn-buy-wrapper add"  data-phone-id=${phone.id}>
            <a class="btn btn-success ">
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
