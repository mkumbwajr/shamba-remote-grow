
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I create an account on Bwana Shamba?',
        answer: 'To create an account, click the "Sign Up" button on the homepage, fill in your details including name, email, country, and farming preferences. You\'ll receive a verification email to activate your account.'
      },
      {
        question: 'What information do I need to provide during onboarding?',
        answer: 'During onboarding, you\'ll need to provide your full name, country, phone number (optional), preferred crop, farm size, and farming experience level. This helps us personalize your experience.'
      },
      {
        question: 'Is Bwana Shamba free to use?',
        answer: 'Bwana Shamba offers both free and premium features. Basic crop matching, marketplace browsing, and community access are free. Premium features include advanced analytics, priority support, and enhanced marketplace tools.'
      }
    ]
  },
  {
    category: 'Crop Management',
    questions: [
      {
        question: 'How does the Crop Matcher work?',
        answer: 'The Crop Matcher analyzes your location, soil conditions, climate data, and farming experience to recommend the best crops for your farm. It considers factors like rainfall, temperature, and market demand.'
      },
      {
        question: 'Can I track multiple farms on the platform?',
        answer: 'Yes, you can add and manage multiple farms in your dashboard. Each farm can have different crops, workers, and investment tracking. Use the "My Farms" section to switch between farms.'
      },
      {
        question: 'How do I update my crop progress?',
        answer: 'Navigate to your farm dashboard and click on the specific crop. You can update planting dates, growth stages, treatments applied, and harvest information. This data helps with analytics and planning.'
      }
    ]
  },
  {
    category: 'Marketplace',
    questions: [
      {
        question: 'How do I buy seeds and equipment?',
        answer: 'Browse the marketplace, add items to your cart, and proceed to checkout. We accept mobile money payments and bank transfers. Items are delivered to your specified address within 3-7 business days.'
      },
      {
        question: 'Can I sell my produce on the platform?',
        answer: 'Yes, farmers can list their produce for sale in the marketplace. Go to "Sell Products" in the marketplace section, provide product details, pricing, and availability. Buyers can contact you directly.'
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept M-Pesa, Tigo Pesa, Airtel Money, bank transfers, and major credit cards. Payment is secure and processed through verified payment gateways.'
      }
    ]
  },
  {
    category: 'Workers & Land Rental',
    questions: [
      {
        question: 'How do I hire farm workers?',
        answer: 'Visit the Workers section, browse available workers, check their profiles and ratings, then send a hire request. You can negotiate terms and manage contracts through the platform.'
      },
      {
        question: 'How does land rental work?',
        answer: 'Browse available land plots in the Land Rental section. View detailed information including location, size, soil quality, and rental terms. Contact landowners directly to negotiate rental agreements.'
      },
      {
        question: 'Can I rate workers after contracts end?',
        answer: 'Yes, after a contract ends, you can rate and review workers based on their performance. This helps other farmers make informed decisions and helps workers build their reputation.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: 'The app is running slowly. What should I do?',
        answer: 'Try refreshing your browser, clearing cache, or checking your internet connection. If issues persist, contact our support team with details about your device and browser.'
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions in the reset email. If you don\'t receive the email, check your spam folder.'
      },
      {
        question: 'Can I use Bwana Shamba on my mobile phone?',
        answer: 'Yes, Bwana Shamba is fully responsive and works on mobile devices. For the best experience, use a modern browser like Chrome, Safari, or Firefox.'
      }
    ]
  }
];

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Frequently Asked Questions</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.category}</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${categoryIndex}-${index}`}
                      className="border border-gray-200 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
            
            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQSection;
