import { UsbDevice } from "./UsbDevice";

export class Port {
    portNumber: number;
    physicalPort: number[];
    portPath: string;
    usbDevice: UsbDevice;

    constructor(portNumber: number, physical_port: number[], portPath: string) {
        this.portNumber = portNumber;
        this.physicalPort = physical_port;
        this.portPath = portPath;
    }

    setDevice(usbDevice: UsbDevice) {
        this.usbDevice = usbDevice;
    }
}