import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon, type IconSize } from '../icon/icon';
import { hexWithAlpha } from '../../../core/utils/color.util';

export type IconTileSize = 'sm' | 'md' | 'lg';

const TILE_SIZE_CLASSES: Record<IconTileSize, string> = {
  sm: 'w-9 h-9 rounded-[10px]',
  md: 'w-[46px] h-[46px] rounded-[13px]',
  lg: 'w-14 h-14 rounded-2xl',
};

const ICON_SIZE_BY_TILE_SIZE: Record<IconTileSize, IconSize> = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};

const WEAK_BACKGROUND_ALPHA = 0.14;

@Component({
  selector: 'app-icon-tile',
  imports: [Icon],
  templateUrl: './icon-tile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTile {
  readonly icon = input.required<string>();
  readonly accentColor = input.required<string>();
  readonly size = input<IconTileSize>('md');

  protected readonly tileClasses = computed(
    () => `inline-flex items-center justify-center flex-none ${TILE_SIZE_CLASSES[this.size()]}`,
  );
  protected readonly iconSize = computed(() => ICON_SIZE_BY_TILE_SIZE[this.size()]);
  protected readonly background = computed(() =>
    hexWithAlpha(this.accentColor(), WEAK_BACKGROUND_ALPHA),
  );
}
