import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: "#1976d2", // Primary color
    //         light: "#63a4ff",
    //         dark: "#004ba0",
    //         contrastText: "#ffffff", // Text color for contrast
    //     },
    //     secondary: {
    //         main: "#dc004e",
    //     },
    //     background: {
    //         default: "#f5f5f5", // Background color
    //         paper: "#ffffff", // Paper component background
    //     },
    //     text: {
    //         primary: "#333333", // Default text color
    //         secondary: "#757575",
    //     },
    // },
    typography: {
        fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`,
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
        },
        body1: {
            fontSize: "1rem",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px", // Rounded corners
                    textTransform: "uppercase", // Disable uppercase
                    fontWeight: "800",
                    padding: "10px 20px",
                    backgroundColor: "#14B5BA",
                },
            },
            defaultProps: {
                variant: "contained",
                disableRipple: true, // Disable ripple effect
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                },
            },
        },
    },
});

export default theme;
