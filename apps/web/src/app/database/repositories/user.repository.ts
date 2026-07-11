import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { OrbitraDatabase } from '../schema/orbitra.db';
import { UserSchema, UserUpdateSchema, type User } from '../../models/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserRepository {
  private readonly db = inject(OrbitraDatabase);

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const record: User = UserSchema.parse({ ...user, id: uuidv4(), createdAt: new Date() });
    await this.db.users.add(record);
    return record;
  }

  getById(id: string): Promise<User | undefined> {
    return this.db.users.get(id);
  }

  getAll(): Promise<User[]> {
    return this.db.users.toArray();
  }

  async update(id: string, changes: Partial<Omit<User, 'id'>>): Promise<void> {
    await this.db.users.update(id, UserUpdateSchema.parse(changes));
  }

  delete(id: string): Promise<void> {
    return this.db.users.delete(id);
  }
}
