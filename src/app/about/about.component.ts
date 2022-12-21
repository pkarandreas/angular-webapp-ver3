import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
public message :string ="";
  constructor() {
    this.message = 'Courses M.I.S is for Educational Purposes created in December 2022';
  }

  ngOnInit(): void {
  }

}
