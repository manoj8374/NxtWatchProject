import { action, makeAutoObservable, observable } from 'mobx';

class ThemeStore {
  theme = 'Dark';

  constructor() {
    makeAutoObservable(this,{
        toggleTheme: action.bound
    });
  }

  toggleTheme(): void {
    console.log("Toggle theme called")
    console.log(this.theme)
    this.theme = this.theme === 'Light' ? 'Dark' : 'Light';
  }

// toggleTheme = (): void => {
//     console.log("Toggle theme called");
//     console.log(this.theme);
//     this.theme = this.theme === 'Light' ? 'Dark' : 'Light';
//   };

  setTheme(theme: 'Light' | 'Dark'): void {
    this.theme = theme;
  }

  isDarkTheme(): boolean {
    return this.theme === 'Dark';
  }

  isLightTheme(): boolean {
    return this.theme === 'Light';
  }
}

export const themeStore = new ThemeStore(); 