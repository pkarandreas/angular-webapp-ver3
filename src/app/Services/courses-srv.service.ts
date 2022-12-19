import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CourseClass } from '../Models/CoursesClass';
@Injectable({
  providedIn: 'root'
})
export class CoursesSrvService {
  public apiUrl = environment.apiURL+'courses';
  public coursesHeader : HttpHeaders = new HttpHeaders({'content-Type':'application/json'});
  constructor(private http:HttpClient) { }

  //Get All Courses
  public getCourses():Observable<CourseClass[]>{
    return this.http.get<CourseClass[]>(this.apiUrl,{responseType : 'json'});
  }

  //Get A Course By ID
  public getCourseByID(id:number):Observable<CourseClass>{
    return this.http.get<CourseClass>(`${this.apiUrl}/${id}`,{responseType:'json'});
  }

  //Delete Course
  public deleteCourse(id:number){
    this.http.delete(`${this.apiUrl}/${id}`,{headers:this.coursesHeader}).toPromise().then();
  }

  //Create a New Course
  public postCourse(course:CourseClass):boolean{
    this.http.post(`${this.apiUrl}`,course).subscribe(data=>{console.log(data)});
    return true;
  }

  //Update Existing Course
  putAuthor(course:CourseClass){
    let  obj ={
       "courseTitle" : course.courseTitle,
       "startDate" : course.startDate,
       "duration" : course.duration,
     };
     this.http.put(`${this.apiUrl}/${course.id}`,JSON.stringify(obj),{headers:this.coursesHeader}).toPromise().then(()=>{
        console.log("executed ok !!!!!");
     });
   }
}
