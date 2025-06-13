
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, TrendingUp, Users, MapPin, Calendar, Leaf, DollarSign, Settings, User, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CropMatcher from '@/components/CropMatcher';
import Marketplace from '@/components/Marketplace';
import LandRental from '@/components/LandRental';
import WorkerDirectory from '@/components/WorkerDirectory';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { formatTzsAmount } from '@/utils/currency';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching profile for user:', user.id);
      // Note: This will need to be updated once the database tables are properly set up
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock user data - replace with actual profile data
  const mockUser = {
    name: profile?.full_name || 'User',
    country: profile?.country || 'Unknown',
    preferredCrop: profile?.preferred_crop || 'Maize',
    activeFarms: 2,
    totalInvestment: 5000,
    expectedHarvest: '2024-08-15'
  };

  const farmUpdates = [
    {
      id: 1,
      farm: 'Kilimanjaro Valley Plot A',
      crop: 'Maize',
      stage: 'Flowering',
      progress: 65,
      weather: 'Favorable',
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      farm: 'Arusha Plains Plot B',
      crop: 'Tomatoes',
      stage: 'Fruit Development',
      progress: 80,
      weather: 'Monitoring rainfall',
      lastUpdate: '5 hours ago'
    }
  ];

  const marketAlerts = [
    {
      crop: 'Maize',
      price: 450,
      trend: 'up',
      change: '+5.2%'
    },
    {
      crop: 'Tomatoes',
      price: 850,
      trend: 'down',
      change: '-2.1%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50">
      {/* Header */}
      <header className="bg-white border-b border-forest-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-br from-forest-600 to-crop-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-forest-800">Bwana Shamba AI</h1>
                <p className="text-sm text-forest-600">Remote Farming Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-crop-100 border-crop-300">
                <MapPin className="h-3 w-3 mr-1" />
                {mockUser.country} Operations
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-forest-100">
                        {mockUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Active Farms</p>
                  <p className="text-2xl font-bold text-forest-800">{mockUser.activeFarms}</p>
                </div>
                <div className="h-12 w-12 bg-forest-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-forest-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Total Investment</p>
                  <p className="text-2xl font-bold text-forest-800">{formatTzsAmount(mockUser.totalInvestment)}</p>
                </div>
                <div className="h-12 w-12 bg-crop-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-crop-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Workers Hired</p>
                  <p className="text-2xl font-bold text-forest-800">8</p>
                </div>
                <div className="h-12 w-12 bg-earth-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-earth-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Next Harvest</p>
                  <p className="text-lg font-bold text-forest-800">45 days</p>
                </div>
                <div className="h-12 w-12 bg-crop-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-crop-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="bg-white border border-forest-200">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="crops">Crop Matcher</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="land">Land Rental</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Farm Updates */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-800">Farm Updates</CardTitle>
                  <CardDescription>Real-time progress from your farms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {farmUpdates.map((farm) => (
                    <div key={farm.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-forest-800">{farm.farm}</h4>
                          <p className="text-sm text-forest-600">{farm.crop} • {farm.stage}</p>
                        </div>
                        <Badge variant="outline" className="bg-crop-50 border-crop-300">
                          {farm.progress}%
                        </Badge>
                      </div>
                      <Progress value={farm.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-forest-500">
                        <span>{farm.weather}</span>
                        <span>{farm.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Market Intelligence */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-800">Market Intelligence</CardTitle>
                  <CardDescription>Current crop prices and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-earth-50 border border-earth-200">
                      <div>
                        <h4 className="font-medium text-earth-800">{alert.crop}</h4>
                        <p className="text-lg font-bold text-earth-900">{formatTzsAmount(alert.price)}/ton</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`h-4 w-4 ${alert.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-sm font-medium ${alert.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {alert.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-forest-700">Seeds planted in Kilimanjaro Valley Plot A</span>
                    <span className="text-xs text-forest-500 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-forest-700">Fertilizer applied to Arusha Plains Plot B</span>
                    <span className="text-xs text-forest-500 ml-auto">4 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-forest-700">Weather alert: Heavy rainfall expected</span>
                    <span className="text-xs text-forest-500 ml-auto">1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crops">
            <CropMatcher />
          </TabsContent>

          <TabsContent value="marketplace">
            <Marketplace />
          </TabsContent>

          <TabsContent value="land">
            <LandRental />
          </TabsContent>

          <TabsContent value="workers">
            <WorkerDirectory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
