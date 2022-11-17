import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import { Header } from "./components";
import { Books } from "./modules/Books";

function App() {
  return (
    <div className="App">
      <Box>
        <Header />
        <Toolbar />
        <Box component="main" sx={{ p: 3 }}>
          <Container maxWidth="md">
            <Books />
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default App;
