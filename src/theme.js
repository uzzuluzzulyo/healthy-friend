import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
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
  },
  shape: {
    borderRadius: 16,
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
          borderRadius: 20,
          boxShadow: '0 2px 12px rgba(26, 39, 51, 0.06)',
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
          borderTop: '1px solid rgba(26, 39, 51, 0.06)',
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

export default theme;
