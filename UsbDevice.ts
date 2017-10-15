export class UsbDevice{
    id: string;
    description: string;
    size: number;
    path: string;

    constructor(id: string, description: string, size: number, path: string) {
        this.id = id;
        this.description = description;
        this.size = size;
        this.path = path;
    }
}