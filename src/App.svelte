<script lang="ts">
  import { onMount } from "svelte";

  import Book from "./lib/Book.svelte";
  import { Book as BookType, getBooks } from "./lib/books";

  let books: BookType[] = [];
  getBooks().then((res) => {
    books = res;
  });

  onMount(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Enter") {
        (ev.target as any)?.click();
      }
    };
    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  });

  const onViewed = ({
    detail: { id, views },
  }: CustomEvent<{ id: number; views: number }>) => {
    const bookIdx = books.findIndex((b) => b.id === id);
    if (bookIdx !== -1) {
      books[bookIdx].views = views;
    }
  };
</script>

<div class="book-container">
  {#each books as book (book.id)}
    <Book {...book} on:viewed={onViewed} />
  {/each}
</div>

<style>
  .book-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin: 1rem;
    justify-content: center;
  }

  :global(body) {
    background-color: #1e1e1e;
    color: white;
  }
</style>
