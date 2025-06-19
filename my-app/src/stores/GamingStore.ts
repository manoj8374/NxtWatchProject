import { makeAutoObservable, runInAction, computed } from 'mobx';
import { GamingCardDetails } from '../components/Interfaces/propsInterfaces';
import { fetchGameDetails } from '../apiCalls';

class GamingStore {
  data: GamingCardDetails[] = [];
  isLoading = false;
  errorView = false;

  constructor() {
    makeAutoObservable(this, {
      gamingCount: computed,
    });
  }

  async fetchGamingVideos() {
    this.isLoading = true;
    this.errorView = false;
    try {
      const videos = await fetchGameDetails();
      runInAction(() => {
        this.data = videos;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.errorView = true;
        this.isLoading = false;
      });
    }
  }

  get gamingCount() {
    return this.data.length;
  }
}

export const gamingStore = new GamingStore(); 