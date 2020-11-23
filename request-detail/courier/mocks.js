export const mockedCart = [
  {
    product: {id: 1, name: 'Gelatina', category: 'Postres'},
    quantity: 2,
    unit: {id: 1, name: 'Uni.'},
    description: null,
    photo:
      'https://static.vix.com/es/sites/default/files/imj/elgranchef/g/gelatina-con-tutti-frutti.jpg',
  },
  {
    product: {id: 2, name: 'Salchichas', category: 'Carnes frías'},
    quantity: 2,
    unit: {id: 1, name: 'Uni.'},
    description: null,
    photo: null,
    old: null,
  },
  {
    product: {id: 3, name: 'Arepas', category: 'Arina'},
    quantity: 2,
    unit: {id: 1, name: 'Uni.'},
    description: null,
    photo: null,
    old: null,
  },
  {
    product: {id: 3, name: 'Arepas', category: 'Arina'},
    quantity: 2,
    unit: {id: 1, name: 'Uni.'},
    description: null,
    photo: null,
    old: null,
  },
  {
    product: {id: 3, name: 'Arepas', category: 'Arina'},
    quantity: 2,
    unit: {id: 1, name: 'Uni.'},
    description: null,
    photo: null,
    old: null,
  },
];

export const mockedForm = {
  address: {
    id: 1,
    title: 'Mi casa',
    address: 'Cra. 84 #37-61',
    description: null,
    type: {
      id: 3,
      name: 'Apartamento',
      icon:
        'https://api-staging.triko.co/storage/applications/build_type/icons/09631f40-f3df-11ea-8051-8168a122cb84.png',
      __typename: 'buildingtype',
    },
    isMain: 1,
    lat: '6.2454804103064',
    lng: '-75.606269985437',
    __typename: 'clientaddress',
  },
  needs: [1],
  place: 1,
  bagSize: 'Pequeña',
  market: {
    categories: [1, 2, 6, 7],
    primary: 'Exito',
    secondary: 'Envigado',
    address: '#############',
    location: {lat: 6.1592585, lng: -75.6063153},
  },
};
