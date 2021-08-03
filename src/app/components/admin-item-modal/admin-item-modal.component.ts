import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-item-modal',
  templateUrl: './admin-item-modal.component.html',
  styleUrls: ['./admin-item-modal.component.css']
})
export class AdminItemModalComponent implements OnInit {
  
  itemImagesURL : string = "https://rss-images.s3.us-east-2.amazonaws.com";

    @Input() title: string = '';
    @Input() src: string = '';
    @Input() description: string = '';
    @Input() id: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
