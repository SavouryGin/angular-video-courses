import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], field: keyof Course): Course[] {
    return courses.slice().sort((a, b) => {
      const dateA = new Date(a[field] as string);
      const dateB = new Date(b[field] as string);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
