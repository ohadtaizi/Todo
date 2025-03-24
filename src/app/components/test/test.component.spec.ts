import { TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TestComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } },
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
