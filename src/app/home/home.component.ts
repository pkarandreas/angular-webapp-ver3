import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseClass } from './../Models/CoursesClass';
import { CoursesSrvService } from './../Services/courses-srv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public message :string ='Welcome to COURSE M.I.S. App';
  constructor(private route:Router) {}
  ngOnInit(): void {
  }
}
