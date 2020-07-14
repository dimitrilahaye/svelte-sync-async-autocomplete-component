import {action} from "@storybook/addon-actions/dist/index";
import { withKnobs, text, boolean } from '@storybook/addon-knobs/dist/index';
import Counter from '../Option.svelte';

export default {
  title: 'Option component',
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
}

export const actionsData = {
  selectitem: action('selectitem'),
};

export const nonSelectedOption = () => ({
  Component: Counter,
  props: {
    selected: boolean('selected', false),
    option: text('option', 'Catherine is sad'),
    value: text('value', 'Catherine'),
  },
  on: {...actionsData}
});


export const selectedOption = () => ({
  Component: Counter,
  props: {
    selected: boolean('selected', true),
    option: text('option', 'Catherine is happy'),
    value: text('value', 'Catherine'),
  },
  on: {...actionsData}
});
