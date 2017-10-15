import { UsbDevice } from './UsbDevice';
import { MountManager } from './MountManager';
let driveList = require('drivelist');
let uuid = require('uuid');

function getDevicesFromDriveList(callback): Promise<Array<UsbDevice>> {
    return driveList.list((error, drives) => {
        if (error) {
            throw error;
        }
        let devices: Array<UsbDevice> = new Array<UsbDevice>();
        console.log(drives);
        for (let i = 0; i < drives.length; i++) {
            let drive = drives[i];
            console.log(drives[i].mountpoints);
            if (drive.system === false) {
                if (drive.mountpoints.length === 0) {
                    let mountManager = new MountManager();
                    let mountPath = "/mounts/test";
                    mountManager.mount(mountPath, drive.raw).then(() => {
                        let id = uuid.v4();
                        devices.push(new UsbDevice(id, drive.description, drive.size, drive.mountPath));
                    });
                }
                let id = uuid.v4();
                devices.push(new UsbDevice(id, drive.description, drive.size, drive.mountpoints[0]));
            }
        }
        callback(devices);
    });
}

export class UsbManager {
    devices: Array<UsbDevice>;

    constructor() {
        let self = this;
        getDevicesFromDriveList(result => {
            self.devices = result;
            console.log("Devices Loaded!");
            console.log(result);
        });
    }

    getDevices(): Array<UsbDevice> {
        return this.devices;
    }

    getPathById(id: string): string{
        for (let deviceItem of this.devices) {
            if (deviceItem.id = id) {
                return deviceItem.path;
            }
        }
        throw new Error();
    }
}