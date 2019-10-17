import {BaseComponent} from "../shared/component/base/base.component.js";

export class FiltersComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this.render();
        this
            .on('input', '.search', ({delegateTarget: {value}}) => {
                this.emit('filter', value)
            })
            .on('change', '.sort', ({delegateTarget: {value}}) => {
                this.emit('change-order', value)
            })
    }

    render() {
        this._element.innerHTML = `
                <p>
          Search:
          <input type="text" class="search">
        </p>

        <p>
          Sort by:
          <select class="sort">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
        `
    }
}
