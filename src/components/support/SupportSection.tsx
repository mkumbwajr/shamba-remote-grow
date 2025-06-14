
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, MapPin, Clock, Mail } from 'lucide-react';
import LiveChatModal from './LiveChatModal';

const contactCenters = [
  {
    id: 1,
    city: 'Dar es Salaam',
    address: 'Kariakoo Market Complex, Uhuru Street, P.O. Box 12345',
    phone: '+255 22 123 4567',
    email: 'support.dares@bwanashamba.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    status: 'open'
  },
  {
    id: 2,
    city: 'Arusha',
    address: 'Central Market Area, Sokoine Road, P.O. Box 67890',
    phone: '+255 27 234 5678',
    email: 'support.arusha@bwanashamba.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    status: 'open'
  },
  {
    id: 3,
    city: 'Mwanza',
    address: 'Nyegezi Market, Station Road, P.O. Box 11223',
    phone: '+255 28 345 6789',
    email: 'support.mwanza@bwanashamba.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    status: 'open'
  },
  {
    id: 4,
    city: 'Dodoma',
    address: 'Mtumba Market, Lumumba Street, P.O. Box 44556',
    phone: '+255 26 456 7890',
    email: 'support.dodoma@bwanashamba.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    status: 'open'
  },
  {
    id: 5,
    city: 'Mbeya',
    address: 'Mbeya City Market, Jacaranda Street, P.O. Box 77889',
    phone: '+255 25 567 8901',
    email: 'support.mbeya@bwanashamba.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    status: 'open'
  }
];

const SupportSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Quick Support Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-green-800">Quick Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Button
              onClick={() => setIsChatOpen(true)}
              className="h-16 sm:h-20 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 text-center"
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base">Live Chat Support</span>
              <span className="text-xs opacity-90">Available 24/7</span>
            </Button>
            <Button
              onClick={() => handleCall('+255 22 123 4567')}
              variant="outline"
              className="h-16 sm:h-20 border-green-300 hover:bg-green-50 text-green-600 hover:text-green-700 flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 text-center"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base">Call Main Support</span>
              <span className="text-xs text-gray-500 break-all">+255 22 123 4567</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Centers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-green-800">Contact Centers Across Tanzania</CardTitle>
          <p className="text-sm sm:text-base text-gray-600">Visit our physical locations for in-person support</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
            {contactCenters.map((center) => (
              <div key={center.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">{center.city}</h3>
                    <Badge variant={center.status === 'open' ? 'default' : 'secondary'} className="mt-1 text-xs">
                      {center.status === 'open' ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{center.address}</p>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600 break-all">{center.phone}</p>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600 break-all">{center.email}</p>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{center.hours}</p>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleCall(center.phone)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEmail(center.email)}
                    className="flex-1 text-xs sm:text-sm"
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <LiveChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default SupportSection;
