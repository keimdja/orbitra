import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { STORAGE_KEYS } from '../../core/constants/storage-keys';
import { ThemeSchema, type Theme } from '../../models/user/user.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly themeSignal = signal<Theme>(this.readStoredTheme() ?? this.readSystemTheme());
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    this.applyToDocument(this.themeSignal());
  }

  toggle(): void {
    this.set(this.themeSignal() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.themeSignal.set(theme);
    this.applyToDocument(theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  private applyToDocument(theme: Theme): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }

  private readStoredTheme(): Theme | null {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    const parsed = ThemeSchema.safeParse(stored);
    return parsed.success ? parsed.data : null;
  }

  private readSystemTheme(): Theme {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
