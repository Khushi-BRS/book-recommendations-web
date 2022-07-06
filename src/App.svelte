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
</script>

<div class="book-container">
  {#each books as book (book.id)}
    <Book {...book} />
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
