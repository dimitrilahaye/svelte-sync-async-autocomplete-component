const typeAhead = {};
typeAhead.objectList = {};
typeAhead.objectList.items = [
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
typeAhead.objectList.searchData = (user, str) => user.first_name.toLowerCase().includes(str.toLowerCase());
typeAhead.objectList.optionFunction = (o) => `${o.first_name} ${o.last_name}`;

typeAhead.stringsList = {};
typeAhead.stringsList.items = [
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

typeAhead.asyncList = {};
typeAhead.asyncList.searchData = async (str) => {
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
};

export {typeAhead};
