import * as WebTorrent from 'webtorrent';
import * as Uuid from 'uuid';
import { Torrent } from './Torrent';

export class TorrentManager {
    client: WebTorrent.Instance;
    uuid: Uuid.Instance;
    torrentsRunning: { [name: string]: Torrent };

    constructor(instance: WebTorrent.Instance | null) {
        this.client = instance || new WebTorrent();
        this.torrentsRunning = {};
    }

    getDownloadSpeedOfTorrent(name: string): number {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);

        return torrent.downloadSpeed;
    }

    getPathOfTorrent(name: string): string {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);

        return torrent.path;
    }

    getTimeRemainingOfTorrent(name: string): number {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);

        return torrent.timeRemaining;
    }

    getProgressOfTorrent(name: string): number {
        let torrentId = this.torrentsRunning[name];
        let torrent = this.client.get(torrentId);

        return (torrent.progress * 100);
    }

    getTorrentIdById(id: string): Torrent {
        return this.torrentsRunning[id];
    }

    downloadTorrent(magnetLink: string, path: string, name?: string, onFinish?: (torrent: WebTorrent.Torrent) => void): void {
        let self: TorrentManager = this; 
        let options = {
            path: path
        };

        this.client.add(magnetLink, options, function (torrent: WebTorrent.Torrent) {
            let model = new Torrent("name", magnetLink);

            self.torrentsRunning[this.uuid.v4()] = model;

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