
// Function to remove duplicate strings from an array
export function removeDuplicates(arr: string[]): string[] {
    // Convert array to a Set (which stores only unique values), then spread it back to an array
    return [...new Set(arr)];
    // Example: ["apple", "banana", "apple"] → ["apple", "banana"]
}

// Function to find and return the longest word in a given string
export function findLongestWord(text: string): string {
    if (!text) return '';  // If input is empty/null/undefined, return empty string

    // Split the text into words using whitespace as separator (handles spaces, tabs, etc.)
    // Reduce through the array of words to find the longest one
    return text.split(/\s+/).reduce((longest, word) =>
      word.length > longest.length ? word : longest, ''); 
    // Example: "I love programming" → "programming"
}