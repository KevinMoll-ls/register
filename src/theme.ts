import type { Theme } from 'theme-ui'

export const boxShadow = '0px 4px 34px rgba(0, 0, 0, 0.03)'
export const transition = 'all .2s ease'
export const borderRadius = {
  inputs: 10,
  boxes: 14,
}

export const colors = {
  text: '#000',
  background: '#F3F7F8',
  contentBackground: '#fff',
  primary: '#000000',
  accent: '#00FFBF',
  secondary: '#E8E8E8',
  disabled: '#ccc',
  danger: '#FF0000',
  warning: '#FF7A00',
  modes: {
    dark: {
      text: '#fff',
      background: '#000',
      secondaryBackground: '#202128',
      primary: '#00b600',
      bgCard: '#FBFDFE',
      sidebar: '#F3F7F8',
    },
  },
}

export const theme: Theme = {
  breakpoints: ['52em', '64em', '100em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors,
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    sectionTitle: {
      fontSize: 3,
      fontWeight: 300,
      display: 'block',
    },
    contentTitle: {
      color: '#77838F',
      display: 'block',
      fontSize: 1,
    },
    primary: {
      color: 'text',
    },
    a: {
      transition,
      color: '#77838F',
      textDecoration: 'underline',
      cursor: 'pointer',
      '&:hover': {
        color: 'text',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      margin: 0,
      borderCollapse: 'collapse',
      fontSize: '14px',
      lineHeight: '20px',
      textAlign: 'left',
      width: '100%',
      borderSpacing: 0,
      p: {
        m: 0,
      },
      pre: {
        mt: 2,
        mb: 0,
      },
    },
    th: {
      border: 'none',
      px: 2,
      pl: 3,
    },
    tbody: {
      'tr:last-of-type': {
        borderBottom: 0,
      },
    },
    thead: {
      borderBottom: (t: Theme) => ` 1px solid  ${t.colors?.shadow}`,
      backgroundColor: 'header',
      color: 'text',
    },
    td: {
      py: 3,
      px: 3,
      borderBottom: 0,
    },
    tdgroup: {
      lineHeight: '24px',
      background: '#fafbfc',
      whiteSpace: 'nowrap',
      py: 3,
      fontWeight: 'bold',
      // fontFamily: 'monospace',
      flexDirection: 'row',
      alignItems: 'center',
    },
    tr: {
      borderBottom: (t: Theme) => ` 1px solid  ${t.colors?.shadow}`,
    },
  },
  forms: {
    input: {
      // transition: 'border .2s ease,color .2s ease',
      // outline: 'none',
      borderRadius: borderRadius.inputs,
    },
  },
  cards: {
    primary: {
      borderRadius: borderRadius.boxes,
      padding: 3,
      boxShadow,
      backgroundColor: 'contentBackground',
    },
  },
  buttons: {
    primary: {
      borderRadius: borderRadius.inputs,
      cursor: 'pointer',
      transition,
      color: '#fff',
      backgroundColor: 'primary',

      '&:hover': {
        filter: 'brightness(0.85)',
      },
      '&:disabled': {
        backgroundColor: 'grey',
        cursor: 'default',
      },
    },
    accent: {
      borderRadius: borderRadius.inputs,
      cursor: 'pointer',
      transition,
      backgroundColor: 'accent',
      color: 'black',

      '&:hover': {
        filter: 'brightness(0.85)',
      },
      '&:disabled': {
        backgroundColor: 'disabled',
        cursor: 'default',
      },
    },
    transparent: {
      borderRadius: 6,
      cursor: 'pointer',
      transition: 'all .2s ease',
      backgroundColor: 'primary',
      color: '#E5E6E9',

      '&:hover': {
        backgroundColor: '#78838F',
      },
      '&:disabled': {
        backgroundColor: '#78838F',
        cursor: 'default',
      },
    },
  },
}
