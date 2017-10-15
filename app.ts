import { TorrentManager } from './TorrentManager';
import { UsbManager } from './UsbManager';
var fs = require('fs');
var torrentManager: TorrentManager = new TorrentManager(null);

let portConfig = require('./port_configuration.json');
console.log(portConfig);
var usbManager: UsbManager = new UsbManager(portConfig);

var driveList = require('drivelist');

var stdin = process.stdin;
stdin.setEncoding('utf8');

stdin.addListener("data", function (d) {
    var text = d.toString().trim().split(' ');
    var command = text[0];
    if (command === "drivelist") {
        driveList.list((error, drives) => {
            if (error) {
                throw error;
            }

            console.log(drives);
        });
    }
    if (command === "usb") {
        var ports = usbManager.getAvailablePorts();
        console.log(ports);
        console.log(ports.length);
    } else if (command === "bus") {
        var buses = usbManager.getAvailableBuses();
        console.log(buses);
        console.log(buses.length);
    } else if (command === "device") {
        var devices = usbManager.getDevices();
        console.log(devices);
        console.log(devices.length);
    } else if (command === "add") {
        //let path = UsbManager.
        //torrentManager.downloadTorrent(text[1], , function (torrent) {
        //    console.log("done");
        //});
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
