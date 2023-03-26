import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import { useAppSelector } from '../../store';
import CitiesPlaces from '../../components/cities-places/cities-places';
import NoCitiesPlaces from '../../components/no-cities-places/no-cities-places';

type MainScreenProps = {
  offersData: Offer[];
};

function MainScreen({offersData}: MainScreenProps): JSX.Element {

  const currentCity = useAppSelector((state) => state.currentCity);
  const OffersList = useAppSelector((state) => state.offersList);

  const filteredOffers = OffersList.filter((offer) => offer.city.name === currentCity);

  const isFilteredOffers = filteredOffers.length >= 1;

  const getPageEmptyClassName = !isFilteredOffers ? ' page__main--index-empty' : '';

  return (
    <div className={`page page--gray page--main${getPageEmptyClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Navigation offersData={offersData}/>
          </div>
        </div>
      </header>

      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isFilteredOffers && <CitiesPlaces filteredOffers={filteredOffers}/>}
            {!isFilteredOffers && <NoCitiesPlaces />}
            <div className="cities__right-section">
              {isFilteredOffers && <Map filteredOffers={filteredOffers} className={'cities__map map'} height={'auto'} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
