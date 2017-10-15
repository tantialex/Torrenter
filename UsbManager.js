"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsbDevice_1 = require("./UsbDevice");
let driveList = require('drivelist');
let uuid = require('uuid');
function getDevicesFromDriveList(callback) {
    return driveList.list((error, drives) => {
        if (error) {
            throw error;
        }
        let devices = new Array();
        console.log(drives);
        for (let i = 0; i < drives.length; i++) {
            console.log(drives[i].mountpoints);
            if (drives[i].system === false) {
                let id = uuid.v4();
                devices.push(new UsbDevice_1.UsbDevice(id, drives[i].description, drives[i].size, drives[i].raw));
            }
        }
        callback(devices);
    });
}
class UsbManager {
    constructor() {
        let self = this;
        getDevicesFromDriveList(result => {
            self.devices = result;
            console.log("Devices Loaded!");
            console.log(result);
        });
    }
    getDevices() {
        return this.devices;
    }
    getPathById(id) {
        for (let deviceItem of this.devices) {
            if (deviceItem.id = id) {
                return deviceItem.path;
            }
        }
        throw new Error();
    }
}
exports.UsbManager = UsbManager;
//# sourceMappingURL=UsbManager.js.map