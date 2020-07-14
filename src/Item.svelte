<script>
  import {createEventDispatcher} from 'svelte';

  export let item = {};

  let dispatch = createEventDispatcher();

  const clearItem = () => {
    dispatch('clearitem', {item});
  }
</script>

<div data-testid="div-item" class="dropdown-selected-item" title="{item.label}"><span data-testid="item-value">{item.label || '...'}</span> <i data-testid="clean-item" on:click={clearItem}>&times;</i></div>

<style>
  .dropdown-selected-item {
    width: 33%;
    max-width: 80px;
    display: inline-block;
    margin: 5px;
    background-color: gray;
    color: white;
    position: relative;
    padding: 5px 10px 5px 5px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  .dropdown-selected-item > span {
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

  i {
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
