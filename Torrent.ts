export class Torrent {
    name: string;
    magnetLink: string;

    constructor(name: string, magnetLink: string) {
        this.name = name;
        this.magnetLink = magnetLink;
    }
}