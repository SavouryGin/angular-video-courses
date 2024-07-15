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

  it('should order courses by date in descending order', () => {
    const courses: Course[] = [
      {
        id: '1',
        name: 'Course 1',
        date: '2023-12-01',
        length: 60,
        description: 'Description 1',
        isTopRated: false,
        authors: [],
      },
      {
        id: '2',
        name: 'Course 2',
        date: '2023-12-05',
        length: 120,
        description: 'Description 2',
        isTopRated: true,
        authors: [],
      },
      {
        id: '3',
        name: 'Course 3',
        date: '2023-12-03',
        length: 90,
        description: 'Description 3',
        isTopRated: false,
        authors: [],
      },
    ];

    const sortedCourses = pipe.transform(courses, 'date');
    expect(sortedCourses[0].id).toBe('2');
    expect(sortedCourses[1].id).toBe('3');
    expect(sortedCourses[2].id).toBe('1');
  });
});
