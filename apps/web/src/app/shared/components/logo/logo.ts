import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';

export type LogoVariant = 'wordmark' | 'mark';

// Asset naming matches the theme it's used in directly: "-light" renders in
// light mode, "-dark" renders in dark mode.
const ASSET_PATHS: Record<LogoVariant, Record<'light' | 'dark', string>> = {
  wordmark: {
    light: 'brand/wordmark-light.svg',
    dark: 'brand/wordmark-dark.svg',
  },
  mark: {
    light: 'brand/mark-light.svg',
    dark: 'brand/mark-dark.svg',
  },
};

@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block' },
})
export class Logo {
  private readonly themeService = inject(ThemeService);

  readonly variant = input<LogoVariant>('wordmark');

  protected readonly src = computed(() => ASSET_PATHS[this.variant()][this.themeService.theme()]);
}
