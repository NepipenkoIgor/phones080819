import {BaseComponent} from "../../shared/component/base/base.component.js";
import template from './filters.component.hbs';

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
        this._element.innerHTML = template()
    }
}
