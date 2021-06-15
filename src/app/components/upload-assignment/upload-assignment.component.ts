import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Timestamp } from 'rxjs';
@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.css']
})
export class UploadAssignmentComponent implements OnInit {

  fileName: string = '';
  data: FormData;
  date: string;
  time: string;
  constructor() {
    this.data = new FormData();
    this.date = '';
    this.time = '';
  }

  ngOnInit(): void {
  }

  fileUpload(event: any) {
    const file = event.target.files[0]
    this.data.append('file', file);
    this.fileName = file.name
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    this.data.append('date', this.date);
    this.data.append('time', this.time);
    console.log(this.data);

    axios.post('http://localhost:8000/api/upload', this.data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((res: any) => console.log(res))

  }
}
