import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { uploadFiles } from '../components/vimeo/vimeo.component';
import * as tus from 'tus-js-client';
@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  private api = 'https://api.vimeo.com/me/videos';
  private accessToken = '938a8b2d1e52b3d0f9236313efa14527';

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
  }pa

  // GET
  // https://api.vimeo.com/users/{user_id}/albums/{album_id}/videos
  // https://api.vimeo.com/me/albums/{album_id}/videos

  getVideo(): Observable<any> {
    // "/users/97869729/videos",
    const album = '97869729';
    // const URL = `https://api.vimeo.com/me/albums/${album}/videos`;
    // const URL = 'https://api.vimeo.com/users/97869729/projects/728029/videos';
    const URL = 'https://api.vimeo.com/me/videos';
    const header: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accessToken)
      .set('Content-Type', 'application/json');
    return this.http.get(URL, {
      headers: header,
      observe: 'response'
    });
  }

  public tusUpload(
    file: uploadFiles,
    i: number,
    videoArray: uploadFiles[],
    uploadArray: tus.Upload[],
    success: any,
  ): tus.Upload {
    const upload = new tus.Upload(file.video, {
      uploadUrl: file.uploadURI,
      endpoint: file.uploadURI,
      retryDelays: [0, 1000, 3000, 5000],
      onError: error => {
        console.log('Failed: ' + file.video.name + error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(
          'file: ' + i + ' of ' + (videoArray.length - 1) + ':',
          bytesUploaded,
          bytesTotal,
          percentage + '%'
        );
      },
      onSuccess: () => {
        console.log('Download' + file.video.name + 'from' + upload.url);
        if (i < videoArray.length - 1) {
          uploadArray[i + 1].start();
        } else {
          success();
          console.log('Videos uploaded successfully');
        }
      }
    });
    return upload;
  }

}
