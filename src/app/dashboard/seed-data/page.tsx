'use client';

import { useState } from 'react';
import { seedSentimentData } from '@/lib/seedData';
import { Button } from '@/components/ui/button';

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const handleSeedData = async () => {
    setLoading(true);
    try {
      await seedSentimentData();
      setSeeded(true);
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Seed Sentiment Data</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This will populate your Firestore database with sample sentiment data for 25 major Indian cities.
            The data includes location coordinates and sentiment counts (positive, neutral, negative).
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Sample Data Structure:</h3>
            <pre className="text-sm text-blue-800 bg-blue-100 p-3 rounded overflow-x-auto">
{`{
  "location": "Bengaluru, Karnataka",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "positive": 124,
  "neutral": 45,
  "negative": 31
}`}
            </pre>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handleSeedData} 
            disabled={loading || seeded}
            className="flex-1"
          >
            {loading ? 'Seeding Data...' : seeded ? 'Data Seeded!' : 'Seed Sample Data'}
          </Button>
          
          {seeded && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/location-sentiment'}
              className="flex-1"
            >
              View Location Sentiment
            </Button>
          )}
        </div>

        {seeded && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              ✅ Data seeded successfully! You can now view the location-wise sentiment analysis dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
