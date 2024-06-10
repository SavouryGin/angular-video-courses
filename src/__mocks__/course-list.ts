import { Course } from '../app/models/course';

export const COURSES_LIST: Course[] = [
  {
    id: 'e054badc-63c7-4bc8-9ffe-5ebcc5c09176',
    title: 'Angular Fundamentals',
    creationDate: new Date('2024-06-09'),
    duration: 210,
    description: 'An introduction to Angular framework',
    topRated: true,
  },
  {
    id: '35dac635-deee-437f-b6bc-9a883db155f0',
    title: 'React Fundamentals',
    creationDate: new Date('2024-04-09'),
    duration: 180,
    description: 'An introduction to ReactJS library',
  },
  {
    id: '99eaa0d1-72cc-4395-9074-e2ab384931d6',
    title: 'Node.js Fundamentals',
    creationDate: new Date('2023-12-11'),
    duration: 348,
    description: 'An introduction to Node.js',
    topRated: true,
  },
  {
    id: '803d4c40-c1f9-4eae-9ae4-3e18640d33d7',
    title: 'Next.js Advanced (upcoming)',
    creationDate: new Date('2025-01-01'),
    duration: 348,
    description: 'A new course about Next.js',
  },
];
