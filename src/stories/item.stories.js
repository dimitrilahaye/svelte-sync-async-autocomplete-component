import {action} from "@storybook/addon-actions/dist/index";
import {text, withKnobs} from '@storybook/addon-knobs/dist/index';
import Item from '../Item.svelte';

export default {
  title: 'Item component',
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
}

export const actionsData = {
  clearitem: action('clearitem'),
};

export const selectedItem = () => ({
  Component: Item,
  props: {
    item: {
      label: text('label', 'Catherine has been chosen'),
      value: text('value', 'Catherine'),
    }
  },
  on: {...actionsData}
});
