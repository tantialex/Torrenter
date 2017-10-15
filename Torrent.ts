export class Torrent {
    id: string;
    name: string;
    magnetLink: string;

    constructor(id: string, name: string, magnetLink: string) {
        this.id = id;
        this.name = name;
        this.magnetLink = magnetLink;
    }
}