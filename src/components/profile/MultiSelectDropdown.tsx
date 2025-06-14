
import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface MultiSelectDropdownProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  translationPrefix?: string;
  id: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  translationPrefix,
  id
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedItems = value ? value.split(', ').filter(Boolean) : [];

  const filteredOptions = options.filter(option => {
    const displayText = translationPrefix 
      ? t(`${translationPrefix}.${option}`) as string
      : option;
    return displayText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelect = (option: string) => {
    if (selectedItems.includes(option)) {
      // Remove item
      const newItems = selectedItems.filter(item => item !== option);
      onChange(newItems.join(', '));
    } else {
      // Add item
      const newItems = [...selectedItems, option];
      onChange(newItems.join(', '));
    }
  };

  const removeItem = (itemToRemove: string) => {
    const newItems = selectedItems.filter(item => item !== itemToRemove);
    onChange(newItems.join(', '));
  };

  const getDisplayText = (option: string) => {
    return translationPrefix 
      ? t(`${translationPrefix}.${option}`) as string
      : option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm">{label}</Label>
      
      {/* Selected items display */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedItems.map((item) => (
            <div
              key={item}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              <span>{getDisplayText(item)}</span>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">
              {selectedItems.length > 0 
                ? `${selectedItems.length} selected`
                : placeholder
              }
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full p-0" align="start">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleSelect(option)}
                className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex h-4 w-4 items-center justify-center">
                  {selectedItems.includes(option) && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <span className="flex-1">{getDisplayText(option)}</span>
              </DropdownMenuItem>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MultiSelectDropdown;
