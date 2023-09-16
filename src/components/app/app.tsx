import MainPage from '../pages/mainPage';
import React from 'react';

interface MainPageProps {
  movieName: string;
  genre: string;
  promoDate: string;
}

function App(mainpageprops: MainPageProps): React.FunctionComponent {
  return (
    <MainPage movieName={mainpageprops.movieName}
      genre={mainpageprops.genre}
      promoDate={mainpageprops.promoDate}
    />
  );
}

export default App;
