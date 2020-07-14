<script>
  import {createEventDispatcher} from 'svelte';

  export let value = '...';
  export let option = '...';
  export let selected = false;

  let dispatch = createEventDispatcher();

  const selectItem = () => {
    dispatch('selectitem', {value: value});
  }
</script>
<span
    data-testid="select-item"
    class="dropdown-item"
    data-value={value}
    class:selected="{selected}"
    on:click={selectItem}
>{option}</span>

<style>

  .dropdown-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    background-color: #ddd;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  .dropdown-item.selected {
    background-color: #fff;
  }
</style>
