import React from 'react';

type GenreItemProps = {
  name: string;
  isActive: boolean;
}

function GenreItem({name, isActive}: GenreItemProps): React.JSX.Element {
  const computedClassName = `catalog__genres-item catalog__genres-item${
    isActive ? '--active' : ''}`;

  return (
    <li className={computedClassName}>
      <a href="#" className="catalog__genres-link">
        {name}
      </a>
    </li>
  );
}

export default GenreItem;
