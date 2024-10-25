import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './app/Navigation';
import {GlobalProvider} from './app/components/GlobalContext';

export default function App() {
  return (
    <GlobalProvider>
      <StatusBar />
      <Navigation />
    </GlobalProvider>
  );
}
