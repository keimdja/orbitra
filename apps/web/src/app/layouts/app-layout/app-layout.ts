import { ChangeDetectionStrategy, Component, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { Icon } from '../../shared/components/icon/icon';
import { Sidebar } from './sidebar/sidebar';
import { TopBar } from './top-bar/top-bar';
import { BottomNav } from './bottom-nav/bottom-nav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Icon, Sidebar, TopBar, BottomNav],
  templateUrl: './app-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-1 min-h-0 flex bg-bg text-text' },
})
export class AppLayout {
  // TEMPORARY (Step 2 addendum): dev-only theme toggle so light/dark can be
  // checked while building later steps, before Step 10 (Settings) adds the
  // real one. Remove this block — and the matching markup in app-layout.html
  // — once Step 10 ships.
  protected readonly isDevMode = isDevMode;
  protected readonly themeService = inject(ThemeService);
}
