import { TestBed } from '@angular/core/testing';

import { TheMealDbService } from './the-meal-db.service';

describe('TheMealDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheMealDbService = TestBed.get(TheMealDbService);
    expect(service).toBeTruthy();
  });
});
