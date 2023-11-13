import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IFilmExtended } from '../../types/film-types.ts';
import Overview from './overview.tsx';
import Details from './details.tsx';
import Reviews from './reviews.tsx';
import { reviewsInfo } from '../../mocks/reviews.ts';

const TABS = ['Overview', 'Details', 'Reviews'] as const;

type Tab = typeof TABS[number];

type TabsProps = {
  film: IFilmExtended;
};

export default function Tabs({ film }: TabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);

  const handleSetActiveTab = useCallback(
    (tab: Tab) => () => {
      setActiveTab(tab);
    },
    []
  );

  useEffect(() => {
    setActiveTab(TABS[0]);
  }, [film.id]);

  const component = useMemo(() => {
    switch (activeTab) {
      case 'Overview':
        return <Overview film={film} />;
      case 'Details':
        return <Details film={film} />;
      case 'Reviews':
        return <Reviews reviews={reviewsInfo} />;
      default:
        return null;
    }
  }, [activeTab, film]);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {TABS.map((tab) => (
            <li
              key={tab}
              className={`film-nav__item ${
                tab === activeTab ? 'film-nav__item--active' : ''
              }`}
            >
              <div className="film-nav__link" onClick={handleSetActiveTab(tab)}>
                {tab}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {component}
    </div>
  );
}
