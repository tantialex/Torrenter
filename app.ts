﻿import { TorrentManager } from './TorrentManager';
import { UsbManager } from './UsbManager';
var fs = require('fs');
var torrentManager: TorrentManager = new TorrentManager(null);

var usbManager: UsbManager = new UsbManager();

var driveList = require('drivelist');

var stdin = process.stdin;
stdin.setEncoding('utf8');

stdin.addListener("data", function (d) {
    var text = d.toString().trim().split(' ');
    var command = text[0];
    if (command === "drivelist") {
        console.log(usbManager.getDevices());
    }else if (command === "add") {
        let deviceId = text[1];
        let magnetLink = text[2];

        let path = usbManager.getPathById(deviceId);

        torrentManager.downloadTorrent(magnetLink, path, "name", function (torrent) {
            console.log("done");
        });
    } else if (command === "progress") {
        console.log(torrentManager.getProgressOfTorrent(text[1]));
    } else if (command === "time") {
        console.log(torrentManager.getTimeRemainingOfTorrent(text[1]));
    } else if (command === "stop") {
        console.log((torrentManager.getTimeRemainingOfTorrent(text[1])/1000/60)+" minutes");
    } else if (command === "path") {
        console.log(torrentManager.getPathOfTorrent(text[1]));
    } else if (command === "speed") {
        console.log((torrentManager.getDownloadSpeedOfTorrent(text[1])/1024.0/1024.0) +" MB/s");
    }else if (command === "e") {
        process.exit();
    }
});

console.log("Done");
