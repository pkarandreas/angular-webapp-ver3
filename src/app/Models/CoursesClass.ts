export class CourseClass{
    public id : number;
    public courseTitle : string ;
    public startDate : Date;
    public duration : number;

  //  constructor(_courseID:number,_courseTitle:string,_courseStart:Date,_duration:number){
  //     this.courseID = _courseID;
  //     this.courseTitle = _courseTitle;
  //     this.startDate = _courseStart;
  //     this.duration = _duration;
  //   }
    public getCourseDetails():string{
      return `ID : ${this.id.toString()} Course Name : ${this.courseTitle}
      Start Date : ${this.startDate.toDateString()} Duration : ${this.duration.toString()} `;
    }
  }
