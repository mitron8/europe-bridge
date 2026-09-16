"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClaySelectOption<T extends string = string> {
  value: T;
  label: string;
  sublabel?: string;
}

export interface ClaySelectProps<T extends string = string> {
  name?: string;
  value?: T;
  onChange: (value: T, name?: string) => void;
  options: (ClaySelectOption<T> | T)[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
}

export function ClaySelect<T extends string = string>({
  name,
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  className = '',
  disabled = false,
  searchable = false,
}: ClaySelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to ClaySelectOption objects
  const normalizedOptions: ClaySelectOption<T>[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt as T, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

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

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (opt.sublabel && opt.sublabel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (val: T) => {
    onChange(val, name);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 text-xs font-bold bg-white border border-gray-200/80 rounded-xl text-germany-black text-left flex items-center justify-between cursor-pointer transition-all shadow-xs ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'
        } ${isOpen ? 'ring-2 ring-germany-red/20 border-germany-red bg-white' : ''}`}
      >
        <span className={`truncate ${!selectedOption?.label ? 'text-gray-400 font-medium' : 'text-germany-black'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-germany-red' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 mt-1.5 p-1.5 bg-white border border-gray-200/80 rounded-xl shadow-lg z-50 max-h-64 flex flex-col overflow-hidden"
          >
            {/* Optional Search Bar */}
            {(searchable || normalizedOptions.length > 8) && (
              <div className="mb-1.5 p-1 relative shrink-0">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-bold bg-gray-50 border border-gray-200/80 rounded-lg text-germany-black placeholder:text-gray-400 focus:outline-none focus:border-germany-red focus:bg-white transition-colors"
                  autoFocus
                />
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto space-y-1 custom-scrollbar max-h-52 pr-0.5">
              {placeholder && (
                <button
                  type="button"
                  onClick={() => handleSelect('' as T)}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-gray-400 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {placeholder}
                </button>
              )}

              {filteredOptions.length === 0 ? (
                <div className="p-3 text-center text-xs font-medium text-gray-400">
                  No matching options
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-germany-red text-white'
                          : 'text-germany-black hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="truncate">{opt.label}</span>
                        {opt.sublabel && (
                          <span className={`text-[10px] font-medium truncate ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                            {opt.sublabel}
                          </span>
                        )}
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
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
