import React from 'react';
import {Link} from 'react-router-dom';

function PageNotFound(): React.JSX.Element {
  return (
    <>
      <h1>Ошибка 404. Страница не найдена.</h1>
      <Link to="/">Вернуться на главную</Link>
    </>
  );
}

export default PageNotFound;
