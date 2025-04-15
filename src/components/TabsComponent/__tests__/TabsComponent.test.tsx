import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabsComponent from '../index';

describe('TabsComponent', () => {
  const mockOnTabChange = jest.fn();
  const defaultProps = {
    activeTab: 'location',
    onTabChange: mockOnTabChange,
    locale: 'en',
    categoryList: ['Category 1', 'Category 2', 'Category 3'],
  };

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders correctly with location tab active', () => {
    render(<TabsComponent {...defaultProps} />);
    
    // Check if tabs are rendered
    expect(screen.getByText('jobs:tabs.location')).toBeInTheDocument();
    expect(screen.getByText('jobs:tabs.industry')).toBeInTheDocument();
    
    // Check if categories are rendered
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Category 3')).toBeInTheDocument();
    
    // Check if location tab has active class
    const locationTab = screen.getByText('jobs:tabs.location');
    expect(locationTab.className).toContain('active');
    
    // Check if industry tab doesn't have active class
    const industryTab = screen.getByText('jobs:tabs.industry');
    expect(industryTab.className).toContain('inactive');
  });

  it('renders correctly with industry tab active', () => {
    render(<TabsComponent {...defaultProps} activeTab="industry" />);
    
    // Check if location tab doesn't have active class
    const locationTab = screen.getByText('jobs:tabs.location');
    expect(locationTab.className).toContain('inactive');
    
    // Check if industry tab has active class
    const industryTab = screen.getByText('jobs:tabs.industry');
    expect(industryTab.className).toContain('active');
  });

  it('calls onTabChange when a tab is clicked', () => {
    render(<TabsComponent {...defaultProps} />);
    
    // Click on industry tab
    const industryTab = screen.getByText('jobs:tabs.industry');
    fireEvent.click(industryTab);
    
    // Check if onTabChange was called with 'industry'
    expect(mockOnTabChange).toHaveBeenCalledWith('industry');
    
    // Click on location tab
    const locationTab = screen.getByText('jobs:tabs.location');
    fireEvent.click(locationTab);
    
    // Check if onTabChange was called with 'location'
    expect(mockOnTabChange).toHaveBeenCalledWith('location');
  });

  it('renders all category links', () => {
    const categories = ['Job 1', 'Job 2', 'Job 3', 'Job 4', 'Job 5'];
    render(<TabsComponent {...defaultProps} categoryList={categories} />);
    
    // Check if all categories are rendered
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });
});
