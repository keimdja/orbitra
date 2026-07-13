import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconWeight = 400 | 500 | 600;

const SIZE_CLASSES: Record<IconSize, string> = {
  sm: 'text-[16px]',
  md: 'text-[20px]',
  lg: 'text-[24px]',
  xl: 'text-[28px]',
  '2xl': 'text-[32px]',
};

// font-variation-settings is a single shorthand — every FILL/weight combo must
// exist as one literal class so Tailwind's static scanner can find it, since a
// runtime-interpolated arbitrary value is invisible to the build-time scan.
const VARIATION_CLASSES: Record<string, string> = {
  '0-400': "[font-variation-settings:'FILL'_0,'wght'_400]",
  '0-500': "[font-variation-settings:'FILL'_0,'wght'_500]",
  '0-600': "[font-variation-settings:'FILL'_0,'wght'_600]",
  '1-400': "[font-variation-settings:'FILL'_1,'wght'_400]",
  '1-500': "[font-variation-settings:'FILL'_1,'wght'_500]",
  '1-600': "[font-variation-settings:'FILL'_1,'wght'_600]",
};

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex items-center justify-center',
  },
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input<IconSize>('md');
  readonly filled = input<boolean>(false);
  readonly weight = input<IconWeight>(400);

  protected readonly classes = computed(() => {
    const variationKey = `${this.filled() ? 1 : 0}-${this.weight()}`;
    return `font-symbols select-none leading-none ${SIZE_CLASSES[this.size()]} ${VARIATION_CLASSES[variationKey]}`;
  });
}
