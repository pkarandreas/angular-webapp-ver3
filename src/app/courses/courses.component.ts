import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CourseClass } from '../Models/CoursesClass';
import { CoursesSrvService } from '../Services/courses-srv.service';
import { Subject} from "rxjs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses : CourseClass[] = [];
  public isLoggedIn:boolean = false;
  public homeCourseId : string = "";
  public homeCourse : CourseClass = null;
  //=================Declarations For DataTable=============
  public dataTableOptions : DataTables.Settings ={};
  public dtTrigger: Subject<any> = new Subject<any>();
  //========================================================
  constructor(private srv:CoursesSrvService,private route:Router) {
    this.dataTableOptions={
        pagingType :"full_numbers",
        pageLength : 5,
        lengthMenu : [5,10,15,30]
      };
    this.getCoursesAPI();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getCoursesAPI(){
    this.srv.getCourses().subscribe(data=>{
       this.courses=data;
      this.dtTrigger.next(null);
    })
  }

  onDeleteCourse(id:number){
    //???????????????????????
    this.srv.getCourseByID(Number(id)).subscribe(data=>{this.homeCourse = data;});
  }
  onEditCourse(id:number){
    this.homeCourseId = id.toString();
    this.route.navigate([`addEditCourse/${this.homeCourseId}`]);
  }
  public onDeleted(msg:string)
  {
    alert(msg);
    this.getCoursesAPI();
  }

  ngOnInit(): void {
  }
  onCreateCourse(){
    this.route.navigate([`addEditCourse/0`]);
  }
  onPDFClick(){
    let head = [['No.','ID','Course Title','START DATE','DURATION']];
    let datePipe :DatePipe = new DatePipe('en_US');
    let tblData : any[] =[];
    for (let x=0;x < this.courses.length;x++){
      tblData[x]=[[(x+1).toString()],[this.courses[x].id],[this.courses[x].courseTitle],[datePipe.transform(this.courses[x].startDate,'dd/MM/yyyy')],[this.courses[x].duration]];
    }
    let pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('Report for 2023 Courses',11,8);
    pdf.setFontSize(11);
    pdf.setTextColor(100);
    (pdf as any).autoTable({
      head : head,
      body : tblData,
      theme : 'grid'
    });
    pdf.output('datauristring');
    pdf.save("course_2023.pdf");
  }
}
