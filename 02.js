class Cipher {
    constructor() {
        this.map = {
            a: 'q',
            b: 'w',
            c: 'e',
            d: 'r',
            e: 't',
            f: 'y',
            g: 'u',
            h: 'i',
            i: 'o',
            j: 'p',
            k: 'a',
            l: 's',
            m: 'd',
            n: 'f',
            o: 'g',
            p: 'h',
            q: 'j',
            r: 'k',
            s: 'l',
            t: 'z',
            u: 'x',
            v: 'c',
            w: 'v',
            x: 'b',
            y: 'n',
            z: 'm'
        };
    }

    operation(map, text) {
        let operation = text.split('').filter(function(v) {
            return map.hasOwnProperty(v.toLowerCase());
        }).map(function(v) {
            return map[v.toLowerCase()].toUpperCase();
        }).join('');

        return operation;
    }

    encrypte(text) {
        return this.operation(this.map, text);
    }

    decrypte(cipher) {
        const flipMap = (function() {
            var tmp = {};
            var k;

            for (k in this.map) {
                if (!this.map.hasOwnProperty(k)) continue;
                tmp[this.map[k]] = k;
            }

            return tmp;
        }.bind(this))();

        return this.operation(flipMap, cipher);
    }


};

let cipher = new Cipher();
const a = cipher.encrypte('subhan');
const b = cipher.decrypte(a);
console.log(a);
console.log(b);