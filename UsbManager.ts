import { Port } from './Port';

export class UsbManager {
    usb;
    ports: Array<Port>;

    constructor(portList) {
        this.usb = require('usb');
        console.log(portList.ports);
        this.ports = new Array<Port>();

        for (let i = 0; i < portList.ports.length; i++) {
            this.ports[i] = new Port(portList.ports[i].port_number, portList.ports[i].physical_port_address, "");
        }
    }

    getDevices(): any {
        return this.usb.getDeviceList();
    }

    getAvailablePorts(): any {
        var ports = [];
        var deviceList = this.usb.getDeviceList();
        for (var i = 0; i < deviceList.length; i++) {
           // ports = ports.concat(deviceList[i].portNumbers);
            //ports.push(deviceList[i].busNumber);
            ports.push(deviceList[i].deviceAddress);    

        }
        return ports;
    }

    getPathOfPort(portNumber: number): string {
        this.ports.forEach(function (item) {
            if (item.portNumber == portNumber) {
                return item.portPath;
            }
        });
        throw new Error();
    }

    getAvailableBuses(): any {
        var ports = [];
        var deviceList = this.usb.getDeviceList();
        for (var i = 0; i < deviceList.length; i++) {
            // ports = ports.concat(deviceList[i].portNumbers);
            ports.push(deviceList[i].busNumber);

        }
        return ports;
    }
}