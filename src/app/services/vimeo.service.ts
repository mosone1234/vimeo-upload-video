import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  private api = 'https://api.vimeo.com/me';
  private accessToken = '72d65e60edbe3e36bcec451690cbb05d';

  constructor(
    private http: HttpClient
  ) { }

  createVideo(file: File): Observable<any> {
    const body = {
      name: file.name,
      upload: {
        approach: 'tus',
        size: file.size
      }
    };
    console.log(file);
    const header: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accessToken)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/vnd.vimeo.*+json;version=3.4');
    return this.http.post(this.api, body, {
      headers: header,
      observe: 'response'
    });
  }

  // GET

  // https://api.vimeo.com/users/{user_id}/albums/{album_id}/videos

  // https://api.vimeo.com/me/albums/{album_id}/videos

  getVideo(): Observable<any> {
    // "/users/97869729/videos",
    const album = '97869729';
    // const URL = `https://api.vimeo.com/me/albums/${album}/videos`;
    const URL = 'https://api.vimeo.com/users/97869729/projects/728029/videos';
    const header: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accessToken)
      .set('Content-Type', 'application/json');
    return this.http.get(URL, {
      headers: header,
      observe: 'response'
    });
  }
}
