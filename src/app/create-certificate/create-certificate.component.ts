import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../shared/artist';
import { Certificate } from '../shared/certificate';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css']
})
export class CreateCertificateComponent implements OnInit {

  Certificate: Certificate = {
    id: 0,
    title: "",
    //Make sure
    timestamp: new Date(),
    aws_imagePath: "",
    imageName: "",
    artist: {id: 0, name: ""}

  }
  Artists: Array<Artist> = []
  Artist: Artist = {id: 0, name:""}
  fileToUpload: File | null = null

  constructor(
    private restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArtists()
  }

  handleFileInput(event: any){
    this.fileToUpload = event.target.files[0];
  }

  loadArtists(): void{
    this.restApi.getArtists().subscribe((data:any) => {
      this.Artists = data;
      console.log(Artist);
    })
  }

  createCertificate(): void{
    if(window.confirm("Are you sure you want to create this champion?")){
      console.log("About to create a certificate")
      if(this.fileToUpload != null){
        if(this.Artist.id == -1){
          this.restApi.createArtist(this.Artist).subscribe((data: any) => {
            this.Certificate.artist = data
            this.restApi.createCertificate(this.Certificate).subscribe((data: any) => {
              this.restApi.uploadFile(data,this.fileToUpload!).subscribe((data: any) => {
                this.router.navigate(["/"])
              })
            })
          })
        }else{
          this.Certificate.artist.id = this.Artist.id;
          this.restApi.createCertificate(this.Certificate).subscribe((data: any) => {
              this.restApi.uploadFile(data,this.fileToUpload!).subscribe((data:any) => {
                this.router.navigate(["/"])
              })
          })
        }
      }else{
        alert("File cannot be empty!")
      }
    }
  }

}
