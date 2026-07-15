import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { Icon } from '../../../shared/components/icon/icon';
import { IconButton } from '../../../shared/components/icon-button/icon-button';
import { Logo } from '../../../shared/components/logo/logo';

@Component({
  selector: 'app-top-bar',
  imports: [Icon, IconButton, Logo],
  templateUrl: './top-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'hidden lg:flex flex-none h-[58px] items-center gap-3.5 px-[26px] border-b border-border bg-surface',
  },
})
export class TopBar {
  protected readonly searchService = inject(SearchService);

  protected onSearchInput(event: Event): void {
    this.searchService.setQuery((event.target as HTMLInputElement).value);
  }
}
