import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
public author :string =`Petros Karandreas - ${new Date().getFullYear().toString()} `;
  constructor() { }
  ngAfterViewInit(): void {
    $(document).ready(function(){
      setInterval(function(){
      var currentTime : Date = new Date();
      var hour =currentTime.getHours();
      var minutes = currentTime.getMinutes().toString();
      var seconds = currentTime.getSeconds().toString();
      minutes = (Number(minutes) < 10?'0':'')+minutes;
      seconds = (Number(seconds) < 10?'0':'')+seconds;
      var clockString = hour+":"+minutes+":"+seconds;
      $("#clock").html(clockString);
      },1000);
    });
  }

  ngOnInit(): void {
  }

}
