
'use client';

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import WordCloud from 'react-d3-cloud';
import { useMemo, useRef, useState, useEffect } from 'react';

// Sentiment Distribution Chart
export function SentimentDistributionChart() {
  const data = [
    { name: 'Positive', value: 45, color: '#22c55e' },
    { name: 'Neutral', value: 35, color: '#eab308' },
    { name: 'Negative', value: 20, color: '#ef4444' },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Keyword Frequency Chart
export function KeywordFrequencyChart() {
  const data = [
    { keyword: 'compliance', frequency: 85 },
    { keyword: 'transparency', frequency: 72 },
    { keyword: 'governance', frequency: 68 },
    { keyword: 'regulatory', frequency: 65 },
    { keyword: 'beneficial', frequency: 58 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="keyword" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Enhanced Word Cloud Component
export function EnhancedWordCloud({ words, onWordClick }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    });

    resizeObserver.observe(element);
    setSize({ width: element.offsetWidth, height: element.offsetHeight });

    return () => resizeObserver.disconnect();
  }, []);

  const { min, max } = useMemo(() => {
    if (words.length === 0) return { min: 0, max: 0 };
    const values = words.map(w => w.value);
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [words]);


  const fill = (word) => {
    const sentiment = word.sentiment;
    if (sentiment === 'Positive') return '#10B981'; // Emerald 500
    if (sentiment === 'Negative') return '#3B82F6'; // Blue 500
    if (sentiment === 'Neutral') return '#6B7280'; // Gray 500
    return '#0EA5E9'; // Sky 500
  };

  const fontSize = (word) => {
    if (max === min) return 40;
    const minSize = 14;
    const maxSize = 80;
    // Use a square root scale to make the font sizes less extreme
    const scale = Math.pow((word.value - min) / (max - min), 0.5);
    return minSize + scale * (maxSize - minSize);
  };
  
  const memoizedWords = useMemo(() => words.map(word => ({ ...word, color: fill(word) })), [words]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 400 }}>
      {size && (
        <WordCloud
          data={memoizedWords}
          width={size.width}
          height={size.height}
          font="Impact"
          fontSize={fontSize}
          spiral="rectangular"
          rotate={() => (Math.random() > 0.7 ? 90 : 0)}
          padding={4}
          onWordClick={onWordClick}
        />
      )}
    </div>
  );
}


// Location-wise Chart
export function LocationWiseChart() {
  const data = [
    { location: 'Delhi', count: 125 },
    { location: 'Mumbai', count: 98 },
    { location: 'Bangalore', count: 87 },
    { location: 'Chennai', count: 76 },
    { location: 'Kolkata', count: 65 },
    { location: 'Hyderabad', count: 54 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Gender-wise Chart
export function GenderWiseChart() {
  const data = [
    { name: 'Male', value: 65, color: '#3b82f6' },
    { name: 'Female', value: 30, color: '#ec4899' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Age-wise Chart
export function AgeWiseChart() {
  const data = [
    { age: '18-25', count: 15 },
    { age: '26-35', count: 35 },
    { age: '36-45', count: 28 },
    { age: '46-55', count: 15 },
    { age: '56-65', count: 5 },
    { age: '65+', count: 2 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Overall Sentiment Distribution Chart
export function OverallSentimentDistributionChart() {
  const data = [
    { name: 'Positive', value: 83.3, color: '#22c55e' },
    { name: 'Neutral', value: 4.2, color: '#eab308' },
    { name: 'Negative', value: 12.5, color: '#ef4444' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Overall Sentiment Score Trend Chart
export function OverallSentimentScoreTrendChart() {
  const data = [
    { date: 'Week 1', score: 6.2 },
    { date: 'Week 2', score: 7.1 },
    { date: 'Week 3', score: 7.8 },
    { date: 'Week 4', score: 8.3 },
    { date: 'Week 5', score: 7.6 },
    { date: 'Week 6', score: 7.9 },
    { date: 'Week 7', score: 8.1 },
    { date: 'Week 8', score: 7.6 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="score" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
