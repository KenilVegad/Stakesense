'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Filter, X } from 'lucide-react';

export default function FeedbackFilters() {
  const [selectedSentiment, setSelectedSentiment] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<Date | undefined>(undefined);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const sentimentOptions = ['Positive', 'Negative', 'Neutral'];
  const locationOptions = ['All Locations', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  const keywordOptions = ['compliance', 'transparency', 'governance', 'regulatory', 'beneficial', 'implementation'];

  const handleSentimentChange = (sentiment: string) => {
    setSelectedSentiment(prev => 
      prev.includes(sentiment) 
        ? prev.filter(s => s !== sentiment)
        : [...prev, sentiment]
    );
  };

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearFilters = () => {
    setSelectedSentiment([]);
    setSelectedLocation('');
    setSelectedDateRange(undefined);
    setSelectedKeywords([]);
  };

  const hasActiveFilters = selectedSentiment.length > 0 || selectedLocation || selectedDateRange || selectedKeywords.length > 0;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sentiment Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Sentiment</Label>
          <div className="space-y-2">
            {sentimentOptions.map((sentiment) => (
              <div key={sentiment} className="flex items-center space-x-2">
                <Checkbox
                  id={`sentiment-${sentiment}`}
                  checked={selectedSentiment.includes(sentiment)}
                  onCheckedChange={() => handleSentimentChange(sentiment)}
                />
                <Label 
                  htmlFor={`sentiment-${sentiment}`} 
                  className="text-sm cursor-pointer"
                >
                  {sentiment}
                </Label>
              </div>
            ))}
          </div>
          {selectedSentiment.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedSentiment.map((sentiment) => (
                <Badge 
                  key={sentiment} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {sentiment}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Location Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Date Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Date Range</Label>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {selectedDateRange 
                ? selectedDateRange.toLocaleDateString()
                : 'Select date'
              }
            </span>
          </div>
          <Calendar
            mode="single"
            selected={selectedDateRange}
            onSelect={setSelectedDateRange}
            className="rounded-md border"
          />
        </div>

        <Separator />

        {/* Keywords Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Keywords</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {keywordOptions.map((keyword) => (
              <div key={keyword} className="flex items-center space-x-2">
                <Checkbox
                  id={`keyword-${keyword}`}
                  checked={selectedKeywords.includes(keyword)}
                  onCheckedChange={() => handleKeywordChange(keyword)}
                />
                <Label 
                  htmlFor={`keyword-${keyword}`} 
                  className="text-sm cursor-pointer"
                >
                  {keyword}
                </Label>
              </div>
            ))}
          </div>
          {selectedKeywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedKeywords.map((keyword) => (
                <Badge 
                  key={keyword} 
                  variant="outline" 
                  className="text-xs"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Filter Summary */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Active Filters</Label>
          <div className="text-xs text-muted-foreground space-y-1">
            {selectedSentiment.length > 0 && (
              <div>Sentiment: {selectedSentiment.join(', ')}</div>
            )}
            {selectedLocation && (
              <div>Location: {selectedLocation}</div>
            )}
            {selectedDateRange && (
              <div>Date: {selectedDateRange.toLocaleDateString()}</div>
            )}
            {selectedKeywords.length > 0 && (
              <div>Keywords: {selectedKeywords.join(', ')}</div>
            )}
            {!hasActiveFilters && (
              <div className="italic">No filters applied</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
