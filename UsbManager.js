"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Port_1 = require("./Port");
class UsbManager {
    constructor(portList) {
        this.usb = require('usb');
        console.log(portList.ports);
        this.ports = new Array();
        for (let i = 0; i < portList.ports.length; i++) {
            this.ports[i] = new Port_1.Port(portList.ports[i].port_number, portList.ports[i].physical_port_address, "");
        }
    }
    getDevices() {
        return this.usb.getDeviceList();
    }
    getAvailablePorts() {
        var ports = [];
        var deviceList = this.usb.getDeviceList();
        for (var i = 0; i < deviceList.length; i++) {
            // ports = ports.concat(deviceList[i].portNumbers);
            //ports.push(deviceList[i].busNumber);
            ports.push(deviceList[i].deviceAddress);
        }
        return ports;
    }
    getPathOfPort(portNumber) {
        this.ports.forEach(function (item) {
            if (item.portNumber == portNumber) {
                return item.portPath;
            }
        });
        throw new Error();
    }
    getAvailableBuses() {
        var ports = [];
        var deviceList = this.usb.getDeviceList();
        for (var i = 0; i < deviceList.length; i++) {
            // ports = ports.concat(deviceList[i].portNumbers);
            ports.push(deviceList[i].busNumber);
        }
        return ports;
    }
}
exports.UsbManager = UsbManager;
//# sourceMappingURL=UsbManager.js.map