import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/components/icon/icon';
import { IconButton } from '../../../shared/components/icon-button/icon-button';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, Icon, IconButton],
  templateUrl: './top-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'hidden lg:flex flex-none h-[58px] items-center gap-3.5 px-[26px] border-b border-border bg-surface',
  },
})
export class TopBar {}
