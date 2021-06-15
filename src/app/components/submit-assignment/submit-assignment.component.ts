import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {
  assignments: any[];
  data: FormData;
  fileName: string;
  studentName: string;
  constructor() {
    this.assignments = [];
    this.data = new FormData();
    this.fileName = '';
    this.studentName = '';
  }

  ngOnInit(): void {
    axios.get('http://localhost:8000/api/getassignments', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((res: any) => {
      if (res.data.success) {
        this.assignments = res.data.rec;
      }
      else {
        // this.assignments = [{
        //   name: 'No Record Found',
        //   enddate: 'N/A',
        //   endtime: 'N/A',
        //   _id: null
        // }]
      }
    })
  }

  fileUpload(event: any) {
    const file = event.target.files[0]
    this.data.append('file', file);
    this.fileName = file.name
  }

  handleSubmit(event: Event, id: any) {
    event.preventDefault();
    if (!id) {
      alert('Cannot Submit')
    }
    else {
      this.data.append('studentname', this.studentName);
      this.data.append('assignment_id', String(id));
      this.data.append('submitted_at', new Date(Date.now()).toDateString());
      this.data.append('filename', this.fileName);
      axios.post('http://localhost:8000/api/submitassignment', this.data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      })
        .then(res => console.log(res))
    }
  }
}
