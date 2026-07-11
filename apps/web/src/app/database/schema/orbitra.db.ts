import { Injectable } from '@angular/core';
import Dexie, { type Table } from 'dexie';
import type { User } from '../../models/user/user.model';
import type { Dashboard } from '../../models/dashboard/dashboard.model';
import type { Field } from '../../models/field/field.model';
import type { Entry } from '../../models/entry/entry.model';

@Injectable({ providedIn: 'root' })
export class OrbitraDatabase extends Dexie {
  users!: Table<User, string>;
  dashboards!: Table<Dashboard, string>;
  fields!: Table<Field, string>;
  entries!: Table<Entry, string>;

  constructor() {
    super('orbitra');

    this.version(1).stores({
      users: '&id, email',
      dashboards: '&id, userId, sortOrder',
      fields: '&id, dashboardId, sortOrder',
      entries: '&id, dashboardId',
    });
  }
}
