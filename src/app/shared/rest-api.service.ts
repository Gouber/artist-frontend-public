import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Certificate } from './certificate';
import { Artist } from './artist';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  
  apiUrl = "http://localhost:8080/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  uploadFile(certificate: Certificate, file: File){
    const formData = new FormData()
    formData.append("file", file)
    formData.append("id", certificate.id.toString())
    return this.http.post<any>(this.apiUrl + "certificate/upload/", formData)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }

  createCertificate(certificate:Certificate): Observable<Certificate> {
    console.log(JSON.stringify(certificate))
    return this.http.post<Certificate>(this.apiUrl + 'certificate/', JSON.stringify(certificate), this.httpOptions)
    .pipe(                                            
      retry(1),
      catchError(this.handleError)
    )
  }

  createArtist(artist:Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl + 'artist/', JSON.stringify(artist), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCertificates(): Observable<Certificate> {
    return this.http.get<Certificate>(this.apiUrl + "certificate/")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getArtists(): Observable<Artist>{
    return this.http.get<Artist>(this.apiUrl + "artist/")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


}
