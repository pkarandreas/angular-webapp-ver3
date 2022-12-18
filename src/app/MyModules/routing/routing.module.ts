import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/about/about.component';
import { CourseDeleteComponent } from 'src/app/course-delete/course-delete.component';
import { CourseComponent } from 'src/app/course/course.component';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  {
    path: '',
    component :HomeComponent
  },
  {
    path: "courses",
    component : CoursesComponent
  },
  {
    path : "courseDelete/:id" ,
    component : CourseDeleteComponent
   },
   {
    path : "addEditCourse/:id" ,
    component :CourseComponent
   },
   {
    path: "about",
    component : AboutComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class RoutingModule { }
