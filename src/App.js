import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/universal/Navbar";
import getTheme from "./theme";
import Landing from "./components/pages/Landing";
import Programs from "./components/pages/Programs";
import { useState, useEffect } from "react";

function App() {
  // Initialize to null; will update shortly
  const [mode, setMode] = useState(null);
  const theme = getTheme(mode);

  useEffect(() => {
    // Check if a mode is saved in local storage
    const savedMode = localStorage.getItem('mode');

    if (savedMode) {
      // Use the saved mode
      setMode(savedMode);
    } else {
      // Otherwise, check the system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }

    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setMode(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);

    // Save the new mode in local storage
    localStorage.setItem('mode', newMode);
  };

  if (mode === null) {
    // If mode is not yet determined, don't render the app
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={(theme) => ({ backgroundColor: theme.palette.background.default, display: "flex", flexDirection: "column", height: "100vh" })}>
        <Router>
          <Navbar toggleMode={toggleMode} mode={mode} />
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            height="92vh"
            width="100vw"
          >
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/programs" element={<Programs />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
