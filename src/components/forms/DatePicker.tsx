'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DatePickerProps {
  value?: string; // Format: YYYY-MM-DD
  onChange: (date: string) => void;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Select date...',
  hasError = false,
  disabled = false,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial view year and month
  const initialDate = value ? new Date(value) : new Date();
  const validInitialDate = !isNaN(initialDate.getTime()) ? initialDate : new Date();

  const [viewYear, setViewYear] = useState(validInitialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(validInitialDate.getMonth()); // 0-11

  // Update view when value changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Esc key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDaySelect = (year: number, month: number, day: number) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const isoString = `${year}-${formattedMonth}-${formattedDay}`;
    onChange(isoString);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const handleToday = () => {
    const today = new Date();
    const formattedMonth = String(today.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(today.getDate()).padStart(2, '0');
    const isoString = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;
    onChange(isoString);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setIsOpen(false);
  };

  // Formatted display string
  const formatDisplay = (val?: string) => {
    if (!val) return '';
    const parts = val.split('-');
    const p0 = parts[0];
    const p1 = parts[1];
    const p2 = parts[2];
    if (p0 && p1 && p2) {
      const year = parseInt(p0, 10);
      const month = parseInt(p1, 10) - 1;
      const day = parseInt(p2, 10);
      const monthName = MONTH_NAMES[month];
      if (month >= 0 && month < 12 && monthName && !isNaN(day) && !isNaN(year)) {
        return `${day} ${monthName.slice(0, 3)} ${year}`;
      }
    }
    return val;
  };

  // Build calendar matrix
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Year options for jump dropdown: 100 years back to 20 years forward
  const currentActualYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 120 }, (_, idx) => currentActualYear - 90 + idx);

  // Check if a date string is selected
  const isSelectedDate = (year: number, month: number, day: number) => {
    if (!value) return false;
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    return value === `${year}-${formattedMonth}-${formattedDay}`;
  };

  // Check if date is today
  const isTodayDate = (year: number, month: number, day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  // Check if date is disabled (min/max)
  const isDateDisabled = (year: number, month: number, day: number) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    return false;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Display Button */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full flex items-center justify-between text-sm rounded-xl border bg-gray-800/80 px-4 py-3 cursor-pointer transition-all focus:outline-none focus:ring-2 select-none ${
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-900/50' : ''
        } ${
          hasError
            ? 'border-red-500 focus:ring-red-500/50'
            : isOpen
              ? 'border-amber-400 ring-2 ring-amber-400/30'
              : 'border-gray-700 hover:border-gray-600 focus:border-amber-400 focus:ring-amber-400/30'
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <CalendarIcon size={18} className="text-amber-400 shrink-0" />
          {value ? (
            <span className="text-white font-medium truncate">{formatDisplay(value)}</span>
          ) : (
            <span className="text-gray-500 truncate">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e as unknown as React.MouseEvent);
                }
              }}
              title="Clear date"
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/60 transition-colors"
            >
              <X size={14} />
            </span>
          )}
        </div>
      </div>

      {/* Popover Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-[320px] rounded-2xl border border-gray-700/80 bg-[#161a23] shadow-2xl p-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header Controls: Month/Year navigation */}
          <div className="flex items-center justify-between gap-1 mb-3">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous Month"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5">
              {/* Month selector */}
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(parseInt(e.target.value, 10))}
                className="bg-gray-800/90 text-white text-xs font-semibold rounded-lg px-2 py-1 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={idx} value={idx}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Year selector */}
              <select
                value={viewYear}
                onChange={(e) => setViewYear(parseInt(e.target.value, 10))}
                className="bg-gray-800/90 text-white text-xs font-semibold rounded-lg px-2 py-1 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next Month"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {DAYS_OF_WEEK.map((day) => (
              <span key={day} className="text-[11px] font-semibold text-gray-500 py-1">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Leading days from previous month */}
            {Array.from({ length: firstDayOfWeek }, (_, idx) => {
              const dayNum = daysInPrevMonth - firstDayOfWeek + idx + 1;
              const prevMonthVal = viewMonth === 0 ? 11 : viewMonth - 1;
              const prevYearVal = viewMonth === 0 ? viewYear - 1 : viewYear;
              const disabledDay = isDateDisabled(prevYearVal, prevMonthVal, dayNum);

              return (
                <button
                  key={`prev-${idx}`}
                  type="button"
                  disabled={disabledDay}
                  onClick={() => !disabledDay && handleDaySelect(prevYearVal, prevMonthVal, dayNum)}
                  className="h-8 w-8 mx-auto rounded-lg text-xs text-gray-600 hover:text-gray-400 hover:bg-gray-800/50 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {dayNum}
                </button>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInCurrentMonth }, (_, idx) => {
              const dayNum = idx + 1;
              const selected = isSelectedDate(viewYear, viewMonth, dayNum);
              const today = isTodayDate(viewYear, viewMonth, dayNum);
              const disabledDay = isDateDisabled(viewYear, viewMonth, dayNum);

              return (
                <button
                  key={`cur-${dayNum}`}
                  type="button"
                  disabled={disabledDay}
                  onClick={() => !disabledDay && handleDaySelect(viewYear, viewMonth, dayNum)}
                  className={`h-8 w-8 mx-auto rounded-lg text-xs font-medium flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                    selected
                      ? 'bg-amber-400 text-gray-950 font-bold shadow-md shadow-amber-400/20'
                      : today
                        ? 'border border-amber-400/80 text-amber-300 hover:bg-amber-400/10'
                        : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}

            {/* Trailing days for next month */}
            {(() => {
              const totalRendered = firstDayOfWeek + daysInCurrentMonth;
              const trailingCount = (7 - (totalRendered % 7)) % 7;
              return Array.from({ length: trailingCount }, (_, idx) => {
                const dayNum = idx + 1;
                const nextMonthVal = viewMonth === 11 ? 0 : viewMonth + 1;
                const nextYearVal = viewMonth === 11 ? viewYear + 1 : viewYear;
                const disabledDay = isDateDisabled(nextYearVal, nextMonthVal, dayNum);

                return (
                  <button
                    key={`next-${idx}`}
                    type="button"
                    disabled={disabledDay}
                    onClick={() =>
                      !disabledDay && handleDaySelect(nextYearVal, nextMonthVal, dayNum)
                    }
                    className="h-8 w-8 mx-auto rounded-lg text-xs text-gray-600 hover:text-gray-400 hover:bg-gray-800/50 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {dayNum}
                  </button>
                );
              });
            })()}
          </div>

          {/* Footer Quick Actions */}
          <div className="flex items-center justify-between border-t border-gray-800 mt-3 pt-2.5">
            <button
              type="button"
              onClick={handleToday}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              Today
            </button>
            <div className="flex items-center gap-2">
              {value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
