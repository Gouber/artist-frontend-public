import { Artist } from "./artist";

export class Certificate {

    constructor(){
        this.id=0;
        this.title="";
        this.timestamp= new Date();
        this.aws_imagePath="";
        this.imageName="";
        this.artist = {id: 0, name: ''};
    }
    id: Number;
    title: string;
    timestamp: Date;
    aws_imagePath: string;
    imageName: string;
    artist: Artist
}
