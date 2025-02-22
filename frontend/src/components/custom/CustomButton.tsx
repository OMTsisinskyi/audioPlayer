import { Button, ButtonProps, styled } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, ...props }) => {
    return (
        <StyledButton {...props} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled(Button)(({ theme }) => ({
    width: "150px",
    fontSize: "16px",
    padding: "10px 0",
    borderRadius: "6px",
    color: "#ffffff",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
    transition: "background-color 0.3s ease",
    textTransform: "capitalize",
    border: "none",

    "&:hover": {
        backgroundColor: "#f21f1f",
        color: "#ffffff",
    },
}));

export default CustomButton;
