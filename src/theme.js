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
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
});

export default theme;
