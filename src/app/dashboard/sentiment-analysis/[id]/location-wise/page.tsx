'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DynamicMap = dynamic(() => import('@/components/shared/SafeMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-lg dark:text-white">Loading map...</div>
    </div>
  )
});

interface SentimentData {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  positive: number;
  neutral: number;
  negative: number;
  lastUpdated: string;
}

interface AnalyticsData {
  totalPositive: number;
  totalNeutral: number;
  totalNegative: number;
  topStates: Array<{
    state: string;
    positive: number;
    neutral: number;
    negative: number;
    total: number;
  }>;
}

export default function LocationSentimentPage() {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({ totalPositive: 0, totalNeutral: 0, totalNegative: 0, topStates: [] });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    const q = query(collection(db, 'sentimentData'), orderBy('location'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: SentimentData[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SentimentData));
      setSentimentData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    let data = sentimentData;
    if (searchTerm) {
      data = data.filter(item => item.location.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (timeRange !== 'all') {
      const now = new Date();
      const days = parseInt(timeRange);
      data = data.filter(item => {
        const itemDate = new Date(item.lastUpdated);
        const diffTime = Math.abs(now.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
      });
    }
    return data;
  }, [sentimentData, searchTerm, timeRange]);

  useEffect(() => {
    const analytics: AnalyticsData = {
      totalPositive: filteredData.reduce((sum, item) => sum + item.positive, 0),
      totalNeutral: filteredData.reduce((sum, item) => sum + item.neutral, 0),
      totalNegative: filteredData.reduce((sum, item) => sum + item.negative, 0),
      topStates: []
    };

    const stateGroups: { [key: string]: { positive: number; neutral: number; negative: number; total: number } } = {};
    filteredData.forEach(item => {
      const state = item.location.split(',').pop()?.trim() || item.location;
      if (!stateGroups[state]) {
        stateGroups[state] = { positive: 0, neutral: 0, negative: 0, total: 0 };
      }
      stateGroups[state].positive += item.positive;
      stateGroups[state].neutral += item.neutral;
      stateGroups[state].negative += item.negative;
      stateGroups[state].total += item.positive + item.neutral + item.negative;
    });

    analytics.topStates = Object.entries(stateGroups)
      .map(([state, data]) => ({ state, ...data }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    setAnalyticsData(analytics);
  }, [filteredData]);

  const downloadCSV = () => {
    const header = ['Location', 'Latitude', 'Longitude', 'Positive', 'Neutral', 'Negative', 'Total', 'LastUpdated'];
    const rows = filteredData.map(d => 
      [d.location, d.latitude, d.longitude, d.positive, d.neutral, d.negative, d.positive + d.neutral + d.negative, d.lastUpdated].join(',')
    );
    const csvContent = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sentiment_summary.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSentimentColor = (positive: number, neutral: number, negative: number) => {
    const total = positive + neutral + negative;
    if (total === 0) return '#9ca3af'; // Gray for no data
    const positiveRatio = positive / total;
    if (positiveRatio > 0.6) return '#22c55e'; // Green
    if (positiveRatio < 0.4) return '#ef4444'; // Red
    return '#eab308'; // Yellow
  };

  const getSentimentSize = (positive: number, neutral: number, negative: number) => {
    const total = positive + neutral + negative;
    return Math.min(Math.max(Math.sqrt(total) * 2, 8), 30);
  };

  const pieData = [
    { name: 'Positive', value: analyticsData.totalPositive, color: '#22c55e' },
    { name: 'Neutral', value: analyticsData.totalNeutral, color: '#eab308' },
    { name: 'Negative', value: analyticsData.totalNegative, color: '#ef4444' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-lg dark:text-white">Loading sentiment data...</div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex ${darkMode ? 'dark' : ''}`}>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          <DynamicMap
            sentimentData={filteredData}
            getSentimentColor={getSentimentColor}
            getSentimentSize={getSentimentSize}
            showHeatmap={showHeatmap}
          />
        </div>
      </div>

      <aside className={`w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto dark:bg-gray-800 dark:border-gray-700`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Analytics & Controls</h2>
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            <Label htmlFor="dark-mode" className="dark:text-gray-300">Dark</Label>
          </div>
        </div>
        
        <Card className="mb-6 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="dark:text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:bg-gray-700 dark:text-white"
            />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Filter by time range..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="1">Today</SelectItem>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch id="heatmap-toggle" checked={showHeatmap} onCheckedChange={setShowHeatmap} />
              <Label htmlFor="heatmap-toggle" className="dark:text-gray-300">Show Heatmap</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="dark:text-white">Overall India Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-around mt-4 text-sm dark:text-gray-300">
              <span>🟢 Positive</span>
              <span>🟡 Neutral</span>
              <span>🔴 Negative</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="dark:text-white">Top 5 States by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.topStates} margin={{ top: 5, right: 30, left: 20, bottom: 75 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
                <XAxis dataKey="state" angle={-45} textAnchor="end" interval={0} tick={{ fill: darkMode ? '#fff' : '#000' }} />
                <YAxis tick={{ fill: darkMode ? '#fff' : '#000' }} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }} />
                <Legend />
                <Bar dataKey="positive" stackId="a" fill="#22c55e" name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill="#eab308" name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Button onClick={downloadCSV} className="w-full">Download CSV</Button>

      </aside>
    </div>
  );
}
