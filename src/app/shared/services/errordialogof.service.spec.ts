import { TestBed } from '@angular/core/testing';

import { ErrordialogofService } from './errordialogof.service';

describe('ErrordialogofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrordialogofService = TestBed.get(ErrordialogofService);
    expect(service).toBeTruthy();
  });
});
