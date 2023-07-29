import matchTransitions from 'utils/matchTransitions';

export default function HomePage() {
  const matches = matchTransitions(boardConfig, transitions);
  console.log('matches', matches);
  return <h1>Home</h1>;
}

const boardConfig = {
  columnConfig: {
    columns: [
      {
        name: 'To Do',
        statuses: [
          {
            id: '10000',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10000',
          },
          {
            id: '1',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/1',
          },
          {
            id: '10500',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10500',
          },
        ],
      },
      {
        name: 'In Development',
        statuses: [
          {
            id: '10001',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10001',
          },
        ],
      },
      {
        name: 'Code Review',
        statuses: [
          {
            id: '10105',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10105',
          },
          {
            id: '10002',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10002',
          },
        ],
      },
      {
        name: 'Acceptance',
        statuses: [
          {
            id: '10004',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10004',
          },
          {
            id: '10103',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10103',
          },
          {
            id: '10102',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10102',
          },
          {
            id: '10003',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10003',
          },
        ],
      },
      {
        name: 'Done',
        statuses: [
          {
            id: '10104',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10104',
          },
          {
            id: '10300',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10300',
          },
          {
            id: '10400',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/10400',
          },
          {
            id: '6',
            self: 'https://whitespectre.atlassian.net/rest/api/2/status/6',
          },
        ],
      },
    ],
  },
};

const transitions = {
  transitions: [
    {
      id: '11',
      name: 'Open',
      to: {
        id: '1',
      },
    },
    {
      id: '21',
      name: 'Ready for Dev',
      to: {
        id: '10000',
      },
    },
    {
      id: '31',
      name: 'In Dev',
      to: {
        id: '10001',
      },
    },
    {
      id: '41',
      name: 'In Code Review',
      to: {
        id: '10002',
      },
    },
    {
      id: '51',
      name: 'In QA',
      to: {
        id: '10003',
      },
    },
    {
      id: '61',
      name: 'Closed',
      to: {
        id: '6',
      },
    },
    {
      id: '71',
      name: 'In Product Review',
      to: {
        id: '10004',
      },
    },
    {
      id: '81',
      name: 'Ready for QA',
      to: {
        id: '10102',
      },
    },
    {
      id: '91',
      name: 'Ready for Product Review',
      to: {
        id: '10103',
      },
    },
    {
      id: '101',
      name: 'Accepted',
      to: {
        id: '10104',
      },
    },
    {
      id: '111',
      name: 'Ready for Code Review',
      to: {
        id: '10105',
      },
    },
    {
      id: '121',
      name: 'Ready for Stage QA',
      to: {
        id: '10300',
      },
    },
    {
      id: '131',
      name: 'Ready for Release',
      to: {
        id: '10400',
      },
    },
    {
      id: '141',
      name: 'Ready for Grooming',
      to: {
        id: '10500',
      },
    },
  ],
};
