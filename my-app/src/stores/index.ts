import React from 'react';
import { homeStore } from './HomeStore';
import { trendingStore } from './TrendingStore';
import { gamingStore } from './GamingStore';
import { videoItemStore } from './VideoItemStore';
import { savedVideosStore } from './SavedVideosStore';
import { userPreferencesStore } from './UserPreferencesStore';
import { themeStore } from './ThemeStore';

export const stores = {
  homeStore,
  trendingStore,
  gamingStore,
  videoItemStore,
  savedVideosStore,
  userPreferencesStore,
  themeStore,
};

export const StoresContext = React.createContext(stores);

export const useStores = () => React.useContext(StoresContext); 