import { Component, OnInit, Input, Output ,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CourseClass } from '../Models/CoursesClass';
import { CoursesSrvService } from '../Services/courses-srv.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit, OnChanges {
public courseID : string | undefined;
@Output() deleteEvent = new EventEmitter()
@Input() public course:CourseClass;
public message :string ="";
 constructor(private srv:CoursesSrvService) {
 }

  ngOnInit(): void {

  }
  onCancelHandler(){
    this.message = `Course with ID : ${this.course.id} and Title : ${this.course.courseTitle} was not deleted`;
    this.course=null;
    this.deleteEvent.emit(this.message);
  }
  onYesHandler(){
    this.srv.deleteCourse(this.course.id);
    this.message = `Course with ID :${this.course.id} and Title : ${this.course.courseTitle} deleted successfully`;
    this.course = null;
    this.deleteEvent.emit(this.message);
  }
  ngOnChanges(changes: SimpleChanges): void {
   if (changes['course'].currentValue !== null)
      this.courseID = this.course.id.toString();
  }
}
