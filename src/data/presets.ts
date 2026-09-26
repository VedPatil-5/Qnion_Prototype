import { SampleDataset, TeamMember } from '../types';
import sample1Data from './samples/sample1.json';
import sample2Data from './samples/sample2.json';
import sample3Data from './samples/sample3.json';
import sample4Data from './samples/sample4.json';
import sample5Data from './samples/sample5.json';
import sample6Data from './samples/sample6.json';

export const SAMPLE_DATASETS: SampleDataset[] = [
  sample1Data as SampleDataset,
  sample2Data as SampleDataset,
  sample3Data as SampleDataset,
  sample4Data as SampleDataset,
  sample5Data as SampleDataset,
  sample6Data as SampleDataset
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'rishab',
    name: 'Rishab Pai',
    role: 'Team Leader & AI',
    photoUrl: '/assets/team/rishab-pai.jpg',
    githubUrl: 'https://github.com/Rishab-Pai',
    linkedinUrl: 'https://www.linkedin.com/in/rishab-pai-84383b390/'
  },
  {
    id: 'ved',
    name: 'Ved Patil',
    role: 'Fullstack & UI/UX Designer',
    photoUrl: '/assets/team/ved-patil.jpg',
    githubUrl: 'https://github.com/VedPatil-5',
    linkedinUrl: 'https://www.linkedin.com/in/ved-patil-59744b368/'
  },
  {
    id: 'chetan',
    name: 'Chetan Choudhary',
    role: 'Computer Vision & Grading Pipeline',
    photoUrl: '/assets/team/chetan-choudhary.jpg',
    githubUrl: 'https://github.com/chetan590',
    linkedinUrl: 'https://www.linkedin.com/in/chetan-choudhary-123532383/'
  },
  {
    id: 'tanmay',
    name: 'Tanmay Padhyal',
    role: 'AI & Computer Vision',
    photoUrl: '/assets/team/tanmay-padyal.jpg',
    githubUrl: 'https://github.com/Tanmaypadyal27-dot',
    linkedinUrl: 'https://www.linkedin.com/in/tanmay-padyal-4747b2379/'
  },
  {
    id: 'jay',
    name: 'Jay Shirodkar',
    role: 'Backend & QA',
    photoUrl: '/assets/team/jay-shirodkar.jpg',
    githubUrl: 'https://github.com/sachinshirodkar942-create',
    linkedinUrl: 'https://www.linkedin.com/in/jay-shirodkar-1971b9395/'
  },
  {
    id: 'samriddhi',
    name: 'Samriddhi Jaggi',
    role: 'Frontend & Product Research',
    photoUrl: '/assets/team/samriddhi-jaggi.jpg',
    githubUrl: 'https://github.com/jaggisamriddhi',
    linkedinUrl: 'https://www.linkedin.com/in/samriddhijaggi/'
  }
];
