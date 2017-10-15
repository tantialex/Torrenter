"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebTorrent = require("webtorrent");
const Torrent_1 = require("./Torrent");
class TorrentManager {
    constructor(instance) {
        this.client = instance || new WebTorrent();
        this.torrentsRunning = {};
    }
    getDownloadSpeedOfTorrent(name) {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);
        return torrent.downloadSpeed;
    }
    getPathOfTorrent(name) {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);
        return torrent.path;
    }
    getTimeRemainingOfTorrent(name) {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);
        return torrent.timeRemaining;
    }
    getProgressOfTorrent(name) {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);
        return (torrent.progress * 100);
    }
    getTorrentIdById(id) {
        return this.torrentsRunning[id];
    }
    downloadTorrent(magnetLink, path, name, onFinish) {
        let self = this;
        let options = {
            path: path
        };
        this.client.add(magnetLink, options, function (torrent) {
            let model = new Torrent_1.Torrent("name", magnetLink);
            self.torrentsRunning[this.uuid.v4()] = model;
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