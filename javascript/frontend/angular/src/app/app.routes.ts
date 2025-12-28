import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'courses',
    component: Courses,
  },
  {
    path: 'profile',
    component: Profile,
  }
];
