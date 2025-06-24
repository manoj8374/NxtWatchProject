import { makeAutoObservable, runInAction } from 'mobx';
import { VideoContextInterface } from '../components/Interfaces/index';
import { fetchVideoItemDetails } from '../apiCalls';

class VideoItemStore {
  data: VideoContextInterface | null = null;
  loading = false;
  errorView = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVideoItem(id: string) {
    this.loading = true;
    this.errorView = false;
    try {
      const video = await fetchVideoItemDetails(id);
      runInAction(() => {
        this.data = video;
        this.loading = false;
        console.log(video);
      });
    } catch (e) {
      runInAction(() => {
        this.errorView = true;
        this.loading = false;
      });
    }
  }

  setData(video: VideoContextInterface) {
    this.data = video;
  }
}

export const videoItemStore = new VideoItemStore(); 