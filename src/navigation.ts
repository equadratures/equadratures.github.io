import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Case Studies',
      links: [
        {
          text: 'Coastal Dynamics',
          href: getPermalink('/case-studies/coastal-dynamics'),
        },
        {
          text: 'Aerospace Design and Manufacturing',
          href: getPermalink('/case-studies/aerospace-design-and-manufacturing'),
        },
      ],
    },
    {
      text: 'Papers',
      href: getPermalink('/papers'),
    },
    {
      text: 'A Short Course',
      href: getPermalink('/a-short-course'),
    },
  ],
  actions: [{ text: 'Install', href: 'https://pypi.org/project/equadratures/', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Affiliations',
      links: [
        { text: 'NumFOCUS', href: '/numfocus' },
        { text: 'Google Summer of Code', href: '/gsoc' },
      ],
    },
    {
      title: 'Management',
      links: [
        { text: 'Partnerships', href: '/partnerships' },
      ],
    },
    {
      title: 'Code',
      links: [
        { text: 'Docs', href: 'https://equadratures.org/documentation/' },
        { text: 'Discourse', href: 'https://discourse.equadratures.org/' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Code of Conduct', href: getPermalink('/numfocus') },
  ],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/equadratures/equadratures' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/equadratures' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/equadratures' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-facebook', href: 'https://www.youtube.com/@equadratures9037' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    
  `,
};
