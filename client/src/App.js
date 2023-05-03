import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Import the different pages 
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MyPrograms from './pages/MyPrograms';
import StartWorkout from './pages/Workout';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/workout" 
              element={<StartWorkout />} 
            />
            <Route 
              path="/programs" 
              element={<MyPrograms />} 
            />
            <Route 
              path="*" 
              element={<NoMatch />} 
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
