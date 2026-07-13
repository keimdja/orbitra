import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

export type IconButtonVariant = 'default' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md';

const BASE_CLASSES =
  'inline-flex items-center justify-center flex-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  default: 'border border-border bg-surface text-text-2 hover:bg-surface-2',
  ghost: 'bg-transparent text-text-3 hover:bg-danger-weak hover:text-danger',
  danger: 'border border-border bg-surface text-danger hover:bg-danger-weak',
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: 'w-[34px] h-[34px] rounded-[9px]',
  md: 'w-[38px] h-[38px] rounded-[10px]',
};

@Component({
  selector: 'app-icon-button',
  imports: [Icon],
  templateUrl: './icon-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButton {
  readonly icon = input.required<string>();
  readonly ariaLabel = input.required<string>();
  readonly variant = input<IconButtonVariant>('default');
  readonly size = input<IconButtonSize>('md');
  readonly disabled = input<boolean>(false);

  readonly clicked = output<void>();

  protected readonly classes = computed(
    () => `${BASE_CLASSES} ${VARIANT_CLASSES[this.variant()]} ${SIZE_CLASSES[this.size()]}`,
  );

  protected onClick(): void {
    if (this.disabled()) {
      return;
    }
    this.clicked.emit();
  }
}
