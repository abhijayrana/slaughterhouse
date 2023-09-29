import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: mode === "light" ? "#fff" : "#000", // Adjust contrast text color based on mode
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: mode === "light" ? "#000" : "#fff", // Adjust contrast text color based on mode
      },
      error: {
        main: "#f44336",
      },
      warning: {
        main: "#ff9800",
      },
      info: {
        main: "#2196f3",
      },
      success: {
        main: "#4caf50",
      },
      text: {
        primary: mode === "light" ? "#333" : "#fff", // Adjust text color based on mode
        secondary: mode === "light" ? "#666" : "#999", // Adjust text color based on mode
        disabled: mode === "light" ? "#ccc" : "#555", // Adjust text color based on mode
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#121212",
        paper: "#fff",
      },
      divider: mode === "light" ? "#ddd" : "#555", // Adjust divider color based on mode

      //landing page
      landing: {
        gradients: {
          primaryGradient: "linear-gradient(90deg, #800080 0%, #0000FF 100%)",
          secondaryGradient: "linear-gradient(90deg, #FF0000 0%, #FFFF00 100%)",
        },
        text: {
          primary: mode === "light" ? "#333" : "#ccc", // Adjust text color based on mode
          secondary: mode === "light" ? "#666" : "#999", // Adjust text color based on mode
          disabled: mode === "light" ? "#ccc" : "#555", // Adjust text color based on mode
        },
      },

      programs: {

      },

    },
    typography: {
      fontFamily: '"Inter", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        "@media (max-width:1200px)": { fontSize: "3rem" },
        "@media (max-width:900px)": { fontSize: "2.5rem" },
      },
      h2: {
        fontWeight: 600,
        fontSize: "3rem",
        "@media (max-width:1200px)": { fontSize: "2.5rem" },
        "@media (max-width:900px)": { fontSize: "2rem" },
      },
      h3: {
        fontWeight: 600,
        fontSize: "2.5rem",
        "@media (max-width:1200px)": { fontSize: "2rem" },
        "@media (max-width:900px)": { fontSize: "1.75rem" },
      },
      h4: {
        fontWeight: 500,
        fontSize: "2rem",
        "@media (max-width:1200px)": { fontSize: "1.75rem" },
        "@media (max-width:900px)": { fontSize: "1.5rem" },
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.5rem",
        "@media (max-width:1200px)": { fontSize: "1.25rem" },
        "@media (max-width:900px)": { fontSize: "1rem" },
      },
      h6: {
        fontWeight: 500,
        fontSize: "1.25rem",
        "@media (max-width:1200px)": { fontSize: "1rem" },
        "@media (max-width:900px)": { fontSize: "0.875rem" },
      },
      subtitle1: {
        fontWeight: 400,
        fontSize: "1rem",
        "@media (max-width:900px)": { fontSize: "0.875rem" },
      },
      subtitle2: {
        fontWeight: 400,
        fontSize: "0.875rem",
        "@media (max-width:900px)": { fontSize: "0.75rem" },
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
        "@media (max-width:900px)": { fontSize: "0.875rem" },
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.875rem",
        "@media (max-width:900px)": { fontSize: "0.75rem" },
      },
      button: {
        fontWeight: 600,
        fontSize: "0.875rem",
        "@media (max-width:900px)": { fontSize: "0.75rem" },
      },
      caption: {
        fontWeight: 300,
        fontSize: "0.75rem",
        "@media (max-width:900px)": { fontSize: "0.625rem" },
      },
      overline: {
        fontWeight: 300,
        fontSize: "0.625rem",
        "@media (max-width:900px)": { fontSize: "0.5rem" },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none", // This will disable text transformation for all buttons
          },
        },
      },
    },
  });

export default getTheme;
