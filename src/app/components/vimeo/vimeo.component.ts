import { Component, OnInit } from '@angular/core';
import { VimeoService } from 'src/app/services/vimeo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, expand } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import Player from '@vimeo/player';

export class uploadFiles {
  constructor(public video: File, public path: string, public uploadURI: string) {
    this.video = video;
    this.path = path;
    this.uploadURI = uploadURI;
  }
}

@Component({
  selector: 'app-vimeo',
  templateUrl: './vimeo.component.html',
  styleUrls: ['./vimeo.component.css']
})
export class VimeoComponent implements OnInit {

  videos: any[] = [];
  fileVideo: any = '';
  title = 'vimeo-uploader';
  videoList: FileList;
  videoLinks = [];
  pendingFiles: uploadFiles[] = [];

  video: any = '335715916';
  private language = 'en';
  private player;

  constructor(
    private vimeoService: VimeoService,
    private sanitizer: DomSanitizer,
  ) {
    this.transform(this.video);
  }

  ngOnInit() {
    this.initPlayer();
    this.getVideos();
  }

  getVideos() {
    this.vimeoService.getVideo().subscribe(
      (res) => {
        console.log('Estos son los videos, -> ', res.body.data);
        this.videos = res.body.data;
      }
    );
  }

  public start(files: FileList) {
    this.videoList = files;
    console.log(this.videoList);
    const recursion = this.getLink(this.videoList[0], 0, this.videoList).pipe(expand(res => {
      return res.index > res.arr.length - 1 ?
        EMPTY : this.getLink(this.videoList[res.index], res.index, this.videoList);
    }));
    recursion.subscribe(x => {
      if (x.index > x.arr.length - 1) {
        console.log('Link generated, Starting upload');
        // All links have been generated now you can start the upload
      }
    });
  }

  getLink = (video: File, index, arr) => {
    console.log('index: ' + index);
    return this.vimeoService.createVideo(video).pipe(
      map(response => {
        const videoFile = new uploadFiles(video, response.body.link, response.body.upload.upload_link);
        this.pendingFiles.push(videoFile);
        console.log('response: ' + response);
        return {
          data: response,
          index: index + 1,
          arr: arr
        };
      })
    );
  }

  videoUpload() {
    const success = () => {
      console.log('after video upload section');
    };
    const upload: Array<any> = [];
    for (let i = 0; i < this.pendingFiles.length; i++) {
      upload.push(
        this.vimeoService.tusUpload(
          this.pendingFiles[i],
          i,
          this.pendingFiles,
          upload,
          success
        )
      );
    }
    console.log('start video upload sequentially');
    upload[0].start();
    this.getVideos();
  }

  transform(url?: any) {
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  loadFile(file: any) {
    console.log('-->', file[0]);
    this.fileVideo = file.files.item(0);
  }

  loadVideo(video: any) {
    console.log(video.uri);
    this.video = video.uri.replace('/videos/', '');
    console.log(this.video);

    this.player.destroy().then(function () {
      // the player was destroyed
    }).catch(function (error) {
      // an error occurred
    });
    this.initPlayer();
  }


  private initPlayer() {
    console.log('Este es el nuevo video');
    const options: any = {
      id: this.video,
      with: 640
    }
    this.player = new Player(document.getElementById('videosnew'), options);
  }

}
