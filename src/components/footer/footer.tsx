import React from 'react';
import Logo from '../logo/logo';

function Footer(): React.JSX.Element {
  return (
    <footer className="page-footer">
      <Logo isLight/>
      <div className="copyright">
        <p>© 2023 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
