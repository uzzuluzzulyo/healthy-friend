import { createTheme } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#388DC6',
    light: '#7DB8ED',
    dark: '#2A6D9E',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#6D8AAD',
    dark: '#54687F',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#1CD9E8',
    contrastText: '#04333A',
  },
  background: {
    default: '#F4F9FC',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1A2733',
    secondary: '#5C7080',
    disabled: '#9AACBB',
  },
  divider: 'rgba(26, 39, 51, 0.08)',
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#5CA8DB',
    light: '#8CC4EA',
    dark: '#388DC6',
    contrastText: '#0B1620',
  },
  secondary: {
    main: '#8AA3BE',
    dark: '#6D8AAD',
    contrastText: '#0B1620',
  },
  accent: {
    main: '#1CD9E8',
    contrastText: '#04333A',
  },
  background: {
    default: '#0F1720',
    paper: '#182430',
  },
  text: {
    primary: '#EAF2F8',
    secondary: '#93A5B8',
    disabled: '#5C7080',
  },
  divider: 'rgba(255, 255, 255, 0.08)',
};

export function createAppTheme(mode = 'light') {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette,
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 800, letterSpacing: '-0.01em' },
      h5: { fontWeight: 800, letterSpacing: '-0.01em' },
      h6: { fontWeight: 700 },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    spacing: 8,
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' ? '0 2px 12px rgba(0, 0, 0, 0.32)' : '0 2px 12px rgba(26, 39, 51, 0.06)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            boxShadow: 'none',
          },
          contained: {
            boxShadow: '0 4px 14px rgba(56, 141, 198, 0.28)',
            '&:hover': {
              boxShadow: '0 6px 18px rgba(56, 141, 198, 0.34)',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 14,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            height: 68,
            borderTop: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(26, 39, 51, 0.06)',
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            minWidth: 56,
            '&.Mui-selected': {
              paddingTop: 6,
            },
          },
          label: {
            fontSize: '0.7rem',
            '&.Mui-selected': {
              fontSize: '0.72rem',
              fontWeight: 700,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });
}

export default createAppTheme('light');
