function memorizar(fn) {
    let cache = {};
    let rep = 0;

        let operacion = (a, b) => { return a + b; };

        return function (a, b) {
            let key = a + ',' + b;
            if (!(key in cache)) {
                cache[key] = operacion(a, b);
                rep++;
            }
            return cache[key] + ", llamadas: " + rep;
        };
    };

    return inputs.map();
}

let sumaMemo = memo();

console.log(sumaMemo([2, 2], [2, 2], [4, 2]));
console.log(sumaMemo([3, 4], [3, 4], [6, 4]));
console.log(sumaMemo(5, 6));
console.log(sumaMemo(3, 4));
console.log(sumaMemo(5, 6));
console.log(sumaMemo(6, 5));