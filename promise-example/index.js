const userPromise = new Promise((res) => {
    setTimeout(() => {
        res({name: 'Igor', bonus: 0.2});
    }, 2000)
});

const productsPromise = new Promise((res, rej) => {
    setTimeout(() => {
        // res([{price: 300, title: 'IWatch'}, {price: 1000, title: 'IPhone10'}]);
        rej('Error http')
    }, 4000)
});

getProductsWithBonuses();


async function getProductsWithBonuses() {
    try {
        const [user, products] = await Promise.all([userPromise, productsPromise])
        const productsWithBonuses = products.map((product) => {
            return {...product, price: product.price * (1 - user.bonus)};
        });
        console.log(productsWithBonuses);
    } catch (e) {
        console.log(e);
        return [];
    }
}


// Promise.all([userPromise, productsPromise])
//     .then(([user, products]) => {
//         return products.map((product) => {
//             return {...product, price: product.price * (1 - user.bonus)};
//         })
//     })
//     .then((products) => {
//         console.log(products)
//     });


// const p3 = new Promise((res) => {
//     setTimeout(() => {
//         res('NodeJS');
//     }, 4000)
// });

// Promise.race([p1, p2,])
//     .then((js) => {
//         console.log(js)
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// p1
//     .then((value) => {
//         console.log('step 1 =>', value);
//     })
//     .then((value) => {
//         console.log('step 2 =>', value);
//     })
//     .then((value) => {
//         console.log('step 3 =>', value);
//         return p1;
//     })
//     .then((value) => {
//         console.log('step 4 =>', value);
//     })
//     .then(() => p2)
//     .then((value) => {
//         console.log('step 6 =>', value);
//     })
//     .then((value) => {
//         console.log('step 7 =>', value);
//     })
//     .catch((err) => {
//         console.log(err);
//         return 2;
//     })
//     .then((value) => {
//         console.log('step 8 =>', value);
//     })
//     .catch((err) => {
//         console.log(err);
//         return 2;
//     });


// setTimeout(() => {
//     console.log('after 4s ')
//     p1
//         .then((value) => {
//             console.log('step 1 =>', value);
//         })
//         .then((value) => {
//             console.log('step 2 =>', value);
//         })
//         .then((value) => {
//             console.log('step 3 =>', value);
//             return 1;
//         })
//         .then((value) => {
//             console.log('step 4 =>', value);
//         });
// }, 4000)
