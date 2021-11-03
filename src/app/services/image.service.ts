import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getImages(articleId?: number, count?: number): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${environment.apiUrl}${ApiPaths.Images}${articleId ? ('?articleId=' + articleId) : ''}${count ? ('&count=' + count) : ''}`);
  }

  postImage(image: FormData): Observable<Image> {
    return this.httpClient.post<Image>(`${environment.apiUrl}${ApiPaths.Images}`, image);
  }

  getImage(imageId: number): Observable<Image> {
    return this.httpClient.get<Image>(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`);
  }

  patchImage(imageId: number, image: FormData): Observable<Image> {
    return this.httpClient.patch<Image>(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`, image)
  }

  deleteImage(imageId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${ApiPaths.Images}/${imageId}`);
  }
}
