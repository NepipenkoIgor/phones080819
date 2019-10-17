import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {BaseComponent} from "./shared/component/base/base.component.js";
import {PhonesService} from "./phones.service.js";
import {PhoneDetailsComponent} from "./phone-details/phone-details.component.js";
import {CartComponent} from "./cart/cart.component.js";
import {FiltersComponent} from "./filters/filters.component.js";

console.log(PhonesService);

export class PhonesPageComponent extends BaseComponent {

    constructor({element}) {
        super({element});
        this._render();
        this._initCatalog();
        this._initPhoneDetails();
        this._initCart();
        this._initFilters();
    }

    _initCatalog() {
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog')
        });
        // this._catalog.show(PhonesService.getAll({}));
        this._showFilteredPhones();
        this._catalog
            .subscribe('phone-selected', ({detail}) => {
                this._catalog.hide();
                this._phoneDetails.show(PhonesService.getOneById(detail));
            })
            .subscribe('add-to-cart', ({detail}) => {
                this._cart.add(detail);
            });
    }

    _initPhoneDetails() {
        this._phoneDetails = new PhoneDetailsComponent({
            element: this._element.querySelector('.phone-details'),
            onBack: () => {
                // this._catalog.show();
                this._showFilteredPhones();
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

    _initFilters() {
        this._filter = new FiltersComponent({
            element: this._element.querySelector('.filters'),
        })

        this._filter
            .subscribe('filter', (e) => {
                this._query = e.detail;
                this._showFilteredPhones();
            })
            .subscribe('change-order', (e) => {
                this._orderBy = e.detail;
                this._showFilteredPhones();
            })
    }

    async _showFilteredPhones() {
        // const phones = PhonesService.getAll({query: this._query, orderBy: this._orderBy});
        // PhonesService.getAll({query: this._query, orderBy: this._orderBy}, (phones) => {
        //     this._catalog.show(phones);
        // });
        const phones = await PhonesService.getAll({query: this._query, orderBy: this._orderBy});
        this._catalog.show(phones);
    }

    _render() {
        this._element.innerHTML = `  <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section class="filters">
   
      </section>

      <section class="cart"></section>
    </div>

    <!--Main content-->
    <div class="col-md-10 phones-catalog"> </div>
    <div class="col-md-10 phone-details"> </div>
  </div>`
    }
}
