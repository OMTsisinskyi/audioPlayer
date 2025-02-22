import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
    palette: {
        primary: {
            main: '#4A5565',
        },
        secondary: {
            main: '#F65555',
        },
        text: {
            primary: '#000000',
        },
        background: {
            paper: '#C4C4C4',
            default: '#FFFFFF',
        },
        success: {
            main: '#00B712',
        },
        error: {
            main: '#F65555',
            light: '#FFA3A3',
        },
    },
});
