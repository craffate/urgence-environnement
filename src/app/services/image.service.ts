import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Image } from '@interfaces/image';
import { environment } from '@src/environments/environment';
import { ApiPaths } from '@src/api-paths';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getImages(params?: HttpParams): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${environment.apiUrl}${ApiPaths.Images}`, { params: params });
  }

  postImages(images: FormData): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${ApiPaths.Images}`, images, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getImage(imageId: number): Observable<Image> {
    return this.httpClient.get<Image>(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`);
  }

  patchImage(imageId: number, image: FormData): Observable<HttpResponse<any>> {
    return this.httpClient.patch(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`, image, {observe: 'response'});
  }

  deleteImage(imageId: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`, {observe: 'response'});
  }
}
