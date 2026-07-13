import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AvatarSize = 'sm' | 'md';

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-[13px]',
  md: 'w-[52px] h-[52px] text-lg',
};

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly initials = input.required<string>();
  readonly size = input<AvatarSize>('md');

  protected readonly classes = computed(
    () =>
      `inline-flex items-center justify-center flex-none rounded-full bg-linear-to-br from-accent to-info text-white font-bold ${SIZE_CLASSES[this.size()]}`,
  );
}
