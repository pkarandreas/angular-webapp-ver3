import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CourseClass } from './../Models/CoursesClass';
import { CoursesSrvService } from './../Services/courses-srv.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit,OnChanges {
@Input() courseID : string = "";
public course : CourseClass = null;
  constructor(private srv:CoursesSrvService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseID'].currentValue !== "")
    {
      this.srv.getCourseByID(Number(this.courseID)).subscribe(data=>{
        this.course = data;
        console.log(this.course);
      })
    }
  }

}
