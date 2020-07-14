<script>
  import {createEventDispatcher} from 'svelte';
  import Item from './Item.svelte';
  import Option from './Option.svelte';

  export let value = undefined;
  export let searchData = (item, v) => item.toLowerCase().includes(v.toLowerCase());
  export let items = [];
  export let isAsync = false;
  export let optionFunction = undefined;
  export let optionInput = undefined;
  export let placeholder = 'Search';
  export let clearLabel = 'Clear selection';
  export let loadingText = 'Loading...';
  export let noResultText = 'No result...';
  export let config = {
    closeOnClickOutside: true,
    closeOnSelect: false,
    multiple: true,
    resetButton: true,
  };
  export let selection = [];

  let input;
  let showSelect;
  let isLoading;
  let selectedValues = [];
  let selectedItems = [];
  let internalItems = [];

  let dispatch = createEventDispatcher();

  const selectItem = (e) => {
    const selectedValue = e.detail.value.toString().toLowerCase();
    if (selectedValues.indexOf(selectedValue) > -1) {
      selectedValues = selectedValues.filter((v) => v !== selectedValue);
    } else {
      selectedValues = config.multiple ? [...selectedValues, selectedValue] : [selectedValue];
    }
    const objects = internalItems.filter((obj) => selectedValues.indexOf(getItemValue(obj).toString().toLowerCase()) > -1);
    selection = [...objects];
    selectedItems = objects.map((obj) => {
      return {
        label: optionFunction ? optionFunction(obj) : getItemInput(obj),
        value: getItemValue(obj).toString().toLowerCase()
      };
    });
    dispatch('selectitem', {items: objects});
    if (config.closeOnSelect && !config.multiple) {
      showSelect = false;
    }
  };

  const clearItem = (e) => {
    e.preventDefault();
    const {item} = e.detail;
    const object = internalItems.find((obj) => item.value.toString().toLowerCase() === getItemValue(obj).toString().toLowerCase());
    dispatch('clearitem', {item: object});
    selectedValues = selectedValues.filter((v) => v !== item.value);
    selectedItems = selectedItems.filter((v) => v.value !== item.value);
    selection = selection.filter((v) => {
      return getItemValue(v).toString().toLowerCase() !== item.value.toString().toLowerCase();
    });
    if (!selectedItems.length) {
      resetSelections();
    }
  };

  const searchCriteria = (e) => {
    const str = e.target.value;
    if (str.length) {
      showSelect = true;
      internalItems = items.filter((item) => searchData(item, str));
    } else {
      internalItems = [];
      showSelect = false;
    }
  };

  const searchCriteriaAsync = async (e) => {
    const str = e.target.value;
    if (str.length) {
      isLoading = true;
      showSelect = true;
      internalItems = await searchData(str);
      isLoading = false;
    } else {
      internalItems = [];
      showSelect = false;
    }
  };

  const closeOnClickOutside = (e) => {
    if (config.closeOnClickOutside && !e.target.matches('.select-field, .input-container, .input-container > div, .dropdown-content, .dropdown-item')) {
      showSelect = false;
    }
  };

  const displayItems = () => {
    if (internalItems.length) {
      showSelect = !showSelect;
    }
  };

  const reset = () => {
    resetSelections();
    dispatch('reset');
  };

  const resetSelections = () => {
    internalItems = selectedValues = selectedItems = selection = [];
    showSelect = false;
    input.value = '';
  };

  const getItemValue = (item) => value ? item[value] : item;

  const getItemInput = (item) => optionInput ? item[optionInput] : item;

</script>

<svelte:window on:click="{closeOnClickOutside}"/>

<div class="dropdown" selection={selection}>
  <div
      data-testid="input-container"
      class="input-container"
      on:click={displayItems}
  >
    <div>
        {#each selectedItems as item (item.value)}
          <Item {item} on:clearitem={clearItem}/>
        {/each}
    </div>
    <input
        data-testid="search-field"
        type="text"
        class="select-field"
        on:input="{isAsync ? searchCriteriaAsync : searchCriteria}"
        bind:this={input}
        {placeholder}
    />
      {#if config.resetButton}
        <i data-testid="reset-button" on:click={reset}>&times;</i>
      {/if}
  </div>
    {#if showSelect}
      <div
          data-testid="dropdown-content"
          class="dropdown-content"
      >
          {#if isLoading}
            <span class="dropdown-item">{loadingText}</span>
          {:else}
              {#if selectedValues.length}
                <span class="dropdown-item" on:click={reset}><strong>{clearLabel}</strong></span>
              {/if}
              {#each internalItems as obj (getItemValue(obj))}
                <Option
                    option={optionFunction ? optionFunction(obj) : getItemInput(obj)}
                    value={getItemValue(obj)}
                    selected="{selectedValues.indexOf(getItemValue(obj).toString().toLowerCase()) > -1}"
                    on:selectitem={selectItem}
                ></Option>
              {:else}
                  {#if showSelect}
                    <span data-testid="no-result" class="dropdown-item no-result"><em>{noResultText}</em></span>
                  {/if}
              {/each}
          {/if}
      </div>
    {/if}
</div>


<style>

  .dropdown {
    position: relative;
    display: block;
    margin: 10px;
  }

  .input-container {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 5px;
    max-width: 100%;
    cursor: pointer;
  }

  i {
    position: absolute;
    bottom: 20%;
    right: 5px;
    width: auto;
    height: 24px;
    cursor: pointer;
  }

  .select-field {
    outline: none;
    height: 20px;
    border: none;
    padding: 16px;
    font-size: 16px;
    margin: 0;
    display: block;
    width: 100%;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    background-color: #f1f1f1;
    width: 100%;
    overflow: auto;
    max-height: 300px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    background-color: #ddd;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  .dropdown-item.no-result {
    cursor: default;
  }
</style>
