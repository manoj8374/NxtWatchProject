import { makeAutoObservable, runInAction, computed } from 'mobx';
import { HomeVideoCardDetails } from '../components/Interfaces/propsInterfaces';
import { fetchTrendingDetails } from '../apiCalls';

class TrendingStore {
  data: HomeVideoCardDetails[] = [];
  isLoading = false;
  errorView = false;

  constructor() {
    makeAutoObservable(this, {
      trendingCount: computed,
    });
  }

  async fetchTrendingVideos() {
    this.isLoading = true;
    this.errorView = false;
    try {
      const videos = await fetchTrendingDetails();
      runInAction(() => {
        this.data = videos;
        this.isLoading = false;
        console.log(videos);
      });
    } catch (e) {
      runInAction(() => {
        this.errorView = true;
        this.isLoading = false;
      });
    }
  }

  get trendingCount() {
    return this.data.length;
  }
}

export const trendingStore = new TrendingStore(); 