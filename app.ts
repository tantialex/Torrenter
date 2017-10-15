import { TorrentManager } from './TorrentManager';
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
    if (command === "devicelist") {
        console.log(usbManager.getDevices());
    }else if (command === "add") {
        let deviceId = text[1];
        let magnetLink = text[2];

        let path = usbManager.getPathById(deviceId);

        torrentManager.downloadTorrent(magnetLink, path, "name", function (torrent) {
            console.log("done");
        });
    } else if (command === "torrentlist") {
        console.log(torrentManager.getTorrents());
    }else if (command === "e") {
        process.exit();
    }
});

console.log("Done");
