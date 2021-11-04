import { Component, OnInit } from '@angular/core';
import { Certificate } from '../shared/certificate';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-list-certificates',
  templateUrl: './list-certificates.component.html',
  styleUrls: ['./list-certificates.component.css']
})
export class ListCertificatesComponent implements OnInit {

  Certificates: Array<Certificate> = []

  constructor(private restApi: RestApiService) { }


  loadCertificates(){
    this.restApi.getCertificates().subscribe((data: any) => {
      this.Certificates = data
      console.log(this.Certificates)
    })
  }

  ngOnInit(): void {
    this.loadCertificates()
  }

}
