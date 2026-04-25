export const mockParkingSlots = [
  {
    id: 'slot-1',
    name: 'T Nagar Shopping Complex Charging Station',
    address: 'Usman Road, T Nagar, Chennai',
    price: 8.0,
    distance: 0.3,
    isAvailable: true,
    ownerRating: 5.0,
    ownerId: 'u1',
    type: 'covered',
    totalSlots: 10,
    availableSlots: 7,
    availability: {
      type: '24/7',
      label: '24/7'
    },
    coordinates: {
      lat: 13.0409,
      lng: 80.2337
    },
    connectorTypes: ['Type 2', 'CCS'],
    powerLevel: 22,
    chargingType: 'AC'
  },
  {
    id: 'slot-2',
    name: 'Anna Nagar Tower Charging Station',
    address: '2nd Avenue, Anna Nagar, Chennai',
    price: 12.0,
    distance: 0.8,
    isAvailable: true,
    ownerRating: 5.0,
    ownerId: 'u1',
    type: 'open',
    totalSlots: 15,
    availableSlots: 12,
    availability: {
      type: 'custom',
      from: { hour: 6, minute: 0, period: 'AM' },
      to: { hour: 10, minute: 0, period: 'PM' },
      display: '6 AM – 10 PM',
      startTime: '06:00',
      endTime: '22:00'
    },
    coordinates: {
      lat: 13.0869,
      lng: 80.2107
    },
    connectorTypes: ['Type 2'],
    powerLevel: 7,
    chargingType: 'AC'
  },
  {
    id: 'slot-3',
    name: 'Chennai Citi Center Fast Charging',
    address: 'Rajaji Salai, Chennai',
    price: 15.0,
    distance: 1.2,
    isAvailable: false,
    ownerRating: 5.0,
    ownerId: 'u1',
    type: 'covered',
    totalSlots: 8,
    availableSlots: 3,
    availability: {
      type: '24/7',
      label: '24/7'
    },
    coordinates: {
      lat: 13.0827,
      lng: 80.2707
    },
    connectorTypes: ['CCS', 'CHAdeMO'],
    powerLevel: 50,
    chargingType: 'DC'
  },
  {
    id: 'slot-4',
    name: 'Besant Nagar Beach Charging Station',
    address: 'Elliot Beach Road, Besant Nagar, Chennai',
    price: 6.0,
    distance: 2.1,
    isAvailable: true,
    ownerRating: 5.0,
    ownerId: 'u1',
    type: 'open',
    totalSlots: 20,
    availableSlots: 18,
    availability: {
      type: 'custom',
      from: { hour: 8, minute: 30, period: 'AM' },
      to: { hour: 9, minute: 15, period: 'PM' },
      display: '8:30 AM – 9:15 PM',
      startTime: '08:30',
      endTime: '21:15'
    },
    coordinates: {
      lat: 12.9976,
      lng: 80.2589
    },
    connectorTypes: ['Type 2'],
    powerLevel: 11,
    chargingType: 'AC'
  },
  {
    id: 'slot-5',
    name: 'Velachery Phoenix Mall Supercharger',
    address: '100 Feet Road, Velachery, Chennai',
    price: 20.0,
    distance: 3.5,
    isAvailable: false,
    ownerRating: 5.0,
    ownerId: 'u1',
    type: 'covered',
    totalSlots: 5,
    availableSlots: 2,
    availability: {
      type: 'custom',
      from: { hour: 10, minute: 15, period: 'AM' },
      to: { hour: 6, minute: 45, period: 'PM' },
      display: '10:15 AM – 6:45 PM',
      startTime: '10:15',
      endTime: '18:45'
    },
    coordinates: {
      lat: 12.9815,
      lng: 80.2186
    },
    connectorTypes: ['CCS', 'Tesla'],
    powerLevel: 150,
    chargingType: 'DC'
  },
]

export const mockNotifications = [
  {
    id: 'n1',
    message: 'Welcome to ChargeEasy !!',
    type: 'info',
    timestamp: new Date().toISOString(),
  },
]
