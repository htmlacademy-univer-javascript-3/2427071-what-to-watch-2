import { Link } from 'react-router-dom';

type LogoProps = {
  color?: string;
};

export default function Logo({ color = '' }: LogoProps): JSX.Element {
  const computedStyleClass = `logo__link ${color ? 'logo__link--light' : ''}`;

  return (
    <div className="logo">
      <Link to="/" className={computedStyleClass}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
