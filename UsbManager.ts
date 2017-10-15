import { UsbDevice } from './UsbDevice';
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
            if (drives[i].system === false) {
                let id = uuid.v4();
                devices.push(new UsbDevice(id, drives[i].description, drives[i].size, drives[i].raw));
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