import { TestBed, inject } from '@angular/core/testing';

import { CartobservableService } from './cartobservable.service';

describe('CartobservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartobservableService]
    });
  });

  it('should be created', inject([CartobservableService], (service: CartobservableService) => {
    expect(service).toBeTruthy();
  }));
});
