import {BUCKET_BASE_URL} from 'react-native-dotenv';
export default {
  onMyWay: {
    triko: {
      id: 3,
      fullName: 'Mariana Gomez',
      photo: `${BUCKET_BASE_URL}/avatars/trikos/triko_3.jpg`,
      rating: 4,
      badges: [
        {
          icon: `${BUCKET_BASE_URL}/badges/badge_2.png`,
          name: 'Badge3',
        },
        {
          icon: `${BUCKET_BASE_URL}/badges/badge_3.png`,
          name: 'Badge3',
        },
        {
          icon: `${BUCKET_BASE_URL}/badges/badge_4.png`,
          name: 'Badge4',
        },
      ],
      geo: {
        lat: 6.15896,
        lng: -75.6233956,
      },
    },
    request: {
      address: {name: 'My house', address: 'Calle 55ASur #38-138'},
      isUrgent: false,
      date: 'today',
      time: '00:00:00',
      isDateFlexible: false,
      duration: 2,
      subtotal: 2000,
      executionTime: 7200,
      finishedAt: '00-00-0000 00:00:00',
      startedAt: '00-00-0000 00:00:00',
      services: [
        {
          id: 1,
          name: 'Cleaning and Domestic Service',
          icon: 'http://localhost/triko-bucket/icons/services/image_2.png',
          description: '',
          price: 1000,
        },
        {
          id: 2,
          name: 'Washed and Ironede',
          icon: 'http://localhost/triko-bucket/icons/services/image_2.png',
          description: '',
          price: 1000,
        },
      ],
    },
  },
};
