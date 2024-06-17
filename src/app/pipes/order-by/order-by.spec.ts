import { OrderByPipe } from '.';
import { Course } from '../../models/course';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order courses by creationDate in descending order', () => {
    const courses: Course[] = [
      {
        id: '1',
        title: 'Course 1',
        creationDate: new Date('2023-12-01'),
        duration: 60,
        description: 'Description 1',
        topRated: false,
      },
      {
        id: '2',
        title: 'Course 2',
        creationDate: new Date('2023-12-05'),
        duration: 120,
        description: 'Description 2',
        topRated: true,
      },
      {
        id: '3',
        title: 'Course 3',
        creationDate: new Date('2023-12-03'),
        duration: 90,
        description: 'Description 3',
        topRated: false,
      },
    ];

    const sortedCourses = pipe.transform(courses, 'creationDate');
    expect(sortedCourses[0].id).toBe('2');
    expect(sortedCourses[1].id).toBe('3');
    expect(sortedCourses[2].id).toBe('1');
  });
});
