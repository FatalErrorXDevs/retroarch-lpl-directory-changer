//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 

function readDirectoryForPlaylists() {
    const fs = require('fs'); 
    try {
        const files = fs.readdirSync(path.join(__dirname + '../../../in'));
        return {path: path.join(__dirname + '../../../in'), files};
    
    } catch (err) {
        console.log(err);
    }
}

function updateItem(item, pathToPrePend) {
    const newPath = `${pathToPrePend}${item.path}`;
    item.path = newPath;
    return item;
}

exports.updateItem = updateItem;
exports.readDirectoryForPlaylists = readDirectoryForPlaylists;