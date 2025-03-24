import { TestBed } from '@angular/core/testing'; // Angular's test utility
import { AppComponent } from './app.component';  // Component under test
import { provideRouter } from '@angular/router';  //  New import

import { FormsModule } from '@angular/forms'; // Needed for ngModel (search input)

describe('AppComponent', () => {

  // Setup the test module before each test runs
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,     // Register component
        FormsModule       // Required for ngModel
      ],
      providers: [
        provideRouter([])  //  Provide empty router config for routerLink
      ]
    }).compileComponents();
  });

  //  Test 1: Component creation
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Create instance
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();  // Passes if component exists
  });

  //  Test 2: Navbar buttons render
  it('should render navbar buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();  // Trigger component rendering

    const compiled = fixture.nativeElement as HTMLElement;

    // Find buttons using routerLink attributes
    const todosButton = compiled.querySelector('button[routerlink="/todos"]');
    const testButton = compiled.querySelector('button[routerlink="/algo"]');

    // Expect both buttons to exist in the DOM
    expect(todosButton).toBeTruthy();
    expect(testButton).toBeTruthy();
  });

  //  Test 3: Search input exists
  it('should render search input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();  // Trigger DOM rendering

    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[type="text"]');

    // Ensure input exists
    expect(input).toBeTruthy();

    // Check input's placeholder matches expected text
    expect(input?.getAttribute('placeholder')).toBe('Search Todos...');
  });
});
