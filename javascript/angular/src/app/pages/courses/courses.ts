import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class Courses {

  courses = [
    { id: 1, title: 'Angular Fundamentals', level: 'Beginner', progress: 70 },
    { id: 2, title: 'RxJS Mastery', level: 'Intermediate', progress: 40 },
    { id: 3, title: 'DevOps Essentials', level: 'Intermediate', progress: 20 },
  ];

}
