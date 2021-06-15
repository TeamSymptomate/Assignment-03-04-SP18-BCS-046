import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-mark-assignment',
  templateUrl: './mark-assignment.component.html',
  styleUrls: ['./mark-assignment.component.css']
})
export class MarkAssignmentComponent implements OnInit {
  assignments: any[];
  submission: any[];
  constructor() {
    this.assignments = [];
    this.submission = [{
      studentname: null
    }];
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
        this.assignments = [{
          name: 'No Record Found',
          enddate: 'N/A',
          endtime: 'N/A',
          _id: null
        }]
      }
    })
  }

  onClick(id: any) {
    console.log(" === == = = == = ")
    console.log(String(id))
    console.log(" === == = = == = ")
               
    axios.get('http://localhost:8000/api/getsubmission/' + String(id), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((res: any) => {
      console.log(res)
      if (res.data.success) {
        this.submission = res.data.rec;
      }
      else {
        this.submission = [{
          studentname: 'No Submission',
          filename: 'N/A',
          submitted_at: 'N/A',
          marks: 'N/A'
        }]
      }
    })
  }

  updateMarks(event: Event, marks: string, id: any) {
    event.preventDefault();
    const data = {
      marks: marks,
      id: String(id)
    }            
    axios.patch('http://localhost:8000/api/updatemarks', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
      .then(res => {
        console.log(res)
        if (res.data.success) {
          this.onClick(res.data.data.assignment_id)
        }
      })
  }
}

