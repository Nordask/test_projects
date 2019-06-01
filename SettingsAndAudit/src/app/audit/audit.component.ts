import { Component, OnInit } from '@angular/core';
import { SendFetchService } from '../send-fetch.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  
  constructor(private sendFetch: SendFetchService) { }

  putSettings() {
    
  }

  ngOnInit() {
  }

}
