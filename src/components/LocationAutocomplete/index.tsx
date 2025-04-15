"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "./LocationAutocomplete.module.scss";

interface Location {
  id?: string;
  label: string;
  terms: string[];
  displayLocation: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: Location) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function LocationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "e.g. town or postcode",
  className,
  disabled = false,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(value, 300);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.cv-library.co.uk/v1/locations?q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      const locations = await response.json();
      setSuggestions(locations || []);
    } catch {
      setError("Failed to load locations. Please try again.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions(debouncedValue);
  }, [debouncedValue, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
    setError(null);
  };

  const handleSelect = (location: Location) => {
    onSelect(location);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.autocomplete} ${className || ""}`}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
        aria-autocomplete="list"
        aria-controls="location-suggestions"
        aria-label="Location search"
      />

      {isLoading && (
        <div
          className={styles.loading}
          role="status"
          aria-label="Loading locations"
        >
          Loading...
        </div>
      )}

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          id="location-suggestions"
          className={styles.suggestions}
          role="listbox"
        >
          {suggestions.map((location) => (
            <li
              key={location.label}
              className={styles.suggestion}
              role="option"
              onClick={() => handleSelect(location)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Space") {
                  e.preventDefault();
                  handleSelect(location);
                }
              }}
              tabIndex={0}
            >
              <div className={styles.name}>{location.label}</div>
              {location.terms.length > 1 && (
                <div className={styles.region}>
                  {location.terms.slice(1).join(", ")}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
