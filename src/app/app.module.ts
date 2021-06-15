import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { DeleteAssignmentComponent } from './components/delete-assignment/delete-assignment.component';
import { MarkAssignmentComponent } from './components/mark-assignment/mark-assignment.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';
import { UploadAssignmentComponent } from './components/upload-assignment/upload-assignment.component';
@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentsListComponent,
    DeleteAssignmentComponent,
    MarkAssignmentComponent,
    SubmitAssignmentComponent,
    UploadAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
