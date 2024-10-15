/* 
  Description: Main application component that sets up routing for different pages 
  and provides global context for drivers and teams using context providers.
  It uses BrowserRouter from react-router-dom to define routes for various pages, 
  such as Home, Quiz, Drivers, Teams, and Admin pages for both drivers and teams.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  DriversPage,
  DriversAdminPage,
  DeleteDriversPage,
  TeamsPage,
  TeamsAdminPage,
  DeleteTeamsPage,
} from "./pages";
import QuizPage from "./pages/QuizPage";
import MainNavigation from "./components/shared/PageHeader";
import { DriversProvider } from "./contexts/DriversContext";
import { TeamsProvider } from "./contexts/TeamsContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNavigation /> {/* Navigation bar for the app header. */}
        <main className="container">
          {/* Wrapping the routes with the drivers and teams context providers to make the data available. */}
          <DriversProvider>
            <TeamsProvider>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="quiz" element={<QuizPage />}></Route>
                <Route path="drivers" element={<DriversPage />}></Route>
                <Route
                  path="drivers-admin"
                  element={<DriversAdminPage />}
                ></Route>
                <Route
                  path="delete-drivers"
                  element={<DeleteDriversPage />}
                ></Route>
                <Route path="teams" element={<TeamsPage />}></Route>
                <Route path="teams-admin" element={<TeamsAdminPage />}></Route>
                <Route
                  path="delete-teams"
                  element={<DeleteTeamsPage />}
                ></Route>
              </Routes>
            </TeamsProvider>
          </DriversProvider>
        </main>
        <footer></footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
