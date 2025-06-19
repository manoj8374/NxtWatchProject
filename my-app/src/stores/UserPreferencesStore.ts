import { makeAutoObservable, computed } from 'mobx';

class UserPreferencesStore {
  likedVideos: string[] = [];
  dislikedVideos: string[] = [];

  constructor() {
    makeAutoObservable(this, {
      likedVideosCount: computed,
      dislikedVideosCount: computed,
    });
  }

  addToLikedVideos(id: string): void {
    // Remove from disliked if present
    if (this.dislikedVideos.includes(id)) {
      this.dislikedVideos = this.dislikedVideos.filter(eachId => eachId !== id);
    }
    // Add to liked if not already present
    if (!this.likedVideos.includes(id)) {
      this.likedVideos.push(id);
    }
  }

  addToDislikedVideos(id: string): void {
    // Remove from liked if present
    if (this.likedVideos.includes(id)) {
      this.likedVideos = this.likedVideos.filter(eachId => eachId !== id);
    }
    // Add to disliked if not already present
    if (!this.dislikedVideos.includes(id)) {
      this.dislikedVideos.push(id);
    }
  }

  removeFromLikedVideos(id: string): void {
    this.likedVideos = this.likedVideos.filter(eachId => eachId !== id);
  }

  removeFromDislikedVideos(id: string): void {
    this.dislikedVideos = this.dislikedVideos.filter(eachId => eachId !== id);
  }

  clearAllPreferences(): void {
    this.likedVideos = [];
    this.dislikedVideos = [];
  }

  isVideoLiked(videoId: string): boolean {
    return this.likedVideos.includes(videoId);
  }

  isVideoDisliked(videoId: string): boolean {
    return this.dislikedVideos.includes(videoId);
  }

  get likedVideosCount(): number {
    return this.likedVideos.length;
  }

  get dislikedVideosCount(): number {
    return this.dislikedVideos.length;
  }
}

export const userPreferencesStore = new UserPreferencesStore(); 