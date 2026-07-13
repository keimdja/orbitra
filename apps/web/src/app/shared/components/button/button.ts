import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Icon, type IconSize } from '../icon/icon';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md';

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-1.5 font-semibold cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white shadow-[0_4px_14px_-4px_var(--accent)] hover:brightness-95',
  secondary: 'bg-surface-2 text-text border border-border hover:border-border-2',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-[38px] px-4 text-[14px] rounded-[11px]',
  md: 'h-[46px] px-5 text-[14.5px] rounded-[12px]',
};

const ICON_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, IconSize> = {
  sm: 'md',
  md: 'lg',
};

@Component({
  selector: 'app-button',
  imports: [Icon],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly icon = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit'>('button');

  readonly clicked = output<void>();

  protected readonly classes = computed(
    () => `${BASE_CLASSES} ${VARIANT_CLASSES[this.variant()]} ${SIZE_CLASSES[this.size()]}`,
  );
  protected readonly iconSize = computed(() => ICON_SIZE_BY_BUTTON_SIZE[this.size()]);

  protected onClick(): void {
    if (this.disabled()) {
      return;
    }
    this.clicked.emit();
  }
}
