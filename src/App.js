import React from 'react';
import './App.scss';
import Layout from './Components/Layout';
import RestrictedContainer from './Components/RestrictedContainer'
import './style/font-awesome.min.css'
import './style/bootstrap.min.css'
import './style/animate.css'
import './style/oswald.css'
import './style/vibes.css'

function App() {
  return (
    <Layout>
      <RestrictedContainer />
    </Layout>
  );
}

export default App; 
