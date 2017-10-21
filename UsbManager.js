"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsbDevice_1 = require("./UsbDevice");
const MountManager_1 = require("./MountManager");
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
            let drive = drives[i];
            console.log(drives[i].mountpoints);
            if (drive.system === false) {
                if (drive.mountpoints.length === 0) {
                    let mountManager = new MountManager_1.MountManager();
                    let mountPath = "/mounts/test" + i;
                    console.log("Mounting " + drive.description);
                    mountManager.mount(mountPath, drive.raw).then(() => {
                        console.log("Mounted " + drive.description + " successfully at: " + drive.mountPath);
                        let id = uuid.v4();
                        devices.push(new UsbDevice_1.UsbDevice(id, drive.description, drive.size, drive.mountPath));
                    });
                }
                let id = uuid.v4();
                devices.push(new UsbDevice_1.UsbDevice(id, drive.description, drive.size, drive.mountpoints[0]));
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