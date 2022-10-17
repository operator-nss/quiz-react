import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/Preloader/Preloader';

const App = () => {
  const History = React.lazy(
    () => import(/* webpackChunkName: "HistoryContainer" */ './pages/History/HistoryContainer'),
  );
  const NoMatch = React.lazy(
    () => import(/* webpackChunkName: "NoMatch" */ './pages/NoMatch/NoMatch'),
  );
  const RulesLazy = React.lazy(() => import(/* webpackChunkName: "Rules" */ './pages/Rules/Rules'));

  return (
    <BrowserRouter>
      <div className="App pb-80 ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route
            path="/history"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Preloader />
                  </div>
                }
              >
                <History />
              </React.Suspense>
            }
          />
          <Route
            path="/rules"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Preloader />
                  </div>
                }
              >
                <RulesLazy />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <Preloader />
                  </div>
                }
              >
                <NoMatch />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
