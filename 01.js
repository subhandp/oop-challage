var MD5 = require("crypto-js/md5");
var SHA1 = require("crypto-js/sha1");
var SHA256 = require('crypto-js/sha256');
var SHA512 = require('crypto-js/hmac-sha512');
var Base64 = require('crypto-js/enc-base64');

class Hash {
    md5(text) {
        console.log(Base64.stringify(MD5(text)));
    }
    sha1(text) {
        console.log(Base64.stringify(SHA1(text)));
    }
    sha256(text) {
        console.log(Base64.stringify(SHA256(text)));
    }
    sha512(message, nonce, path, privateKey) {

        const hashDigest = this.sha256(nonce + message);
        const hmacDigest = Base64.stringify(SHA512(path + hashDigest, privateKey));
        console.log(hmacDigest);
    }
}

let hash = new Hash();
hash.md5('subhan');
hash.sha1('subhan');
hash.sha256('subhan');