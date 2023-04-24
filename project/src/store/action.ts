import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { UserComment } from '../types/user';
import UserData from '../types/user-data';

const Action = {
  LOAD_OFFERS: 'LOAD_OFFERS',
  LOAD_FAVORITES: 'LOAD_FAVORITES',
  ADD_FAVORITE_OFFER: 'ADD_FAVORITE_OFFER',
  LOAD_OFFER: 'LOAD_OFFER',
  CHANGE_CITY: 'CHANGE_CITY',
  FILTER_OFFERS: 'FILTER_OFFERS',
  SORT_OFFERS: 'SORT_OFFERS',
  AUTORISATION_STATUS: 'AUTORISATION_STATUS',
  LOADING_OFFERS_STATUS: 'LOADING_OFFERS_STATUS',
  LOADING_OFFER_STATUS: 'LOADING_OFFER_STATUS',
  NEARBY_OFFERS: 'NEARBY_OFFERS',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  USER_LOGIN: 'USER_LOGIN',
  GET_USER_DATA: 'GET_USER_DATA',
  CHANGE_CURRENT_OFFER: 'CHANGE_CURRENT_OFFER',
} as const;

const loadOffersAction = createAction<Offer[]>(Action.LOAD_OFFERS);

const loadFavoritesAction = createAction<Offer[]>(Action.LOAD_FAVORITES);

const addFavoritesAction = createAction<Offer>(Action.ADD_FAVORITE_OFFER);

const loadOfferAction = createAction<Offer>(Action.LOAD_OFFER);

const loadNearbyOffersAction = createAction<Offer[]>(Action.NEARBY_OFFERS);

const loadComments = createAction<UserComment[]>(Action.LOAD_COMMENTS);

const addReview = createAction<UserComment[]>(Action.ADD_COMMENT);

const changeCityAction = createAction(Action.CHANGE_CITY, (city: string) => ({payload: city}));

const filteringOffersAction = createAction(Action.FILTER_OFFERS, (city: string) => ({payload: city}));

const sortingOffersAction = createAction(Action.SORT_OFFERS, (sortType: string, city: string) => ({payload: {sortType, city}}));

const requierAuthorizationStatus = createAction<AuthorizationStatus>(Action.AUTORISATION_STATUS);

const setOffersDataLoadingStatus = createAction<boolean>(Action.LOADING_OFFERS_STATUS);

const setRoomDataLoadingStatus = createAction<boolean>(Action.LOADING_OFFER_STATUS);

const getUserData = createAction<UserData>(Action.GET_USER_DATA);

const removeUserData = createAction<null>(Action.USER_LOGIN);

const changeCurrentOffer = createAction<boolean>(Action.CHANGE_CURRENT_OFFER);

export {
  changeCurrentOffer,
  loadOffersAction,
  Action,
  loadNearbyOffersAction,
  changeCityAction,
  filteringOffersAction,
  sortingOffersAction,
  requierAuthorizationStatus,
  loadFavoritesAction,
  addFavoritesAction,
  loadOfferAction,
  setOffersDataLoadingStatus,
  setRoomDataLoadingStatus,
  loadComments,
  addReview,
  getUserData,
  removeUserData,
};
