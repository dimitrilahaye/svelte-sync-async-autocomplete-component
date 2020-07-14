import {fireEvent} from '@testing-library/svelte';
import {renderComponent} from './utils.js';
import Option from '../Option.svelte';

describe('Option component test cases', () => {
  test("should render component correctly w/o props", async () => {
    const {queryByTestId} = renderComponent(Option);
    const selectItem = queryByTestId(/select-item/i);
    expect(selectItem).toBeDefined();
    expect(selectItem.textContent).toBe('...');
    expect(selectItem.dataset.value).toBe('...');
    await fireEvent.click(selectItem);
  });
  test("should render component correctly", async () => {
    const {queryByTestId} = renderComponent(Option, {
      value: 'value',
      option: 'option',
    });
    const selectItem = queryByTestId(/select-item/i);
    expect(selectItem).toBeDefined();
    expect(selectItem.textContent).toBe('option');
    expect(selectItem.dataset.value).toBe('value');
    await fireEvent.click(selectItem);
  });
});
