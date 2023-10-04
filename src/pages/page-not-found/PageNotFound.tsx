import { Link } from 'react-router-dom';
import React from 'react';

export default function PageNotFound(): React.FunctionComponent {
  return (
    <>
      <h1>Ошибка 404. Страница не найдена.</h1>
      <Link to="/">Вернуться на главную</Link>
    </>
  );
}
