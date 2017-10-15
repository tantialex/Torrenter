"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Port {
    constructor(portNumber, physical_port, portPath) {
        this.portNumber = portNumber;
        this.physicalPort = physical_port;
        this.portPath = portPath;
    }
    setDevice(usbDevice) {
        this.usbDevice = usbDevice;
    }
}
exports.Port = Port;
//# sourceMappingURL=Port.js.map