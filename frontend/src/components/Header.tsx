import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box, Avatar, styled } from '@mui/material';

const Header = () => {
    const theme = useTheme();
    return (
        <StyledAppBar position="static" color="transparent" elevation={0}>
            <StyledToolbar>
                <StyledTypography variant="h4">
                    VoiceShare
                </StyledTypography>

                <Box>
                    <StyledAvatar src="/profile.svg" />
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;

const StyledAppBar = styled(AppBar)({
    backgroundColor: 'transparent',
    elevation: 0,
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 30px',
    borderBottom: '1px solid #E2E2E2',
});

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    color: theme.palette.secondary.main,
}));

const StyledAvatar = styled(Avatar)({
    width: 55,
    height: 55,
});
