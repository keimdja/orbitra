import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const BASE_CLASSES = 'bg-surface border border-border rounded-2xl shadow-card p-[18px]';
const CLICKABLE_CLASSES =
  'cursor-pointer transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-[3px] hover:shadow-card-lg hover:border-border-2';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly clickable = input<boolean>(false);

  protected readonly classes = computed(
    () => `${BASE_CLASSES} ${this.clickable() ? CLICKABLE_CLASSES : ''}`,
  );
}
