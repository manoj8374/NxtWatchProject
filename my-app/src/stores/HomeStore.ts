import { makeAutoObservable, runInAction } from 'mobx';
import { HomeVideoCardDetails } from '../components/Interfaces/propsInterfaces';
import { fetchHomeDetails } from '../apiCalls';

class HomeStore {
  data: HomeVideoCardDetails[] = [];
  isLoading = false;
  errorView = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVideos(searchValue: string) {
    this.isLoading = true;
    this.errorView = false;
    try {
      const videos = await fetchHomeDetails(searchValue);
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

  setData(videos: HomeVideoCardDetails[]) {
    this.data = videos;
  }
}

export const homeStore = new HomeStore(); 