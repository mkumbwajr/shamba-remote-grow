
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

const faqData = [
  {
    category: 'Account & Profile',
    questions: [
      {
        question: 'How do I create my farmer profile?',
        answer: 'Navigate to the Profile section from the sidebar and click "Edit Profile" to add your farming information, location, and other details.'
      },
      {
        question: 'Can I change my location after registration?',
        answer: 'Yes, you can update your location and other profile information at any time through the Profile section.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'Use the "Forgot Password" link on the login page to receive a password reset email.'
      }
    ]
  },
  {
    category: 'Crop Management',
    questions: [
      {
        question: 'How does the Crop Matcher work?',
        answer: 'The Crop Matcher analyzes your location, soil type, climate, and farming experience to recommend the best crops for your conditions.'
      },
      {
        question: 'Can I track multiple crops at once?',
        answer: 'Yes, you can manage multiple farms and track different crops simultaneously through the Farms section.'
      },
      {
        question: 'How accurate are the crop recommendations?',
        answer: 'Our recommendations are based on local agricultural data, climate patterns, and successful farming practices in your region.'
      }
    ]
  },
  {
    category: 'Marketplace',
    questions: [
      {
        question: 'How do I buy seeds and equipment?',
        answer: 'Browse the Marketplace section, select items, add them to cart, and proceed to checkout. We accept various payment methods.'
      },
      {
        question: 'Can I sell my produce on the platform?',
        answer: 'Yes, farmers can list their produce for sale. Contact support to set up your seller account.'
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept mobile money (M-Pesa, Tigo Pesa), bank transfers, and credit/debit cards.'
      }
    ]
  },
  {
    category: 'Workers & Land',
    questions: [
      {
        question: 'How do I hire farm workers?',
        answer: 'Visit the Workers section to browse available workers, view their profiles, and send hire requests.'
      },
      {
        question: 'Can I rent agricultural land?',
        answer: 'Yes, the Land Rental section shows available plots with detailed information about location, soil quality, and pricing.'
      },
      {
        question: 'How are worker payments handled?',
        answer: 'Payments are processed through the platform with options for daily, weekly, or project-based compensation.'
      }
    ]
  }
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Frequently Asked Questions</CardTitle>
        <p className="text-gray-600">Find answers to common questions about Bwana Shamba</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-2">
                {category.questions.map((faq, questionIndex) => {
                  const itemId = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <Collapsible key={questionIndex}>
                      <CollapsibleTrigger
                        onClick={() => toggleItem(itemId)}
                        className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className={isOpen ? 'block' : 'hidden'}>
                        <div className="p-4 bg-white border border-gray-200 rounded-b-lg">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
