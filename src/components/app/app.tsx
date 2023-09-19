import Main from '../pages/main/main';
import React from 'react';

interface MainPageProps {
  movieName: string;
  genre: string;
  promoDate: string;
}

function App(mainpageprops: MainPageProps): React.FunctionComponent {
  return (
    <Main movieName={mainpageprops.movieName}
      genre={mainpageprops.genre}
      promoDate={mainpageprops.promoDate}
    />
  );
}

export default App;
