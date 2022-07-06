<script lang="ts">
  import { logView } from "./books";
  import { createEventDispatcher } from "svelte";

  export let title: string;
  export let genre: string;
  export let url: string;
  export let author: string;
  export let image: string;
  export let views: number;
  export let id: number;

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const dispatch = createEventDispatcher();

  const handleClick = (ev: MouseEvent) => {
    logView(id).then(() => {
      views += 1;
      dispatch("viewed", { id, views });
    });

    window.open(url, "_blank");
  };
</script>

<div class="book" on:click={handleClick} tabindex={1}>
  <div class="badge">Views: {views}</div>
  <h1>{title}</h1>
  <h3>{author}</h3>
  <p>{capitalize(genre)}</p>
  <img src={image} alt={title + "-image"} />
</div>

<style>
  .book {
    width: 20rem;
    border: 2px solid gray;
    border-radius: 0.5em;
    min-height: 10rem;
    padding: 0.5em;
    padding-bottom: 2em;
    color: white;
    text-decoration: none;
    position: relative;
  }

  .book:hover {
    cursor: pointer;
    border: 2px solid white;
    transition: border 0.2s ease-in-out;
  }

  .book h1 {
    font-size: 1.25rem;
    margin: 0;
    text-align: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .book img {
    width: 100%;
    height: 15em;
    object-fit: contain;
    margin-top: 1em;
    display: block;
  }

  .book .badge {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -50%);
    background-color: #ffc107;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .book h3 {
    color: gray;
    font-size: 0.9em;
    text-align: center;
    font-family: "Times New Roman", Times, serif;
  }

  .book h3::before {
    content: "by ";
    display: inline;
  }

  .book p {
    font-size: 0.9em;
    text-align: center;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  .book p::before {
    content: "Genre: ";
    display: inline;
  }
</style>
