import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course';

@Pipe({
  name: 'filter',
})
@Injectable({
  providedIn: 'root', // This makes the pipe available as a singleton service
})
export class FilterPipe implements PipeTransform {
  transform(courses: Course[], query: string): Course[] {
    if (!query) {
      return courses;
    }
    return courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
