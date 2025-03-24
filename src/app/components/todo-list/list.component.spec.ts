import { TestBed } from '@angular/core/testing'; // Angular's testing utility
import { TodoListComponent } from './todo-list.component'; // Component under test
import { ActivatedRoute } from '@angular/router'; // Needed to mock query params
import { of } from 'rxjs'; // Helps simulate Observable queryParams
import { provideHttpClient } from '@angular/common/http'; //  Replaces deprecated HttpClientTestingModule

describe('TodoListComponent', () => {
    let component: TodoListComponent; // Declare component instance to use in tests

    //  Fake Todo data (mimicking JSONPlaceholder format)
    const mockTodos = [
        { _id: '1', title: 'Buy groceries', description: 'Milk and bread', completed: false },
        { _id: '2', title: 'Do laundry', description: 'Wash clothes', completed: false },
        { _id: '3', title: 'Read book', description: 'Angular book', completed: true }
    ];

    beforeEach(async () => {
        //  Set up testing environment (TestBed)
        await TestBed.configureTestingModule({
            imports: [TodoListComponent],  // Register standalone component
            providers: [
                provideHttpClient(),  //  Required for HttpClient in component
                {
                    provide: ActivatedRoute,   //  Mock route queryParams for search
                    useValue: {
                        queryParams: of({ search: 'laundry' })  // Simulate URL: ?search=laundry
                    }
                }
            ]
        }).compileComponents();  // Compile component + template

        const fixture = TestBed.createComponent(TodoListComponent); // Create component
        component = fixture.componentInstance;

        //  Inject mock todos manually into component
        component.allTodos = mockTodos;

        //  Manually apply search filter with the term 'laundry'
        component.applySearchFilter('laundry');
    });

    //  Test: Check that search filter works correctly
    it('should filter todos by search term', () => {
        expect(component.todos.length).toBe(1); // Only one todo should match 'laundry'
        expect(component.todos[0].title).toBe('Do laundry'); // Confirm the matching todo
    });

    //  New Test: Filter then clear search
    it('should reset todos after clearing search term', () => {
        // Step 1: Filter with 'groceries'
        component.applySearchFilter('groceries');
        expect(component.todos.length).toBe(1);
        expect(component.todos[0].title).toBe('Buy groceries');

        // Step 2: Clear the search term
        component.applySearchFilter('');
        expect(component.todos.length).toBe(3); // All todos restored
    });
});
