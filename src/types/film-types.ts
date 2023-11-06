export interface IFilm {
    id: number;
    name: string;
    posterImage: string;
    alt: string;
  }
  
  export interface IFilmExtended extends IFilm {
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: [string];
    runTime: number;
    genre: string;
    released: number;
    isFavorite: boolean;
  }