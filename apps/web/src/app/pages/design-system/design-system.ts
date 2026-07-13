import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Icon } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';
import { IconButton } from '../../shared/components/icon-button/icon-button';
import { TextInput } from '../../shared/components/text-input/text-input';
import { Textarea } from '../../shared/components/textarea/textarea';
import { Select, type SelectOption } from '../../shared/components/select/select';
import { Toggle } from '../../shared/components/toggle/toggle';
import {
  SegmentedControl,
  type SegmentedControlOption,
} from '../../shared/components/segmented-control/segmented-control';
import { Badge } from '../../shared/components/badge/badge';
import { Chip } from '../../shared/components/chip/chip';
import { Avatar } from '../../shared/components/avatar/avatar';
import { IconTile } from '../../shared/components/icon-tile/icon-tile';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { Card } from '../../shared/components/card/card';
import { Modal } from '../../shared/components/modal/modal';

const FIELD_TYPE_OPTIONS: SelectOption[] = [
  { value: 'text', label: 'Text' },
  { value: 'longtext', label: 'Long text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'checkbox', label: 'Checkbox' },
];

const VIEW_MODE_OPTIONS: SegmentedControlOption[] = [
  { value: 'list', label: 'List' },
  { value: 'chart', label: 'Chart' },
  { value: 'calendar', label: 'Calendar' },
];

const ACCENT_SAMPLES = [
  '#0FA6AE',
  '#5FA02A',
  '#2FD8E0',
  '#8DDB4C',
  '#1D8A8F',
  '#3E8A55',
  '#0B7A82',
  '#6E9187',
];

@Component({
  selector: 'app-design-system',
  imports: [
    Icon,
    Button,
    IconButton,
    TextInput,
    Textarea,
    Select,
    Toggle,
    SegmentedControl,
    Badge,
    Chip,
    Avatar,
    IconTile,
    EmptyState,
    Card,
    Modal,
  ],
  templateUrl: './design-system.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystem {
  protected readonly themeService = inject(ThemeService);

  protected readonly fieldTypeOptions = FIELD_TYPE_OPTIONS;
  protected readonly viewModeOptions = VIEW_MODE_OPTIONS;
  protected readonly accentSamples = ACCENT_SAMPLES;

  protected readonly sampleText = signal('Pool Maintenance');
  protected readonly sampleTextarea = signal('Water chemistry & upkeep log');
  protected readonly sampleSelect = signal('number');
  protected readonly sampleToggleOn = signal(true);
  protected readonly sampleToggleOff = signal(false);
  protected readonly sampleViewMode = signal('list');
  protected readonly modalOpen = signal(false);

  protected openModal(): void {
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
  }
}
