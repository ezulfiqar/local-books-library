import { Container } from "@mui/material";
import React from "react";
import { Books } from "./modules/Books";

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <Books />
      </Container>
    </div>
  );
}

export default App;
