import { makeAutoObservable, computed } from 'mobx';
import { VideoContextInterface } from '../components/Interfaces/index';

class SavedVideosStore {
  savedVideos: VideoContextInterface[] = [];

  constructor() {
    makeAutoObservable(this, {
      savedVideosCount: computed,
    });
  }

  saveVideo(videoDetails: VideoContextInterface): void {
    const isPresent = this.savedVideos.some(
      eachItem => eachItem.id === videoDetails.id,
    );
    if (!isPresent) {
      this.savedVideos.push(videoDetails);
    } else {
      this.savedVideos = this.savedVideos.filter(
        eachItem => eachItem.id !== videoDetails.id,
      );
    }
  }

  removeVideo(videoId: string): void {
    this.savedVideos = this.savedVideos.filter(
      eachItem => eachItem.id !== videoId,
    );
  }

  clearAllVideos(): void {
    this.savedVideos = [];
  }

  get savedVideosCount(): number {
    return this.savedVideos.length;
  }

  isVideoSaved(videoId: string): boolean {
    return this.savedVideos.some(video => video.id === videoId);
  }
}

export const savedVideosStore = new SavedVideosStore(); 