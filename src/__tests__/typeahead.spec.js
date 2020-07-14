import {fireEvent} from '@testing-library/svelte';
import {renderComponent} from './utils.js';
import TypeAhead from '../TypeAhead.svelte';

function getStringsListProps() {
  const countries = [
    'Russia',
    'Colombia',
    'Sweden',
    'China',
    'Indonesia',
    'Philippines',
    'Germany',
    'France',
    'Peru',
    'Croatia',
  ];
  return {
    items: countries,
    optionFunction: (item) => `country: ${item}`,
    noResultText: 'nope!',
    config: {
      multiple: false,
      closeOnSelect: true
    }
  };
}

function getObjectsListProps() {
  const users = [
    {
      "id": 1,
      "first_name": "Sigismund",
      "last_name": "Pople",
      "email": "spople0@reverbnation.com",
      "gender": "Male",
    }, {
      "id": 2,
      "first_name": "Georgiana",
      "last_name": "Lickess",
      "email": "glickess1@clickbank.net",
      "gender": "Female",
    }, {
      "id": 3,
      "first_name": "Arnold",
      "last_name": "Petrakov",
      "email": "apetrakov2@nbcnews.com",
      "gender": "Male",
    }, {
      "id": 4,
      "first_name": "Phylis",
      "last_name": "Farrent",
      "email": "pfarrent3@cafepress.com",
      "gender": "Female",
    }, {
      "id": 5,
      "first_name": "Feliks",
      "last_name": "McKinlay",
      "email": "fmckinlay4@go.com",
      "gender": "Male",
    }, {
      "id": 6,
      "first_name": "Duffy",
      "last_name": "Brookwell",
      "email": "dbrookwell5@tripod.com",
      "gender": "Male",
    }, {
      "id": 7,
      "first_name": "Jeanine",
      "last_name": "Ansett",
      "email": "jansett6@oracle.com",
      "gender": "Female",
    }, {
      "id": 8,
      "first_name": "Kristofor",
      "last_name": "Canceller",
      "email": "kcanceller7@yahoo.co.jp",
      "gender": "Male",
    }, {
      "id": 9,
      "first_name": "Emmanuel",
      "last_name": "Dowey",
      "email": "edowey8@unicef.org",
      "gender": "Male",
    }, {
      "id": 10,
      "first_name": "Rica",
      "last_name": "Brassington",
      "email": "rbrassington9@tuttocitta.it",
      "gender": "Female",
    }
  ];
  return {
    items: users,
    value: 'id',
    searchData: (user, str) => user.first_name.toLowerCase().includes(str.toLowerCase()),
    optionFunction: (o) => `${o.first_name} ${o.last_name}`,
  };
}

function getAsyncProps() {
  return {
    isAsync: true,
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
    },
    value: 'alpha3Code',
    placeholder: 'Type a country',
    clearLabel: 'Clear countries list',
    loadingText: 'Hurry go...',
    config: {
      closeOnClickOutside: false,
      resetButton: false,
    },
  };
}

const typeIntoSearchField = async (value, queryByTestId) => {
  const searchField = queryByTestId(/search-field/i);
  await fireEvent.input(searchField, {target: {value}});
  const ddContent = queryByTestId(/dropdown-content/i);
  const items = !!ddContent ? ddContent.getElementsByClassName('dropdown-item') : undefined;
  return {ddContent, items};
};

