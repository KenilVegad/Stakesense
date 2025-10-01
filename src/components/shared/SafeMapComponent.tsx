'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface SentimentData {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  positive: number;
  neutral: number;
  negative: number;
}

interface SafeMapComponentProps {
  sentimentData: SentimentData[];
  getSentimentColor: (positive: number, neutral: number, negative: number) => string;
  getSentimentSize: (positive: number, neutral: number, negative: number) => number;
  showHeatmap: boolean;
}

export default function SafeMapComponent({ 
  sentimentData, 
  getSentimentColor, 
  getSentimentSize, 
  showHeatmap 
}: SafeMapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<L.Layer | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => { setIsMounted(false); };
  }, []);

  useEffect(() => {
    if (isMounted && containerRef.current && !mapRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear previous layers
    if (layerRef.current) {
      mapRef.current.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    if (showHeatmap) {
      const heatData = sentimentData.map(d => 
        [d.latitude, d.longitude, (d.positive - d.negative) / (d.positive + d.neutral + d.negative) || 0]
      ) as L.HeatLatLngTuple;
      layerRef.current = (L as any).heatLayer(heatData, { radius: 25 }).addTo(mapRef.current);
    } else {
      const markers = L.layerGroup();
      sentimentData.forEach(data => {
        const total = data.positive + data.neutral + data.negative;
        const popupContent = `
          <b>${data.location}</b><br/>
          Positive: ${total > 0 ? ((data.positive / total) * 100).toFixed(1) : 0}%<br/>
          Neutral: ${total > 0 ? ((data.neutral / total) * 100).toFixed(1) : 0}%<br/>
          Negative: ${total > 0 ? ((data.negative / total) * 100).toFixed(1) : 0}%<br/>
          Total Records: ${total}
        `;

        const marker = L.circleMarker([data.latitude, data.longitude], {
          radius: getSentimentSize(data.positive, data.neutral, data.negative),
          fillColor: getSentimentColor(data.positive, data.neutral, data.negative),
          color: '#000',
          weight: 1,
          fillOpacity: 0.8,
        }).bindPopup(popupContent);

        markers.addLayer(marker);
      });
      layerRef.current = markers.addTo(mapRef.current);
    }
  }, [sentimentData, showHeatmap, getSentimentColor, getSentimentSize]);

  return <div ref={containerRef} className="h-full w-full" />;
}
