import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {BaseComponent} from "./shared/component/base/base.component.js";
import {PhonesService} from "./phones.service.js";
import {PhoneDetailsComponent} from "./phone-details/phone-details.component.js";
import {CartComponent} from "./cart/cart.component.js";

console.log(PhonesService);

export class PhonesPageComponent extends BaseComponent {

    constructor({element}) {
        super({element});
        this._render();
        this._initCatalog();
        this._initPhoneDetails();
        this._initCart();
    }

    _initCatalog() {
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            phones: PhonesService.getAll(),
        });

        this._catalog
            .subscribe('phone-selected', ({detail}) => {
                this._catalog.hide();
                this._phoneDetails.show(PhonesService.getOneById(detail));
            }).subscribe('add-to-cart', ({detail}) => {
            this._cart.add(detail);
        });
    }

    _initPhoneDetails() {
        this._phoneDetails = new PhoneDetailsComponent({
            element: this._element.querySelector('.phone-details'),
            onBack: () => {
                this._catalog.show();
                this._phoneDetails.hide();
            },
            onAdd: (phoneId) => {
                this._cart.add(phoneId);
            }
        })
    }

    _initCart() {
        this._cart = new CartComponent({
            element: this._element.querySelector('.cart'),
        })
    }

    _render() {
        this._element.innerHTML = `  <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section>
        <p>
          Search:
          <input>
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>

      <section class="cart">

      </section>
    </div>

    <!--Main content-->
    <div class="col-md-10 phones-catalog"> </div>
    <div class="col-md-10 phone-details"> </div>
  </div>`
    }
}
