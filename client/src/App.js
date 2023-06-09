import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Import Themes to use dark by default
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Import the different pages 
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MyPrograms from './pages/MyPrograms';
import StartWorkout from './pages/Workout';
import ProgramPhases from './pages/ProgramPhases';
import PhaseWorkouts from './pages/PhaseWorkouts';
import AddProgram from './pages/AddProgram';
import AddPhase from './pages/AddPhase';
import AddWorkout from './pages/AddWorkout';
import AddExercise from './pages/AddExercise';
import NoMatch from './pages/NoMatch';

// Set dark theme as the default
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Set dark theme as the default
  const [themeMode, setThemeMode] = useState(sessionStorage.getItem("ff-theme-mode") || 'dark');
  
  const darkTheme = createTheme({
    palette: {
      mode:  themeMode,
    },
  });
  
  const handleThemeChange = () => {
    if (themeMode === 'dark') {
      sessionStorage.setItem("ff-theme-mode","light");
      setThemeMode('light');
    } else {
      sessionStorage.setItem("ff-theme-mode","dark");
      setThemeMode('dark');
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Navbar modeState={handleThemeChange} />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/exercise/:workoutId"
                element={<StartWorkout />}
              />
              <Route
                path="/programs"
                element={<MyPrograms />}
              />
              <Route
                path="/phases/:programId"
                element={<ProgramPhases />}
              />
              <Route
                path="/workouts/:phaseId"
                element={<PhaseWorkouts />}
              />
              <Route
                path="/add-program"
                element={<AddProgram />}
              />
              <Route
                path="/add-phase/:programId?"
                element={<AddPhase />}
              />
              <Route
                path="/add-workout/:phaseId?"
                element={<AddWorkout />}
              />
              <Route
                path="/add-exercise/:workoutId?"
                element={<AddExercise />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
