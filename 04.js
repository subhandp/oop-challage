const fs = require('fs');



const jsonStorageAdapter = { //adapter untuk penyimpanan json file
    getAll: function() {
        let jsonData = fs.readFileSync('data.json').toString('utf8');
        if (jsonData)
            this.storageConfig = JSON.parse(jsonData);
        else
            this.storageConfig = undefined;
    },
    get: function(name) {
        this.getAll();
        if (this.storageConfig) {
            if (this.storageConfig[name]) {
                return console.log(this.storageConfig[name]);
            } else {
                return console.log('not found data');
            }
        } else {
            return console.log('not found data');
        }
    },
    put: function(configsName, ConfigsValue) {
        this.getAll();
        if (this.storageConfig) {
            if (this.storageConfig[configsName]) {
                console.log('success update data config');
                this.storageConfig[configsName] = ConfigsValue;
            } else {
                console.log('success tambah data config');
                this.storageConfig[configsName] = ConfigsValue;
            }
        } else {
            console.log('create new data config');
            this.storageConfig = {};
            this.storageConfig[configsName] = ConfigsValue;
        }

        this.storageConfig = JSON.stringify(this.storageConfig);
        fs.writeFile('data.json', this.storageConfig, err => {
            if (err) {
                console.error(err)
                return
            }
        })

    },
    remove: function(name) {
        this.getAll();
        if (this.storageConfig) {
            if (this.storageConfig[name]) {
                delete this.storageConfig[name];
                this.storageConfig = JSON.stringify(this.storageConfig);
                fs.writeFile('data.json', this.storageConfig, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
                return console.log('success deleted');
            } else {
                return console.log('not found data');
            }
        } else {
            return console.log('not found data');
        }
    }
}

//adapter pattern
function Config(adapter) {
    this.adapter = adapter;
}

Config.prototype.put = function(name, value) {
    var adapter = this.adapter;
    return adapter.put(name, value);
};
Config.prototype.get = function(name) {
    var adapter = this.adapter;
    return adapter.get(name);
};
Config.prototype.remove = function(name) {
    var adapter = this.adapter;
    return adapter.remove(name);
};

const config = new Config(jsonStorageAdapter);

config.put('urlmy', 'www.google.com');