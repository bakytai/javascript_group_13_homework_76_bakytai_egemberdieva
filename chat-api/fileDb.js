const fs = require('fs').promises;
const {nanoid} = require("nanoid");
const filename = './db.json';
let data = [];

module.exports  = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },

    getMessages() {
        return data.slice(data.length - 30);
    },

    getMessageFromDate() {

    },

    addMessage(message) {
        message.id = nanoid();
        message.dateTime = (new Date()).toISOString()
        data.push(message);
        return  this.save();
    },

    save() {
        return  fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
}

