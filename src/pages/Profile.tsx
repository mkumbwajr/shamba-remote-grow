
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, MapPin, Phone, Leaf, Calendar, Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string | null;
  country: string | null;
  phone: string | null;
  preferred_crop: string | null;
  farming_experience: string | null;
  farm_size: string | null;
  created_at: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    full_name: '',
    country: '',
    phone: '',
    preferred_crop: '',
    farming_experience: '',
    farm_size: ''
  });

  const countries = [
    'Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'Ethiopia', 'South Sudan'
  ];

  const crops = [
    'Maize', 'Rice', 'Beans', 'Tomatoes', 'Onions', 'Carrots', 'Cabbage', 'Coffee', 'Tea'
  ];

  const experienceLevels = [
    'Beginner (0-2 years)', 'Intermediate (3-5 years)', 'Advanced (6-10 years)', 'Expert (10+ years)'
  ];

  const farmSizes = [
    'Small (0-2 acres)', 'Medium (3-10 acres)', 'Large (11-50 acres)', 'Very Large (50+ acres)'
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error('Failed to load profile');
        console.error('Profile fetch error:', error);
      } else {
        setProfile(data);
        setEditData({
          full_name: data.full_name || '',
          country: data.country || '',
          phone: data.phone || '',
          preferred_crop: data.preferred_crop || '',
          farming_experience: data.farming_experience || '',
          farm_size: data.farm_size || ''
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editData.full_name,
          country: editData.country,
          phone: editData.phone,
          preferred_crop: editData.preferred_crop,
          farming_experience: editData.farming_experience,
          farm_size: editData.farm_size,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Failed to update profile');
        console.error('Profile update error:', error);
      } else {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        fetchProfile();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || '',
        country: profile.country || '',
        phone: profile.phone || '',
        preferred_crop: profile.preferred_crop || '',
        farming_experience: profile.farming_experience || '',
        farm_size: profile.farm_size || ''
      });
    }
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50">
      {/* Header */}
      <header className="bg-white border-b border-forest-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-forest-600 hover:text-forest-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-forest-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-forest-100 text-forest-700 text-xl">
                    {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl text-forest-800">
                {profile?.full_name || 'Your Profile'}
              </CardTitle>
              <CardDescription>
                Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-forest-800">Profile Information</h3>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-forest-600 border-forest-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="text-gray-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-forest-600 hover:bg-forest-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={editData.full_name}
                      onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={editData.country} 
                      onValueChange={(value) => setEditData(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferred_crop">Preferred Crop</Label>
                    <Select 
                      value={editData.preferred_crop} 
                      onValueChange={(value) => setEditData(prev => ({ ...prev, preferred_crop: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farming_experience">Farming Experience</Label>
                    <Select 
                      value={editData.farming_experience} 
                      onValueChange={(value) => setEditData(prev => ({ ...prev, farming_experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farm_size">Farm Size</Label>
                    <Select 
                      value={editData.farm_size} 
                      onValueChange={(value) => setEditData(prev => ({ ...prev, farm_size: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {farmSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-forest-600" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium">{profile?.full_name || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-forest-600" />
                      <div>
                        <p className="text-sm text-gray-600">Country</p>
                        <p className="font-medium">{profile?.country || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-forest-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Leaf className="h-5 w-5 text-crop-600" />
                      <div>
                        <p className="text-sm text-gray-600">Preferred Crop</p>
                        {profile?.preferred_crop ? (
                          <Badge variant="outline" className="bg-crop-50 border-crop-300">
                            {profile.preferred_crop}
                          </Badge>
                        ) : (
                          <p className="font-medium">Not provided</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-earth-600" />
                      <div>
                        <p className="text-sm text-gray-600">Experience</p>
                        {profile?.farming_experience ? (
                          <Badge variant="outline" className="bg-earth-50 border-earth-300">
                            {profile.farming_experience}
                          </Badge>
                        ) : (
                          <p className="font-medium">Not provided</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-forest-600" />
                      <div>
                        <p className="text-sm text-gray-600">Farm Size</p>
                        {profile?.farm_size ? (
                          <Badge variant="outline" className="bg-forest-50 border-forest-300">
                            {profile.farm_size}
                          </Badge>
                        ) : (
                          <p className="font-medium">Not provided</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
