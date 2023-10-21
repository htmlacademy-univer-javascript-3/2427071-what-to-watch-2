import Logo from '../logo/logo';
import React from 'react';

function Footer(): React.JSX.Element {
  return (
    <footer className="page-footer">
      <Logo isLight={false} />
      <div className="copyright">
        <p>© 2023 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
