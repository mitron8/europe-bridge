"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClaySelectOption<T = any> {
  value: T;
  label: string;
  sublabel?: string;
  searchTerms?: string[];
}

export interface ClaySelectProps<T = any> {
  name?: string;
  value?: T | T[];
  onChange: (value: any, name?: string) => void;
  options?: (ClaySelectOption<T> | T)[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  isSearchable?: boolean;
  multiple?: boolean;
  isMulti?: boolean;
  isLoading?: boolean;
  loadOptions?: (inputValue: string) => Promise<(ClaySelectOption<T> | T)[]>;
  noOptionsMessage?: string | ((obj: { inputValue: string }) => string);
  dropdownClassName?: string;
}

export function ClaySelect<T = any>({
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  className = '',
  disabled = false,
  searchable = false,
  isSearchable,
  multiple = false,
  isMulti,
  isLoading = false,
  loadOptions,
  noOptionsMessage,
  dropdownClassName = '',
}: ClaySelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [maxMenuHeight, setMaxMenuHeight] = useState<number>(300);
  const [searchQuery, setSearchQuery] = useState('');
  const [asyncOptions, setAsyncOptions] = useState<ClaySelectOption<T>[]>([]);
  const [isAsyncLoading, setIsAsyncLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const effectiveSearchable = isSearchable !== undefined ? isSearchable : searchable;
  const effectiveMultiple = isMulti !== undefined ? isMulti : multiple;

  // Adaptively detect viewport space and calculate optimal dropdown height and direction
  const updateMenuPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If space below is limited (< 280px) and there's more space above, open upward
      const shouldOpenUp = spaceBelow < 280 && spaceAbove > spaceBelow;
      setOpenUpward(shouldOpenUp);

      const availableSpace = shouldOpenUp ? spaceAbove - 24 : spaceBelow - 24;
      // Clamp between min 180px and max 340px
      const calculatedMax = Math.max(180, Math.min(340, Math.floor(availableSpace)));
      setMaxMenuHeight(calculatedMax);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateMenuPosition();
      window.addEventListener('resize', updateMenuPosition);
      window.addEventListener('scroll', updateMenuPosition, true);
      return () => {
        window.removeEventListener('resize', updateMenuPosition);
        window.removeEventListener('scroll', updateMenuPosition, true);
      };
    }
  }, [isOpen, updateMenuPosition]);

  // Normalize and deduplicate static options to ClaySelectOption objects
  const normalizeOptions = useCallback((raw: (ClaySelectOption<T> | T)[]): ClaySelectOption<T>[] => {
    const seen = new Set<string>();
    const list: ClaySelectOption<T>[] = [];
    for (const opt of raw || []) {
      const normalized: ClaySelectOption<T> =
        opt && typeof opt === 'object' && 'value' in (opt as any) && 'label' in (opt as any)
          ? (opt as ClaySelectOption<T>)
          : { value: opt as T, label: String(opt) };

      const key = `${String(normalized.value).trim().toLowerCase()}__${String(normalized.label).trim().toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        list.push(normalized);
      }
    }
    return list;
  }, []);

  const baseOptions = loadOptions ? asyncOptions : normalizeOptions(options);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && (effectiveSearchable || loadOptions)) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, effectiveSearchable, loadOptions]);

  // Handle async loading of options with debounce
  useEffect(() => {
    if (!loadOptions || !isOpen) return;

    let isMounted = true;
    setIsAsyncLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await loadOptions(searchQuery);
        if (isMounted) {
          setAsyncOptions(normalizeOptions(results));
        }
      } catch {
        if (isMounted) setAsyncOptions([]);
      } finally {
        if (isMounted) setIsAsyncLoading(false);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, loadOptions, isOpen, normalizeOptions]);

  // Multiple vs Single value resolution
  const selectedValues: T[] = effectiveMultiple
    ? Array.isArray(value) ? value : value ? [value] : []
    : [];

  const singleSelectedOption = !effectiveMultiple
    ? baseOptions.find((opt) => opt.value === value) || (value ? { value: value as T, label: String(value) } : null)
    : null;

  const multiSelectedOptions = effectiveMultiple
    ? selectedValues.map((val) => {
        const found = baseOptions.find((opt) => opt.value === val);
        return found || { value: val, label: String(val) };
      })
    : [];

  const filteredOptions = baseOptions.filter((opt) => {
    if (loadOptions) return true; // already filtered by API
    const normalizedSearch = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!normalizedSearch) return true;

    const searchString = [
      opt.label,
      opt.sublabel,
      ...(opt.searchTerms || []),
    ].filter(Boolean).join(' ').toLowerCase().replace(/[^a-z0-9\s]/g, '');

    return searchString.includes(normalizedSearch);
  });

  const hasEmptyOption = baseOptions.some(
    (opt) =>
      opt.value === '' ||
      opt.value === null ||
      String(opt.label).trim().toLowerCase() === String(placeholder).trim().toLowerCase() ||
      String(opt.value).trim().toLowerCase() === String(placeholder).trim().toLowerCase()
  );

  const handleSelectSingle = (val: T) => {
    onChange(val, name);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleToggleMultiple = (val: T) => {
    const exists = selectedValues.some((v) => v === val);
    const newValues = exists
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    onChange(newValues, name);
  };

  const handleRemoveChip = (e: React.MouseEvent, val: T) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== val);
    onChange(newValues, name);
  };

  const shouldShowSearch = effectiveSearchable || Boolean(loadOptions) || baseOptions.length > 8;

  const getNoOptionsText = () => {
    if (typeof noOptionsMessage === 'function') {
      return noOptionsMessage({ inputValue: searchQuery });
    }
    if (typeof noOptionsMessage === 'string') {
      return noOptionsMessage;
    }
    return 'No matching options';
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full min-h-[42px] px-3.5 py-2 text-xs font-bold bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 rounded-xl text-germany-black dark:text-white text-left flex items-center justify-between cursor-pointer transition-all shadow-xs ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-700'
        } ${isOpen ? 'ring-2 ring-germany-red/20 border-germany-red bg-white dark:bg-[#111622]' : ''}`}
      >
        <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-0 pr-2">
          {effectiveMultiple ? (
            multiSelectedOptions.length > 0 ? (
              multiSelectedOptions.map((opt, idx) => (
                <span
                  key={`${String(opt.value)}-${idx}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-germany-black dark:text-gray-100 text-[11px] font-bold border border-gray-200 dark:border-gray-700 max-w-full text-left"
                >
                  <span className="whitespace-normal break-words leading-tight">{opt.label}</span>
                  {!disabled && (
                    <span
                      onClick={(e) => handleRemoveChip(e, opt.value)}
                      className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-germany-red cursor-pointer inline-flex items-center justify-center transition-colors shrink-0"
                      title={`Remove ${opt.label}`}
                    >
                      <X className="w-3 h-3" />
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-400 dark:text-gray-500 font-medium whitespace-normal break-words">
                {placeholder}
              </span>
            )
          ) : (
            <span className={`whitespace-normal break-words leading-snug text-left ${!singleSelectedOption?.label ? 'text-gray-400 dark:text-gray-500 font-medium' : 'text-germany-black dark:text-white'}`}>
              {singleSelectedOption ? singleSelectedOption.label : placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-gray-400 ml-2">
          {(isLoading || isAsyncLoading) && <Loader2 className="w-3.5 h-3.5 animate-spin text-germany-red" />}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-germany-red' : ''
            }`}
          />
        </div>
      </button>

      {/* Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUpward ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUpward ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ maxHeight: `${maxMenuHeight}px` }}
            className={`absolute left-0 right-0 ${
              openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
            } p-1.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 rounded-xl shadow-lg dark:shadow-2xl z-50 flex flex-col overflow-hidden min-w-full ${dropdownClassName}`}
          >
            {/* Optional Search Bar */}
            {shouldShowSearch && (
              <div className="mb-1.5 p-1 relative shrink-0">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-bold bg-gray-50 dark:bg-[#111622] border border-gray-200/80 dark:border-gray-700 rounded-lg text-germany-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors"
                />
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto flex-1 min-h-0 space-y-1 dropdown-scrollbar pr-1 pb-1.5">
              {!effectiveMultiple && placeholder && !shouldShowSearch && !hasEmptyOption && (
                <button
                  type="button"
                  onClick={() => handleSelectSingle('' as any)}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-gray-400 dark:text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E2638] transition-colors whitespace-normal break-words leading-snug cursor-pointer shrink-0"
                >
                  {placeholder}
                </button>
              )}

              {isAsyncLoading ? (
                <div className="p-4 text-center text-xs font-medium text-gray-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-germany-red" />
                  <span>Searching...</span>
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="p-3 text-center text-xs font-medium text-gray-400">
                  {getNoOptionsText()}
                </div>
              ) : (
                filteredOptions.map((opt, idx) => {
                  const isSelected = effectiveMultiple
                    ? selectedValues.some((v) => v === opt.value)
                    : opt.value === value;

                  return (
                    <button
                      key={`${String(opt.value)}-${idx}`}
                      type="button"
                      onClick={() => effectiveMultiple ? handleToggleMultiple(opt.value) : handleSelectSingle(opt.value)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-bold rounded-lg flex items-start justify-between gap-2 transition-colors cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-germany-red text-white'
                          : 'text-germany-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1E2638]'
                      }`}
                    >
                      <div className="flex flex-col min-w-0 pr-1 flex-1">
                        <span className="whitespace-normal break-words leading-snug">{opt.label}</span>
                        {opt.sublabel && (
                          <span className={`text-[10px] font-medium whitespace-normal break-words leading-tight mt-0.5 ${isSelected ? 'text-white/85' : 'text-gray-400 dark:text-gray-400'}`}>
                            {opt.sublabel}
                          </span>
                        )}
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
