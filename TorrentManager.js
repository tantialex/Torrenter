"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebTorrent = require("webtorrent");
const Torrent_1 = require("./Torrent");
let uuid = require('uuid');
class TorrentManager {
    constructor(instance) {
        this.client = instance || new WebTorrent();
        this.torrentsRunning = new Array();
    }
    getTorrentIdById(id) {
        for (let torrent of this.torrentsRunning) {
            if (torrent.id === id) {
                return torrent;
            }
        }
        throw new Error();
    }
    getTorrents() {
        return this.torrentsRunning;
    }
    downloadTorrent(magnetLink, path, name, onFinish) {
        let self = this;
        let options = {
            path: path
        };
        console.log("Adding torrent: " + magnetLink);
        this.client.add(magnetLink, options, function (torrent) {
            let id = uuid.v4();
            self.torrentsRunning.push(new Torrent_1.Torrent(id, "name", magnetLink));
            console.log("Torrent added: " + id);
            if (onFinish !== null) {
                torrent.on('done', function () {
                    onFinish(torrent);
                });
            }
            console.log("Added");
        });
    }
    removeTorrent(id) {
        let self = this;
        this.client.remove(this.getTorrentIdById(id).magnetLink, function (err) {
            delete self.torrentsRunning[id];
        });
    }
    pauseTorrent(id) {
        let torrentMagnetLink = this.getTorrentIdById(id);
        this.client.torrents.forEach(function (torrent) {
            if (torrent.magnetURI === torrentMagnetLink) {
                torrent.pause();
            }
        });
    }
    resumeTorrent(id) {
        let torrentMagnetLink = this.getTorrentIdById(id);
        this.client.torrents.forEach(function (torrent) {
            if (torrent.magnetURI === torrentMagnetLink) {
                torrent.resume();
            }
        });
    }
    pauseAllTorrents() {
        this.client.torrents.forEach(function (torrent) {
            torrent.pause();
        });
    }
    resumeAllTorrents() {
        this.client.torrents.forEach(function (torrent) {
            torrent.resume();
        });
    }
}
exports.TorrentManager = TorrentManager;
//# sourceMappingURL=TorrentManager.js.map