import { Component, OnInit } from '@angular/core';
import { VimeoService } from 'src/app/services/vimeo.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-vimeo',
  templateUrl: './vimeo.component.html',
  styleUrls: ['./vimeo.component.css']
})
export class VimeoComponent implements OnInit {

  videos: any[] = [];

  constructor(
    private vimeoService: VimeoService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.vimeoService.getVideo().subscribe(
      (res) => {
        console.log('Estos son los videos, -> ', res.body.data);
        this.videos = res.body.data;
        // document.body.innerHTML =   transform(url: any) ;
      }
    );
  }

  // transform(url: any) {
  //   // return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }

}
