import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import { Box, styled } from "@mui/material";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecordingsPage from "./pages/RecordingsPage";
import NewRecordingPage from "./pages/NewRecordingPage";
import RecordingSavePage from "./pages/RecordingSavePage";
import { ToastContainer } from "react-toastify";
import RecordingEditPage from "./pages/RecordingEditPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          <Header />
          <MainBox>
            <Routes>
              <Route path="/" element={<RecordingsPage />} />
              <Route path="/new-recording" element={<NewRecordingPage />} />
              <Route path="/save-recording" element={<RecordingSavePage />} />
              <Route path="/edit-recording/:id" element={<RecordingEditPage />} />
            </Routes>
          </MainBox>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;



const MainBox = styled(Box)(() => ({
  height: "calc(100vh - 160px)",
  width: "630px",
  margin: "0 auto",
}));
