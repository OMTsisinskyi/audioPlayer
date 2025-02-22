import { Button, ButtonProps, styled } from '@mui/material';

interface CustomMicrophoneButtonProps extends ButtonProps {
    onClick?: () => void;
}

const CustomMicrophoneButton: React.FC<CustomMicrophoneButtonProps> = ({ onClick, children, ...props }) => {
    return (
        <StyledMicrophoneButton {...props} onClick={onClick}>
            {children}
        </StyledMicrophoneButton>
    );
};

const StyledMicrophoneButton = styled(Button)(({ theme }) => ({
    width: "57px",
    height: "57px",
    minWidth: "57px",
    minHeight: "57px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
    transition: "background-color 0.3s ease",
    padding: 0,
    "&:hover": {
        backgroundColor: "#f21f1f",
    },
}));

export default CustomMicrophoneButton;
