
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface SingleSelectDropdownProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  translationPrefix?: string;
  id: string;
}

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
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

  const filteredOptions = options.filter(option => {
    const displayText = translationPrefix 
      ? t(`${translationPrefix}.${option}`) as string
      : option;
    return displayText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getDisplayText = (option: string) => {
    return translationPrefix 
      ? t(`${translationPrefix}.${option}`) as string
      : option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const displayValue = value ? getDisplayText(value) : placeholder;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm">{label}</Label>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">{displayValue}</span>
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
                  {value === option && (
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

export default SingleSelectDropdown;
