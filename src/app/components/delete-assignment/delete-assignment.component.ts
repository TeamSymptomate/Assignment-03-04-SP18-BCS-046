import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-delete-assignment',
  templateUrl: './delete-assignment.component.html',
  styleUrls: ['./delete-assignment.component.css']
})
export class DeleteAssignmentComponent implements OnInit {

  assignments: any[];
  constructor() {
    this.assignments = []
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

  handleDelete(event: Event, id: any) {
    event.preventDefault();
    if (!id) {
      alert('Cannot Delete')
    }
    else {
      axios.delete('http://localhost:8000/api/deleteassignment/' + String(id))
        .then(res => {
          if (res.data.success) {
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
        })
    }
  }

}
