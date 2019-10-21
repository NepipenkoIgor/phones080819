export const PhonesService = new class {
    constructor() {
        console.log('init phones service')
    }

    getAll({query, orderBy} = {}) {
        return this._sendRequest(`http://localhost:3000/phones/phones.json`)
            .then((phones) => {
                const filteredPhones = this._filter(query, phones);
                return this._sort(orderBy, filteredPhones);
            });
    }

    getOneById(phoneId) {
        return this._sendRequest(`http://localhost:3000/phones/${phoneId}.json`)
    }

    async _sendRequest(url, {method = 'GET'} = {}) {
        // return new Promise((res, rej) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open(method, url);
        //     xhr.addEventListener('load', () => {
        //         if (xhr.status !== 200) {
        //             rej(xhr.statusText)
        //         }
        //         res(JSON.parse(xhr.responseText));
        //     });
        //     xhr.send();
        // });
        const res = await fetch(url, {
            method,
            headers: [
                ['Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlnb3IiLCJpYXQiOjE1NjQxMzY0Nzd9.bgLlbxJjFs7OKLLu3FhboCqKXDDT4VZiCZNofjvWw68'],
                ['Content-type', 'application/json'],
                ['mykey', 'myvalue'],
            ]
        });
        return res.json();
    }

    _filter(query, phones) {
        if (!query) {
            return phones;
        }
        return phones.filter((phone) => phone.name.toLowerCase().includes(query))
    }

    _sort(orderBy, phones) {
        if (!orderBy) {
            return phones;
        }

        phones.sort((phone1, phone2) => {
            if (phone1[orderBy] > phone2[orderBy]) {
                return 1;
            }
            if (phone1[orderBy] < phone2[orderBy]) {
                return -1;
            }
            return 0;
        });
        return phones;
    }
};

