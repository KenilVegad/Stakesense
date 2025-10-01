import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { db } from './firebase';

export const sentimentData = [
  {
    location: "Bengaluru, Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    positive: 124,
    neutral: 45,
    negative: 31
  },
  {
    location: "Mumbai, Maharashtra",
    latitude: 19.0760,
    longitude: 72.8777,
    positive: 89,
    neutral: 67,
    negative: 44
  },
  {
    location: "Delhi, Delhi",
    latitude: 28.7041,
    longitude: 77.1025,
    positive: 156,
    neutral: 78,
    negative: 66
  },
  {
    location: "Chennai, Tamil Nadu",
    latitude: 13.0827,
    longitude: 80.2707,
    positive: 98,
    neutral: 52,
    negative: 50
  },
  {
    location: "Kolkata, West Bengal",
    latitude: 22.5726,
    longitude: 88.3639,
    positive: 76,
    neutral: 89,
    negative: 35
  },
  {
    location: "Hyderabad, Telangana",
    latitude: 17.3850,
    longitude: 78.4867,
    positive: 112,
    neutral: 43,
    negative: 25
  },
  {
    location: "Pune, Maharashtra",
    latitude: 18.5204,
    longitude: 73.8567,
    positive: 87,
    neutral: 56,
    negative: 37
  },
  {
    location: "Ahmedabad, Gujarat",
    latitude: 23.0225,
    longitude: 72.5714,
    positive: 94,
    neutral: 41,
    negative: 45
  },
  {
    location: "Jaipur, Rajasthan",
    latitude: 26.9124,
    longitude: 75.7873,
    positive: 68,
    neutral: 73,
    negative: 39
  },
  {
    location: "Lucknow, Uttar Pradesh",
    latitude: 26.8467,
    longitude: 80.9462,
    positive: 82,
    neutral: 58,
    negative: 40
  },
  {
    location: "Kochi, Kerala",
    latitude: 9.9312,
    longitude: 76.2673,
    positive: 145,
    neutral: 34,
    negative: 21
  },
  {
    location: "Bhubaneswar, Odisha",
    latitude: 20.2961,
    longitude: 85.8245,
    positive: 71,
    neutral: 62,
    negative: 47
  },
  {
    location: "Indore, Madhya Pradesh",
    latitude: 22.7196,
    longitude: 75.8577,
    positive: 59,
    neutral: 81,
    negative: 50
  },
  {
    location: "Chandigarh, Chandigarh",
    latitude: 30.7333,
    longitude: 76.7794,
    positive: 103,
    neutral: 47,
    negative: 30
  },
  {
    location: "Coimbatore, Tamil Nadu",
    latitude: 11.0168,
    longitude: 76.9558,
    positive: 91,
    neutral: 49,
    negative: 40
  },
  {
    location: "Vadodara, Gujarat",
    latitude: 22.3072,
    longitude: 73.1812,
    positive: 67,
    neutral: 65,
    negative: 48
  },
  {
    location: "Visakhapatnam, Andhra Pradesh",
    latitude: 17.6868,
    longitude: 83.2185,
    positive: 78,
    neutral: 54,
    negative: 38
  },
  {
    location: "Bhopal, Madhya Pradesh",
    latitude: 23.2599,
    longitude: 77.4126,
    positive: 56,
    neutral: 72,
    negative: 52
  },
  {
    location: "Patna, Bihar",
    latitude: 25.5941,
    longitude: 85.1376,
    positive: 43,
    neutral: 89,
    negative: 68
  },
  {
    location: "Ludhiana, Punjab",
    latitude: 30.9010,
    longitude: 75.8573,
    positive: 84,
    neutral: 46,
    negative: 40
  },
  {
    location: "Agra, Uttar Pradesh",
    latitude: 27.1767,
    longitude: 78.0081,
    positive: 52,
    neutral: 78,
    negative: 50
  },
  {
    location: "Nashik, Maharashtra",
    latitude: 19.9975,
    longitude: 73.7898,
    positive: 73,
    neutral: 57,
    negative: 40
  },
  {
    location: "Faridabad, Haryana",
    latitude: 28.4089,
    longitude: 77.3178,
    positive: 61,
    neutral: 69,
    negative: 50
  },
  {
    location: "Meerut, Uttar Pradesh",
    latitude: 28.9845,
    longitude: 77.7064,
    positive: 48,
    neutral: 82,
    negative: 50
  },
  {
    location: "Rajkot, Gujarat",
    latitude: 22.3039,
    longitude: 70.8022,
    positive: 69,
    neutral: 61,
    negative: 40
  }
];

export async function seedSentimentData() {
  try {
    const promises = sentimentData.map(data => 
      addDoc(collection(db, 'sentimentData'), data)
    );
    
    await Promise.all(promises);
    console.log('Sentiment data seeded successfully!');
  } catch (error) {
    console.error('Error seeding sentiment data:', error);
  }
}
