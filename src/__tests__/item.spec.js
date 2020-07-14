import {fireEvent} from '@testing-library/svelte';
import {renderComponent} from './utils.js';
import Item from '../Item.svelte';

describe('Item component test cases', () => {
  test("should render component correctly w/o props", async () => {
    const {getByTestId, queryByTestId} = renderComponent(Item);
    const value = getByTestId('item-value');
    expect(value.textContent).toBe('...');
    const cleanButton = queryByTestId(/clean-item/i);
    expect(cleanButton).toBeDefined();
    expect(cleanButton.innerHTML).toBe('×');
    await fireEvent.click(cleanButton);
  });
  test("should render component correctly", async () => {
    const {getByTestId, queryByTestId} = renderComponent(Item, {
      item: {
        label: 'Test label'
      }
    });
    const div = getByTestId('div-item');
    const value = getByTestId('item-value');
    expect(value.textContent).toBe('Test label');
    const cleanButton = queryByTestId(/clean-item/i);
    expect(cleanButton).toBeDefined();
    expect(cleanButton.innerHTML).toBe('×');
    expect(div.title).toBe('Test label');
    await fireEvent.click(cleanButton);
  });
});
