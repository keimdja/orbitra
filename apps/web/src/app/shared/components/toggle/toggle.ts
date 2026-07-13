import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

const BASE_CLASSES =
  'inline-flex items-center flex-none w-[42px] h-[25px] rounded-full p-0.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toggle {
  readonly ariaLabel = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly checked = model<boolean>(false);

  protected readonly trackClasses = computed(
    () =>
      `${BASE_CLASSES} ${this.checked() ? 'bg-accent justify-end' : 'bg-surface-3 justify-start'}`,
  );

  protected onClick(): void {
    if (this.disabled()) {
      return;
    }
    this.checked.set(!this.checked());
  }
}
