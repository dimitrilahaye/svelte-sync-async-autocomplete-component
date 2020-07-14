import {action} from "@storybook/addon-actions/dist/index";
import {text, boolean, withKnobs} from '@storybook/addon-knobs/dist/index';
import TypeAhead from '../TypeAhead.svelte';
import Option from '../Option.svelte';
import Item from '../Item.svelte';
import {typeAhead} from './utils';

export default {
  title: 'Typeahead component',
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
  subcomponents: {Item, Option},
}

export const actionsData = {
  selectitem: action('selectitem'),
  reset: action('reset'),
  clearitem: action('clearitem'),
};

export const withObjectsList = () => ({
  Component: TypeAhead,
  props: {
    items: typeAhead.objectList.items,
    value: text('identifier for search', 'id'),
    placeholder: text('field placeholder','Type a user first name'),
    clearLabel: text('clear button content','Clear users list'),
    loadingText: text('loading text','Hurry go...'),
    noResultText: text('no result text','nope!'),
    searchData: typeAhead.objectList.searchData,
    optionFunction: typeAhead.objectList.optionFunction,
    config: {
      closeOnClickOutside: boolean('Close dropdown on click outside', true),
      closeOnSelect: boolean('Close dropdown on select an item', false),
      multiple: boolean('Multiple selections allowed', true),
      resetButton: boolean('Display the close button at the right of the field', true),
    }
  },
  on: {...actionsData}
});

export const withStringsList = () => ({
  Component: TypeAhead,
  props: {
    items: typeAhead.stringsList.items,
    placeholder: text('field placeholder','Type a country'),
    clearLabel: text('clear button content','Clear countries list'),
    loadingText: text('loading text','Hurry go...'),
    noResultText: text('no result text','nope!'),
    config: {
      closeOnClickOutside: boolean('Close dropdown on click outside', true),
      closeOnSelect: boolean('Close dropdown on select an item', false),
      multiple: boolean('Multiple selections allowed', true),
      resetButton: boolean('Display the close button at the right of the field', true),
    }
  },
  on: {...actionsData}
});

export const withAsyncList = () => ({
  Component: TypeAhead,
  props: {
    isAsync: boolean('Is Async list', true),
    value: text('identifier for search', 'alpha3Code'),
    optionInput: text('Object property to display','name'),
    placeholder: text('field placeholder','Type a country'),
    clearLabel: text('clear button content','Clear countries list'),
    loadingText: text('loading text','Hurry go...'),
    noResultText: text('no result text','nope!'),
    searchData: typeAhead.asyncList.searchData,
    config: {
      closeOnClickOutside: boolean('Close dropdown on click outside', true),
      closeOnSelect: boolean('Close dropdown on select an item', false),
      multiple: boolean('Multiple selections allowed', true),
      resetButton: boolean('Display the close button at the right of the field', true),
    }
  },
  on: {...actionsData}
});
