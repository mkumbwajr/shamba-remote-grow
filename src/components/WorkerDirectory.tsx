import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, DollarSign, Users, Phone, Search, MessageSquare } from 'lucide-react';

const WorkerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all-skills');
  const [selectedRegion, setSelectedRegion] = useState('all-regions');
  const [sortBy, setSortBy] = useState('rating');

  console.log('WorkerDirectory - selectedSkill:', selectedSkill, 'selectedRegion:', selectedRegion, 'sortBy:', sortBy);

  const skills = [
    'Land Preparation', 'Planting', 'Irrigation', 'Pest Control', 'Harvesting',
    'Livestock Care', 'Equipment Operation', 'Crop Management', 'Soil Testing',
    'Farm Supervision', 'Post-Harvest Processing'
  ].filter(skill => {
    const isValid = skill && typeof skill === 'string' && skill.trim() !== '' && skill.length > 0;
    console.log('WorkerDirectory - Filtering skill:', skill, 'isValid:', isValid, 'type:', typeof skill, 'length:', skill?.length);
    return isValid;
  });

  const regions = [
    'Arusha', 'Kilimanjaro', 'Manyara', 'Tanga', 'Morogoro', 'Pwani',
    'Dar es Salaam', 'Lindi', 'Mtwara', 'Ruvuma', 'Iringa', 'Njombe',
    'Mbeya', 'Songwe', 'Rukwa', 'Katavi', 'Tabora', 'Singida',
    'Dodoma', 'Mwanza', 'Simiyu', 'Shinyanga', 'Geita', 'Kagera'
  ].filter(region => {
    const isValid = region && typeof region === 'string' && region.trim() !== '' && region.length > 0;
    console.log('WorkerDirectory - Filtering region:', region, 'isValid:', isValid, 'type:', typeof region, 'length:', region?.length);
    return isValid;
  });

  console.log('WorkerDirectory - Final skills after filter:', skills);
  console.log('WorkerDirectory - Final regions after filter:', regions);

  const workers = [
    {
      id: 1,
      name: 'Joseph Mwalimu',
      specialization: 'Farm Supervisor',
      rating: 4.9,
      reviews: 47,
      experience: '8 years',
      location: 'Arusha Region',
      availability: 'Available',
      rate: 25,
      rateType: 'per day',
      skills: ['Farm Supervision', 'Crop Management', 'Land Preparation', 'Team Leadership'],
      languages: ['Swahili', 'English'],
      description: 'Experienced farm supervisor with expertise in coffee and maize farming.',
      completedJobs: 156,
      image: 'JM',
      phone: '+255 123 456 789',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Mary Kimathi',
      specialization: 'Crop Specialist',
      rating: 4.8,
      reviews: 32,
      experience: '6 years',
      location: 'Kilimanjaro Region',
      availability: 'Available',
      rate: 20,
      rateType: 'per day',
      skills: ['Planting', 'Pest Control', 'Irrigation', 'Harvesting'],
      languages: ['Swahili', 'English', 'Chagga'],
      description: 'Specialist in vegetable farming and organic pest control methods.',
      completedJobs: 98,
      image: 'MK',
      phone: '+255 987 654 321',
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Emmanuel Makena',
      specialization: 'Equipment Operator',
      rating: 4.7,
      reviews: 28,
      experience: '5 years',
      location: 'Mbeya Region',
      availability: 'Busy until Dec 20',
      rate: 30,
      rateType: 'per day',
      skills: ['Equipment Operation', 'Land Preparation', 'Irrigation', 'Maintenance'],
      languages: ['Swahili', 'English'],
      description: 'Skilled in operating tractors, harvesters, and irrigation systems.',
      completedJobs: 74,
      image: 'EM',
      phone: '+255 456 789 123',
      lastActive: '30 minutes ago'
    },
    {
      id: 4,
      name: 'Grace Mtui',
      specialization: 'Livestock Specialist',
      rating: 4.9,
      reviews: 41,
      experience: '7 years',
      location: 'Mwanza Region',
      availability: 'Available',
      rate: 22,
      rateType: 'per day',
      skills: ['Livestock Care', 'Animal Health', 'Dairy Management', 'Feeding'],
      languages: ['Swahili', 'English', 'Sukuma'],
      description: 'Expert in dairy farming and livestock health management.',
      completedJobs: 127,
      image: 'GM',
      phone: '+255 321 654 987',
      lastActive: '4 hours ago'
    },
    {
      id: 5,
      name: 'Peter Mollel',
      specialization: 'Irrigation Expert',
      rating: 4.6,
      reviews: 19,
      experience: '4 years',
      location: 'Dodoma Region',
      availability: 'Available',
      rate: 28,
      rateType: 'per day',
      skills: ['Irrigation', 'Water Management', 'System Installation', 'Maintenance'],
      languages: ['Swahili', 'English'],
      description: 'Specializes in drip irrigation and water conservation systems.',
      completedJobs: 63,
      image: 'PM',
      phone: '+255 789 123 456',
      lastActive: '1 day ago'
    },
    {
      id: 6,
      name: 'Sarah Massawe',
      specialization: 'Harvest Coordinator',
      rating: 4.8,
      reviews: 35,
      experience: '6 years',
      location: 'Morogoro Region',
      availability: 'Available',
      rate: 18,
      rateType: 'per day',
      skills: ['Harvesting', 'Post-Harvest Processing', 'Quality Control', 'Team Management'],
      languages: ['Swahili', 'English'],
      description: 'Expert in harvest timing and post-harvest processing for maximum quality.',
      completedJobs: 112,
      image: 'SM',
      phone: '+255 654 321 987',
      lastActive: '3 hours ago'
    }
  ];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all-skills' || worker.skills.includes(selectedSkill);
    const matchesRegion = selectedRegion === 'all-regions' || worker.location.includes(selectedRegion);
    return matchesSearch && matchesSkill && matchesRegion;
  });

  const handleHireWorker = (worker: any) => {
    console.log(`Initiated hiring process for ${worker.name}`);
    // This would open a hiring modal or navigate to a detailed hiring page
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-forest-800">Farm Workers Directory</h2>
        <p className="text-forest-600">Find and hire vetted agricultural professionals</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border-forest-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
              <Input
                placeholder="Search workers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-forest-200"
              />
            </div>
            <Select value={selectedSkill} onValueChange={(value) => {
              console.log('WorkerDirectory - Skill selected:', value);
              setSelectedSkill(value);
            }}>
              <SelectTrigger className="border-forest-200">
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-skills">All Skills</SelectItem>
                {skills.map((skill) => {
                  console.log('WorkerDirectory - Rendering SelectItem for skill:', skill, 'length:', skill.length, 'type:', typeof skill);
                  // Additional safety check before rendering
                  if (!skill || typeof skill !== 'string' || skill.trim() === '') {
                    console.error('WorkerDirectory - Skipping invalid skill:', skill);
                    return null;
                  }
                  return (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={(value) => {
              console.log('WorkerDirectory - Region selected:', value);
              setSelectedRegion(value);
            }}>
              <SelectTrigger className="border-forest-200">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-regions">All Regions</SelectItem>
                {regions.map((region) => {
                  console.log('WorkerDirectory - Rendering SelectItem for region:', region, 'length:', region.length, 'type:', typeof region);
                  // Additional safety check before rendering
                  if (!region || typeof region !== 'string' || region.trim() === '') {
                    console.error('WorkerDirectory - Skipping invalid region:', region);
                    return null;
                  }
                  return (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Button className="bg-forest-600 hover:bg-forest-700">
              Search Workers
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-forest-800">
            Available Workers ({filteredWorkers.length})
          </h3>
          <Select value={sortBy} onValueChange={(value) => {
            console.log('WorkerDirectory - Sort selected:', value);
            setSortBy(value);
          }}>
            <SelectTrigger className="w-40 border-forest-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="rate-low">Rate: Low to High</SelectItem>
              <SelectItem value="rate-high">Rate: High to Low</SelectItem>
              <SelectItem value="jobs">Most Jobs Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder-worker-${worker.id}.jpg`} />
                    <AvatarFallback className="bg-forest-100 text-forest-800 text-lg">
                      {worker.image}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-forest-800">{worker.name}</CardTitle>
                        <CardDescription className="text-forest-600">
                          {worker.specialization}
                        </CardDescription>
                      </div>
                      <Badge className={`${worker.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {worker.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-forest-800">{worker.rating}</span>
                        <span className="text-sm text-forest-600">({worker.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-forest-600" />
                        <span className="text-sm text-forest-600">{worker.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-forest-700">{worker.description}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-sm text-forest-600">Experience</p>
                    <p className="font-medium text-forest-800">{worker.experience}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-forest-600">Jobs Done</p>
                    <p className="font-medium text-forest-800">{worker.completedJobs}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-forest-600">Rate</p>
                    <p className="font-medium text-forest-800">${worker.rate}/{worker.rateType}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-medium text-forest-800 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-crop-50 border-crop-300 text-crop-700 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="font-medium text-forest-800 mb-2">Languages</h4>
                  <div className="flex space-x-2">
                    {worker.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="bg-earth-50 border-earth-300 text-earth-700 text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-forest-100 pt-3">
                  <div className="flex items-center justify-between text-sm text-forest-600 mb-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{worker.phone}</span>
                    </div>
                    <span>Last active: {worker.lastActive}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleHireWorker(worker)}
                      className="flex-1 bg-forest-600 hover:bg-forest-700"
                      disabled={worker.availability !== 'Available'}
                    >
                      {worker.availability === 'Available' ? 'Hire Now' : 'Currently Busy'}
                    </Button>
                    <Button variant="outline" className="border-forest-200">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Hire Section */}
      <Card className="bg-gradient-to-r from-forest-50 to-crop-50 border-forest-200">
        <CardHeader>
          <CardTitle className="text-forest-800">Need Workers Quickly?</CardTitle>
          <CardDescription>
            Our team can help you find the right workers for urgent farming needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-forest-700">
                • Get matched with available workers within 2 hours
              </p>
              <p className="text-sm text-forest-700">
                • Pre-vetted professionals with verified experience
              </p>
              <p className="text-sm text-forest-700">
                • 24/7 support for urgent farming operations
              </p>
            </div>
            <Button className="bg-crop-600 hover:bg-crop-700">
              Quick Hire Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerDirectory;
