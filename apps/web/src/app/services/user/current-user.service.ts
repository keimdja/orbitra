import { Injectable, inject } from '@angular/core';
import { UserRepository } from '../../database/repositories/user.repository';
import { ThemeService } from '../theme/theme.service';
import type { User } from '../../models/user/user.model';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly userRepository = inject(UserRepository);
  private readonly themeService = inject(ThemeService);

  /** No auth/multi-user support yet — the first User row found is the only one. */
  getExisting(): Promise<User | undefined> {
    return this.userRepository.getAll().then(([user]) => user);
  }

  /** Bootstraps a nameless/emailless local User on first use if none exists yet. */
  async getOrCreate(): Promise<User> {
    const existing = await this.getExisting();
    if (existing) {
      return existing;
    }
    return this.userRepository.create({ name: '', theme: this.themeService.theme() });
  }
}
