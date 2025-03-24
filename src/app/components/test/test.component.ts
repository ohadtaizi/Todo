import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; // ✅ This line fixes it


import { removeDuplicates, findLongestWord } from '../../algorithm/string-utils';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule],

  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  todos: any[] = [];            // Fetched todos from MongoDB
  uniqueTitles: string[] = [];  // Holds result from removeDuplicates
  longestWord: string = '';     // Result from findLongestWord


  constructor(private http: HttpClient) {
    this.loadTodos();
  }
  
  loadTodos() {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:5000/api/todos',{ headers: { Authorization: `Bearer ${token}` }})
      .subscribe({
        next: todos => this.todos = todos,
        error: err => console.error('Failed to fetch todos:', err)
      });
  }
    // Combine all titles into a single string for display
    get allTitles(): string {
      return this.todos?.length ? this.todos.map(t => t.title).join(', ') : 'No Titles';
    }
    // Combine all descriptions into a single string for display

    get allDescriptions(): string {
      return this.todos?.length ? this.todos.map(t => t.description).join(' ') : 'No Descriptions';
    }

  // Remove duplicate titles
  onRemoveDuplicates() {
    const titles = this.todos.map(todo => todo.title);
    this.uniqueTitles = removeDuplicates(titles);
    console.log('Unique Titles:', this.uniqueTitles);
  }
  // Find the longest word across all descriptions
  onFindLongestWord() {
    const descriptions = this.allDescriptions;
    this.longestWord = findLongestWord(descriptions);
    console.log('Longest Word:', this.longestWord);
  }
}
