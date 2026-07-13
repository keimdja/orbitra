import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { Icon } from '../icon/icon';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: string;
}

const ACTIVE_CLASSES = 'bg-surface text-text shadow-card';
const INACTIVE_CLASSES = 'bg-transparent text-text-3';

@Component({
  selector: 'app-segmented-control',
  imports: [Icon],
  templateUrl: './segmented-control.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControl {
  readonly options = input.required<SegmentedControlOption[]>();
  readonly value = model<string>('');

  protected optionClasses(optionValue: string): string {
    const stateClasses = optionValue === this.value() ? ACTIVE_CLASSES : INACTIVE_CLASSES;
    return `inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[8px] text-[12.5px] font-semibold cursor-pointer transition-colors ${stateClasses}`;
  }

  protected select(optionValue: string): void {
    this.value.set(optionValue);
  }
}