describe('TypeAhead component - list of objects test cases', () => {
  let typeAhead;
  beforeEach(() => {
    typeAhead = renderComponent(TypeAhead, getObjectsListProps());
  });
  it('Should be able to select items in the list', async () => {
    // render component
    const {queryByTestId, component, container} = typeAhead;
    expect(component).toBeTruthy();
    // type into search field
    let {ddContent, items} = await typeIntoSearchField('a', queryByTestId);
    const searchField = queryByTestId(/search-field/i);
    expect(searchField.placeholder).toBe('Search');
    expect(ddContent).toBeTruthy();
    expect(items.length).toBe(5);
    // test filtering result
    const shouldContainItems = [
      'Georgiana Lickess',
      'Arnold Petrakov',
      'Jeanine Ansett',
      'Emmanuel Dowey',
      'Rica Brassington',
    ];
    for (let i = 0; i < items.length; i++) {
      expect(items[i].textContent).toContain(shouldContainItems[i]);
    }
    // click on the first one
    await fireEvent.click(items[0]);
    items = ddContent.getElementsByClassName('dropdown-item');
    expect(items[0].textContent).toBe('Clear selection');
    expect(items.length).toBe(6);
    expect(items[1].classList.contains('selected')).toBeTruthy();
    // get selected items list into search field
    let selectedItems = container.getElementsByClassName('dropdown-selected-item');
    expect(selectedItems.length).toBe(1);
    // click into the field
    const searchFieldContainer = queryByTestId(/input-container/i);
    await fireEvent.click(searchFieldContainer);
    ddContent = queryByTestId(/dropdown-content/i);
    expect(ddContent).toBeFalsy();
    // remove selected item
    const cleanButton = queryByTestId(/clean-item/i);
    await fireEvent.click(cleanButton);
    selectedItems = container.getElementsByClassName('dropdown-selected-item');
    expect(selectedItems.length).toBe(0);
    // type nothing in the search field
    let elements = await typeIntoSearchField('', queryByTestId);
    expect(elements.ddContent).toBeFalsy();
    expect(elements.items).toBeFalsy();
  });
  it('Should be able to remove all the items in the list', async () => {
    // render component
    const {getByTestId, queryByTestId, component, container} = typeAhead;
    expect(component).toBeTruthy();
    let {items} = await typeIntoSearchField('a', queryByTestId);
    await fireEvent.click(items[0]);
    const resetButton = getByTestId('reset-button');
    await fireEvent.click(resetButton);
    const ddContent = queryByTestId(/dropdown-content/i);
    expect(ddContent).toBeFalsy();
    const selectedItems = container.getElementsByClassName('dropdown-selected-item');
    expect(selectedItems.length).toBe(0);
  });
});

describe('TypeAhead component - list of strings test cases', () => {
  let typeAhead;
  beforeEach(() => {
    typeAhead = renderComponent(TypeAhead, getStringsListProps());
  });
  it('Should be able to select items in the list', async () => {
    // render component
    const {queryByTestId, component} = typeAhead;
    expect(component).toBeTruthy();
    // type into search field
    let {ddContent, items} = await typeIntoSearchField('ru', queryByTestId);
    expect(ddContent).toBeTruthy();
    expect(items.length).toBe(2);
    // test filtering result
    const shouldContainItems = [
      'Russia',
      'Peru',
    ];
    for (let i = 0; i < items.length; i++) {
      expect(items[i].textContent).toContain(`country: ${shouldContainItems[i]}`);
    }
    // expect(items[0].textContent).toContain('country: ');
    // click on the first one
    await fireEvent.click(items[0]);
    ddContent = queryByTestId(/dropdown-content/i);
    expect(ddContent).toBeFalsy();
    // no result text
    await typeIntoSearchField('aaa', queryByTestId);
    const noResult = queryByTestId(/no-result/i);
    expect(noResult).toBeTruthy();
    expect(noResult.textContent).toBe('nope!');
  });
});

describe('TypeAhead component - list of async data test cases', () => {
  let typeAhead, spy;
  beforeEach(() => {
    typeAhead = renderComponent(TypeAhead, getAsyncProps());
    // mock fetch data for the test on async search field
    const mockSuccessResponse = [
      {
        "name": "Afghanistan",
        "alpha3Code": "AFG",
      }, {
        "name": "Central African Republic",
        "alpha3Code": "CAF",
      }, {
        "name": "South Africa",
        "alpha3Code": "ZAF",
      }];
    spy = typeAhead.component['searchData'] = jest.fn(() => mockSuccessResponse);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should be able to select items in the list', async () => {
    // render component
    const {queryByTestId, component, container} = typeAhead;
    expect(component).toBeTruthy();
    // type into search field
    let {ddContent, items} = await typeIntoSearchField('a', queryByTestId);
    expect(spy).toHaveBeenCalled();
    expect(ddContent).toBeTruthy();
    expect(items.length).toBe(3);
    // select then deselect one
    await fireEvent.click(items[0]);
    let selectedItems = container.getElementsByClassName('dropdown-selected-item');
    expect(selectedItems.length).toBe(1);
    await fireEvent.click(items[1]);
    selectedItems = container.getElementsByClassName('dropdown-selected-item');
    expect(selectedItems.length).toBe(0);
    // type nothing in the search field
    let elements = await typeIntoSearchField('', queryByTestId);
    expect(elements.ddContent).toBeFalsy();
    expect(elements.items).toBeFalsy();
  });
});
