import { Course } from '../app/models/course';

export const COURSES_LIST: Course[] = [
  {
    id: '0',
    name: 'Angular Fundamentals',
    date: '2024-06-09',
    length: 210,
    description: 'An introduction to Angular framework',
    isTopRated: true,
    authors: [],
  },
  {
    id: '1',
    name: 'React Fundamentals',
    date: '2024-04-09',
    length: 195,
    description: 'An introduction to ReactJS library',
    isTopRated: false,
    authors: [],
  },
  {
    id: '2',
    name: 'Node.js Fundamentals',
    date: '2023-12-11',
    length: 348,
    description: 'An introduction to Node.js',
    isTopRated: true,
    authors: [],
  },
  {
    id: '3',
    name: 'Next.js Advanced (upcoming)',
    date: '2025-01-01',
    length: 290,
    description: 'A new course about Next.js',
    isTopRated: false,
    authors: [],
  },
];
