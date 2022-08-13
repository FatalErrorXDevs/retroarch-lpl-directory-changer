'use strict';

const { updateItem, readDirectoryForPlaylists } = require('./utils/utils')
const fs = require('fs');
const paths = require('path')

const folderToScan = './in/';
let {path, files} = readDirectoryForPlaylists(folderToScan);
const pathToPrePend = process.argv.length >= 2 ? process.argv[2] : '/home/deck/';
// botch
files = files.filter((ele) => ele !== '.DS_Store');

for (let fileName of files) {
    const playlistPath = paths.join(path, fileName);
    let playlist = loadPlaylist(playlistPath);
    playlist = updatePlaylistItems(playlist); 
    // write playlist name/ content back to out folder
    const out = paths.join(__dirname, '../out', fileName);
    fs.writeFileSync(out, JSON.stringify(playlist));
}


function loadPlaylist(itemToParse) {
    let rawData = fs.readFileSync(itemToParse);
    let playlist = JSON.parse(rawData);
    return playlist;
}

function updatePlaylistItems(playlist) {
    for (let [index, item] of playlist.items.entries()) {
        const updatedItem = updateItem(item, pathToPrePend);
        playlist.items[index] = updatedItem;
    }
    return playlist;
}

