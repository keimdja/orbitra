import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../../shared/components/icon/icon';
import { NAV_ITEMS } from '../nav-items';

const LEFT_ITEM_COUNT = 2;

@Component({
  selector: 'app-bottom-nav',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, Icon],
  templateUrl: './bottom-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex md:hidden flex-none h-[70px] items-center justify-around px-2.5 pb-2 border-t border-border bg-surface',
  },
})
export class BottomNav {
  protected readonly leftItems = NAV_ITEMS.slice(0, LEFT_ITEM_COUNT);
  protected readonly rightItems = NAV_ITEMS.slice(LEFT_ITEM_COUNT);
}
