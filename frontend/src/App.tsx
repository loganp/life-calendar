import React, { useEffect, useState  } from 'react';
import { Profile, Comments, NotFound, Header} from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initialState, { getLifeExpectancy } from './initialState';

function App() {
  let [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);
  const weeks: string [] = [];

  useEffect(() => {
    console.log("-- App rerenders --");
  });
  
  let getSearchClick = () => {
    currentProfile = getLifeExpectancy();
    setCurrentProfile(currentProfile)
  };

  let profile = <Profile {...currentProfile} 
    getSearchClick={getSearchClick}
    weeks={weeks}
  />

  let comments = <Comments />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={profile} />
            <Route path="/comments" element={comments} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;