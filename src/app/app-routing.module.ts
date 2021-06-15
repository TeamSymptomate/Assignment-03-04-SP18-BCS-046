import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//adding student routes
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
//adding assigment routes
import { DeleteAssignmentComponent } from './components/delete-assignment/delete-assignment.component';
import { MarkAssignmentComponent } from './components/mark-assignment/mark-assignment.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';
import { UploadAssignmentComponent } from './components/upload-assignment/upload-assignment.component';

const routes: Routes = [
{ 
  path: '',
  pathMatch: 'full', redirectTo: 'add-student'
},
{
  path: 'add-student',
  component: AddStudentComponent 
},
{
   path: 'edit-student/:id',
   component: EditStudentComponent 
},
{
   path: 'students-list',
   component: StudentsListComponent 
},
{
  path: 'upload',
  component: UploadAssignmentComponent,
},
{
  path: 'delete',
  component: DeleteAssignmentComponent,
},
{
  path: 'mark',
  component: MarkAssignmentComponent,
},
{
  path: 'submit',
  component: SubmitAssignmentComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
