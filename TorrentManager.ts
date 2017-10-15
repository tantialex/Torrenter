import * as WebTorrent from 'webtorrent';
import { Torrent } from './Torrent';

let uuid = require('uuid');

export class TorrentManager {
    client: WebTorrent.Instance;
    torrentsRunning: Array<Torrent>

    constructor(instance: WebTorrent.Instance | null) {
        this.client = instance || new WebTorrent();
        this.torrentsRunning = new Array<Torrent>();
    }

    getTorrentIdById(id: string): Torrent {
        for (let torrent of this.torrentsRunning) {
            if (torrent.id === id) {
                return torrent;
            }
        }
        throw new Error();
    }

    getTorrents(): Array<Torrent> {
        return this.torrentsRunning;
    }

    downloadTorrent(magnetLink: string, path: string, name?: string, onFinish?: (torrent: WebTorrent.Torrent) => void): void {
        let self: TorrentManager = this; 
        let options = {
            path: path
        };

        this.client.add(magnetLink, options, function (torrent: WebTorrent.Torrent) {
            let id = uuid.v4();

            this.torrentsRunning.push(new Torrent(id, "name", magnetLink));
            console.log("Torrent added: " + id);

            if (onFinish !== null) {
                torrent.on('done', function () {
                    onFinish(torrent);
                });
            }
            console.log("Added");
        });
    }

    removeTorrent(id: string): void {
        let self: TorrentManager = this;
        this.client.remove(this.getTorrentIdById(id).magnetLink, function (err) {
            delete self.torrentsRunning[id];
        });
    }

    pauseTorrent(id: string): void {
        let torrentMagnetLink = this.getTorrentIdById(id);
        this.client.torrents.forEach(function (torrent: WebTorrent.Torrent) {
            if (torrent.magnetURI === torrentMagnetLink) {
                torrent.pause();
            }
        });
    }

    resumeTorrent(id: string): void {
        let torrentMagnetLink = this.getTorrentIdById(id);
        this.client.torrents.forEach(function (torrent: WebTorrent.Torrent) {
            if (torrent.magnetURI === torrentMagnetLink) {
                torrent.resume();
            }
        });
    }

    pauseAllTorrents(): void {
        this.client.torrents.forEach(function (torrent: WebTorrent.Torrent) {
            torrent.pause();
        });
    }

    resumeAllTorrents(): void {
        this.client.torrents.forEach(function (torrent: WebTorrent.Torrent) {
            torrent.resume();
        });
    }
}