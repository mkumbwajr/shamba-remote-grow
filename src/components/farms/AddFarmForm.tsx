
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

interface FarmFormData {
  name: string;
  location: string;
  size: number;
  size_unit: string;
  crop_type: string;
  status: string;
  start_date: string;
  end_date?: string;
  investment_amount?: number;
  expected_yield?: number;
  notes?: string;
}

const AddFarmForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FarmFormData>({
    defaultValues: {
      size_unit: 'acres',
      status: 'active'
    }
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: FarmFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a farm",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('farms')
        .insert([
          {
            ...data,
            user_id: user.id,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Farm created successfully!"
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating farm:', error);
      toast({
        title: "Error",
        description: "Failed to create farm. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farm Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Farm Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Farm name is required' })}
                  placeholder="Enter farm name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register('location')}
                  placeholder="Enter farm location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size *</Label>
                <Input
                  id="size"
                  type="number"
                  step="0.01"
                  {...register('size', { 
                    required: 'Size is required',
                    valueAsNumber: true,
                    min: { value: 0.01, message: 'Size must be greater than 0' }
                  })}
                  placeholder="Enter farm size"
                />
                {errors.size && (
                  <p className="text-sm text-red-600">{errors.size.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size_unit">Size Unit</Label>
                <Select defaultValue="acres" onValueChange={(value) => setValue('size_unit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="square_meters">Square Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop_type">Crop Type</Label>
                <Input
                  id="crop_type"
                  {...register('crop_type')}
                  placeholder="e.g., Maize, Coffee, Rice"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active" onValueChange={(value) => setValue('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  {...register('start_date')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  {...register('end_date')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment_amount">Investment Amount ($)</Label>
                <Input
                  id="investment_amount"
                  type="number"
                  step="0.01"
                  {...register('investment_amount', { valueAsNumber: true })}
                  placeholder="Enter investment amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected_yield">Expected Yield</Label>
                <Input
                  id="expected_yield"
                  type="number"
                  step="0.01"
                  {...register('expected_yield', { valueAsNumber: true })}
                  placeholder="Enter expected yield"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Add any additional notes about the farm"
                rows={4}
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Creating...' : 'Create Farm'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFarmForm;
