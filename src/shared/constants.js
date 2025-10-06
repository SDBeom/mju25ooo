// Navigation constants
export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'HOME', href: '#' },
  { id: 'about', label: 'ABOUT', href: '#' },
  { id: 'works', label: 'WORKS', href: '#' },
  { id: 'designer', label: 'DESIGNER', href: '#' },
  { id: 'archive', label: 'ARCHIVE', href: '#' }
];

// Design System Colors from Figma
export const COLORS = {
  // Primary colors
  BACKGROUND: '#2A2A2A',
  SURFACE: '#3A3A3A',
  SURFACE_VARIANT: '#4A4A4A',
  
  // Accent colors
  ORANGE: '#FF6B35',
  BLUE: '#4FC3F7',
  WHITE: '#FFFFFF',
  
  // Text colors
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#CCCCCC',
  TEXT_MUTED: '#999999',
  
  // Status colors
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  
  // Gradient colors
  GRADIENT_ORANGE: 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)',
  GRADIENT_BLUE: 'linear-gradient(135deg, #4FC3F7 0%, #81D4FA 100%)',
};

// Typography system from Figma
export const TYPOGRAPHY = {
  // Font families
  FONT_PRIMARY: 'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  FONT_MONO: 'JetBrains Mono, "Fira Code", Consolas, monospace',
  
  // Font sizes
  FONT_SIZES: {
    XS: '12px',
    SM: '14px',
    BASE: '16px',
    LG: '18px',
    XL: '20px',
    '2XL': '24px',
    '3XL': '30px',
    '4XL': '36px',
    '5XL': '48px',
    '6XL': '60px',
    '7XL': '72px',
  },
  
  // Font weights
  FONT_WEIGHTS: {
    LIGHT: 300,
    REGULAR: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800,
  },
  
  // Line heights
  LINE_HEIGHTS: {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.75,
  },
};

// Spacing system from Figma
export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '16px',
  LG: '24px',
  XL: '32px',
  '2XL': '48px',
  '3XL': '64px',
  '4XL': '96px',
  '5XL': '128px',
};

// Layout breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: '320px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE_DESKTOP: '1440px',
};

// Circle pattern constants
export const CIRCLE_COLORS = {
  WHITE: COLORS.WHITE,
  ORANGE: COLORS.ORANGE,
  BLUE: COLORS.BLUE
};

export const CIRCLE_PATTERN_CONFIG = [
  {
    row: 0,
    circles: [
      CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE, 
      CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE, CIRCLE_COLORS.ORANGE, 
      CIRCLE_COLORS.ORANGE, CIRCLE_COLORS.ORANGE, CIRCLE_COLORS.ORANGE, 
      CIRCLE_COLORS.BLUE
    ]
  },
  {
    row: 1,
    circles: [
      CIRCLE_COLORS.BLUE, CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE, 
      CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE
    ]
  },
  {
    row: 2,
    circles: [
      CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE, CIRCLE_COLORS.WHITE, 
      CIRCLE_COLORS.WHITE, CIRCLE_COLORS.ORANGE, CIRCLE_COLORS.WHITE
    ]
  },
  {
    row: 3,
    circles: [
      CIRCLE_COLORS.ORANGE, CIRCLE_COLORS.WHITE, CIRCLE_COLORS.BLUE, 
      CIRCLE_COLORS.BLUE, CIRCLE_COLORS.ORANGE, CIRCLE_COLORS.ORANGE
    ]
  }
];

// Logo constants
export const LOGO_CONFIG = {
  TEXT: 'KS',
  DOT_COUNT: 3
};

// Hero section content from Figma
export const HERO_CONTENT = {
  TITLE: 'Creative Designer',
  SUBTITLE: 'Bringing ideas to life through design',
  DESCRIPTION: 'I specialize in creating beautiful, functional designs that tell a story and engage users.',
  CTA_TEXT: 'View My Work',
  CTA_HREF: '#works'
};

// About section content
export const ABOUT_CONTENT = {
  TITLE: 'About Me',
  DESCRIPTION: 'I am a passionate designer with over 5 years of experience in creating digital experiences that matter.',
  SKILLS: [
    'UI/UX Design',
    'Brand Identity',
    'Web Design',
    'Mobile Design',
    'Prototyping',
    'User Research'
  ]
};

// Works section content
export const WORKS_CONTENT = {
  TITLE: 'My Works',
  DESCRIPTION: 'A collection of my recent projects and design work.',
  PROJECTS: [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Modern e-commerce design with focus on user experience',
      image: '/images/project1.jpg',
      tags: ['UI Design', 'UX Research', 'Prototyping']
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure and intuitive banking application design',
      image: '/images/project2.jpg',
      tags: ['Mobile Design', 'Fintech', 'Security']
    },
    {
      id: 3,
      title: 'Brand Identity',
      description: 'Complete brand identity for a tech startup',
      image: '/images/project3.jpg',
      tags: ['Branding', 'Logo Design', 'Visual Identity']
    }
  ]
};

// Error messages
export const ERROR_MESSAGES = {
  NAVIGATION_FAILED: 'Navigation failed. Please try again.',
  COMPONENT_LOAD_ERROR: 'Component failed to load. Please refresh the page.',
  INVALID_CONFIG: 'Invalid configuration provided.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// Animation constants
export const ANIMATIONS = {
  DURATION: {
    FAST: '150ms',
    NORMAL: '300ms',
    SLOW: '500ms'
  },
  EASING: {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Exhibition information - Single source of truth
export const EXHIBITION_INFO = {
  TITLE: 'MJU MCD 졸업전시',
  DATE: '2025.11.12 - 11.17',
  TIME: '11:00 - 18:00',
  VENUE: '인사동 마루아트센터 특별관',
  ADDRESS: '35-4, INSADONG-GIL, JONGNO-GU',
  COPYRIGHT: '© 2025 MJU MCD. All rights reserved.',
  DESIGNED_BY: 'Designed with ❤️ by MCD Students'
};

// Footer configuration
export const FOOTER_CONFIG = {
  LOGO_SIZES: {
    DESKTOP: {
      MJU: '45px',
      OOO: '35px'
    },
    MOBILE: {
      MJU: '22px',
      OOO: '18px'
    }
  },
  TEXT_SIZES: {
    DESKTOP: '0.9rem',
    MOBILE: '0.8rem'
  }
};
