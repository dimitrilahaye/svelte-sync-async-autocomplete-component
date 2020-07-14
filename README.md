# Svelte typeahead / auto-completion component for sync and async data

## install it

```bash
npm i --save @dimitrilahaye/svelte-typeahead
```

## Use it

```svelte
<scrip>
    import TypeAhead from '@dimitrilahaye/svelte-typeahead';
    
    //...
</script>
```

## Table of contents
  - [Examples](#examples)
    * [Example with an array of objects](#example-with-an-array-of-objects)
    * [Example with an array of strings](#example-with-an-array-of-strings)
    * [Example with fetched data from an API](#example-with-fetched-data-from-an-api)
  - [Documentation](#documentation)
    * [Props](#props)
    * [TypeAhead configuration](#typeahead-configuration)
    * [Events](#events)
  * [Unit test](#unit-test)
  * [Storybook](#storybook)
  
## Examples
  
### Example with an array of objects
  ```html
<script>  
  import TypeAhead from './TypeAhead.svelte';  
  
  const users = [  
    {  
		"id": 1,  
		"first_name": "Sigismund",  
		"last_name": "Pople",  
		"email": "spople0@reverbnation.com",  
		"gender": "Male",  
	},
	...
  ];  
 const props = {  
	items: users,  
	value: 'id',  
	searchData: (user, str) => user.first_name.includes(str),  
	optionFunction: (o) => `${o.first_name} ${o.last_name}`,  
  };  
 let selectedUsers = [];
</script>   
<TypeAhead {...props}  
	  on:selectitem="{(e) => selectedUsers = [...e.detail.items]}"  
	  on:reset="{() => selectedUsers = []}"  
	  on:clearitem="{(e) => selectedUsers = selectedUsers.filter((u) => u.id !== e.detail.item.id)}"
	  />  
  {#each selectedUsers as user (user.id)}  
	  <p>{user.first_name} {user.last_name}</p>  
  {/each}
 ```  
### Example with an array of strings
  ```html  
<script>
  import TypeAhead from './TypeAhead.svelte';   
const countries = [  
	'Russia',  
	'Colombia',  
	'Sweden',  
	'China',
	...
];  
const props = {  
  items: countries,  
};  
let selectedCountriesSync = [];
</script>  
<TypeAhead {...props}  
	on:selectitem="{(e) => selectedCountriesSync = [...e.detail.items]}"  
	on:reset="{() => selectedCountriesSync = []}"  
	on:clearitem="{(e) => selectedCountriesSync = selectedCountriesSync.filter((c) => c !== e.detail.item)}"
	/>  
  {#each selectedCountriesSync as country}  
	  <p>{country}</p>  
  {/each}
```

### Example with fetched data from an API
  ```html  
  <script>  
  import TypeAhead from './TypeAhead.svelte';
  const asyncProps = {  
	  isAsync: true,  
	  value: 'alpha3Code',  
	  placeholder: 'Type a country',  
	  clearLabel: 'Clear countries list',  
	  loadingText: 'Hurry go...',  
      noResultText: 'nope!',
	  optionInput: 'name',  
	  searchData: async (str) => {  
		const response = await fetch(`https://restcountries.eu/rest/v2/name/${str}`);  
		const countries = await response.json();  
		let selected;  
		if (response.ok) {  
			selected = countries.map((c) => {  
				return {  
					name: c.name,  
					alpha3Code: c.alpha3Code  
				};  
			});  
		} else {  
			selected = [];  
		}  
		return selected;  
	}
};  
const config = {  
	closeOnSelect: true,  
	resetButton: false,  
	multiple: false,  
};  
let selection = [];
</script>
<TypeAhead {...asyncProps} {config} bind:selection/>  
  {#each selection as country (country.alpha3Code)}  
	  <p>{country.name}</p>  
  {/each}
  ```

> Above, `bind:selection` is a shortcut which will reflect all the changes on the selected items.
> By this way, no need to use ***`TypeAhead`*** events.

## Documentation
  
### Props  
| name | description |  
|----------|-------------|
 | ***isAsync*** *(boolean)* | determine if ***`TypeAhead`*** will be asynchronous. Default is `false`|  
 | ***items*** *(array)* | default itemsof the select field. Default is `[]` | 
 | ***searchData*** *(Function)* | callback used for the items search. It requires 2 arguments for sync search (the item during iteration and the substring entered into the search field), and 1 argument for the async search (the substring entered into the search field). If `undefined`, default callback will be used: `(item, v) => item.toLowerCase().includes(v.toLowerCase())`. | 
 | ***value*** *(string)* | uniq identifier key for each item. If `undefined`, item itself will be used as uniq identifier. |  
| ***optionFunction*** *(Function)* | function returning a string, used to display the text of each item. If `undefined`, *`optionInput`* will be used. |
| ***optionInput*** *(string)* | item key used to be displayed as text. If `undefined`, item itself will be displayed. |  
| ***placeholder*** *(string)* | placeholder of the select field. Default is '`Search`' |  
| ***clearLabel*** *(string)* | text of the button to reset the select field. Default is '`Clear selection`' |  
| ***loadingText*** *(string)* | text displayed during the loading of async data. Default is '`Loading...`' |  
| ***noResultText*** *(string)* | text displayed when no data has been found. Default is '`No result...`' |
 | ***config*** *(see **TypeAhead configuration**)* | configuration of ***`TypeAhead`*** |      
| ***selection*** *(Array)* | bind this prop in your parent component to track all the changes on the selected items. By this way, no need to use ***`TypeAhead`*** events. |      
        
 ### TypeAhead configuration
  | config field | description |  
|-------------|----------------| 
| `closeOnClickOutside` | Close the dropdown panel when you click outside the select field. *Default is '`true`'.* |  
| `closeOnSelect` | Close the dropdown panel when you select an item. *Default is '`false`'.* |
| `resetButton` | Display the reset button at the right of the select field. *Default is '`true`'.* |     
| `multiple` | Allow multiple items selection. *Default is '`true`'.* |

>
> If *`multiple`* is setted at `true`, *`closeOnSelect`* is always considered as `false`.
>
     
 ### Events    
 | name | description |  
|-------------|----------------|  
| ***selectitem*** `=> event.detail.items` *(Array)* | event triggered when you select an item.    
| ***clearitem*** `=> event.detail.item` *(Object)* | event triggered when you clear one of the selected items.    
| ***reset*** | event triggered when you reset the select field.

## Unit test

```bash
npm test
# then coverage report in ./ut-coverage
```

## Storybook

```bash
npm run storybook
# then visit http://localhost:6006/
```
