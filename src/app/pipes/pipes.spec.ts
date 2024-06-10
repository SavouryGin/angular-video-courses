import { Course } from '../models/course';
import { DurationPipe } from './duration-pipe';
import { OrderByPipe } from './order-by-pipe';

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

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform duration less than 1 hour correctly', () => {
    expect(pipe.transform(45)).toBe('45min');
  });

  it('should transform duration exactly 1 hour correctly', () => {
    expect(pipe.transform(60)).toBe('1h 0min');
  });

  it('should transform duration more than 1 hour correctly', () => {
    expect(pipe.transform(75)).toBe('1h 15min');
  });

  it('should transform duration with multiple hours correctly', () => {
    expect(pipe.transform(135)).toBe('2h 15min');
  });

  it('should transform duration with no minutes correctly', () => {
    expect(pipe.transform(120)).toBe('2h 0min');
  });

  it('should transform duration of 0 minutes correctly', () => {
    expect(pipe.transform(0)).toBe('0min');
  });
});
