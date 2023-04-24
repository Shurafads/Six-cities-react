import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, OPTIONS, defaultCity } from '../const';
import { SortToHigh, SortToLow, SortTopRating } from '../utils';
import { loadOfferAction,
  changeCityAction,
  filteringOffersAction,
  loadFavoritesAction,
  loadOffersAction,
  requierAuthorizationStatus,
  sortingOffersAction,
  setOffersDataLoadingStatus,
  loadNearbyOffersAction,
  loadComments,
  getUserData,
  removeUserData,
  setRoomDataLoadingStatus,
  addReview,
  addFavoritesAction,
  changeCurrentOffer,
} from './action';
import { Offer } from '../types/offer';
import { UserComment } from '../types/user';
import UserData from '../types/user-data';

type TInitialState = {
  currentCity: string;
  offersList: Offer[];
  offersListCopy: Offer[];
  favoriteOffersList: Offer[];
  favoriteOffersListCopy: Offer[];
  currentOffer: Offer | null;
  isLoadingOffersData: boolean;
  isLoadingRoomData: boolean;
  reviewsList: UserComment[];
  nearbyOffersList : Offer[];
  authorizationStatus: AuthorizationStatus;
  userLogin: UserData | null;
}

const initialState: TInitialState = {
  currentCity: defaultCity,
  offersList: [],
  offersListCopy: [],
  favoriteOffersList: [],
  favoriteOffersListCopy: [],
  currentOffer: null,
  isLoadingOffersData: true,
  isLoadingRoomData: true,
  reviewsList: [],
  nearbyOffersList : [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userLogin: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffersAction, (state, action) => {
      state.offersList = action.payload;
      state.offersListCopy = state.offersList.filter((offer) => offer.city.name === state.currentCity);
    })
    .addCase(loadFavoritesAction, (state, action) => {
      state.favoriteOffersList = action.payload;
      state.favoriteOffersListCopy = action.payload;
    })
    .addCase(addFavoritesAction, (state, action) => {
      const data = action.payload;
      const currentOffer = state.favoriteOffersListCopy.find((item) => item.id === data.id);
      state.offersListCopy.forEach((offer) => {
        if (offer.id === action.payload.id) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
      state.offersList.forEach((offer) => {
        if (offer.id === action.payload.id) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
      if (currentOffer) {
        state.favoriteOffersListCopy = state.favoriteOffersListCopy.filter((offer) => offer.id !== currentOffer.id);
      }
      else {
        state.favoriteOffersListCopy = [...state.favoriteOffersListCopy, data];
      }
    })
    .addCase(changeCityAction, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(filteringOffersAction, (state, action) => {
      state.offersListCopy = state.offersList.filter((offer) => offer.city.name === action.payload);
    })
    .addCase(loadOfferAction, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(changeCurrentOffer, (state, action) => {
      if (state.currentOffer) {
        state.currentOffer.isFavorite = action.payload;
      }
    })
    .addCase(loadNearbyOffersAction, (state, action) => {
      state.nearbyOffersList = action.payload;
    })
    .addCase(requierAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isLoadingOffersData = action.payload;
    })
    .addCase(setRoomDataLoadingStatus, (state, action) => {
      state.isLoadingRoomData = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.reviewsList = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviewsList = action.payload;
    })
    .addCase(sortingOffersAction, (state, action) => {
      if (action.payload.sortType === OPTIONS.POPULAR) {
        state.offersListCopy = state.offersList.filter((offer) => offer.city.name === action.payload.city);
      }
      if (action.payload.sortType === OPTIONS.PRICE_TO_HIGH) {
        state.offersListCopy = state.offersListCopy.sort(SortToHigh);
      }
      if (action.payload.sortType === OPTIONS.PRICE_TO_LOW) {
        state.offersListCopy = state.offersListCopy.sort(SortToLow);
      }
      if (action.payload.sortType === OPTIONS.TOP_RATED) {
        state.offersListCopy = state.offersListCopy.sort(SortTopRating);
      }
    })
    .addCase(getUserData, (state, action) => {
      state.userLogin = action.payload;
    })
    .addCase(removeUserData, (state, action) => {
      state.userLogin = action.payload;
    });
});

export { reducer };
