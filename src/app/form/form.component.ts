import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
public fName :string ="";
public lName : string ="";
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(details:any){
    this.fName=details['firstName'];
    this.lName = details['lastName'];
  }
}
