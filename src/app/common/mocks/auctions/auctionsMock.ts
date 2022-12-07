export const auctionMocks = [
  {
    id: 1,
    isOpen: true,
    staringPrice: 100,
    localization: {
      id: 1,
      latitude: 45.5,
      longitude: -122.5,
    },
    name: 'Auction 1',
    description: 'A description of Auction 1',
    number: 1,
    dueDate: Date.now() + 86400, // one day from now
  },
  {
    id: 2,
    isOpen: false,
    staringPrice: 50,
    localization: {
      id: 2,
      latitude: 37.7,
      longitude: -122.3,
    },
    name: 'Auction 2',
    description: 'A description of Auction 2',
    number: 2,
    dueDate: Date.now() + 172800, // two days from now
  },
  {
    id: 3,
    isOpen: true,
    staringPrice: 25,
    localization: {
      id: 3,
      latitude: 40.7,
      longitude: -74.0,
    },
    name: 'Auction 3',
    description: 'A description of Auction 3',
    number: 3,
    dueDate: Date.now() + 259200, // three days from now
  },
]; //mocki walniete
