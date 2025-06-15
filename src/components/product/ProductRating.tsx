
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductRatingProps {
  productId: string;
}

interface Rating {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  user_id: string;
}

const ProductRating: React.FC<ProductRatingProps> = ({ productId }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState<Rating | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRatings();
    fetchUser();
  }, [productId]);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchRatings = async () => {
    const { data, error } = await supabase
      .from('product_ratings')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ratings:', error);
      return;
    }

    setRatings(data || []);
    
    // Check if current user has already rated
    if (user) {
      const userExistingRating = data?.find(r => r.user_id === user.id);
      setUserRating(userExistingRating || null);
      if (userExistingRating) {
        setNewRating(userExistingRating.rating);
        setNewReview(userExistingRating.review || '');
      }
    }
  };

  const handleSubmitRating = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to rate products",
        variant: "destructive",
      });
      return;
    }

    if (newRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const ratingData = {
        user_id: user.id,
        product_id: productId,
        rating: newRating,
        review: newReview.trim() || null,
      };

      let error;
      
      if (userRating) {
        // Update existing rating
        const { error: updateError } = await supabase
          .from('product_ratings')
          .update(ratingData)
          .eq('id', userRating.id);
        error = updateError;
      } else {
        // Create new rating
        const { error: insertError } = await supabase
          .from('product_ratings')
          .insert([ratingData]);
        error = insertError;
      }

      if (error) {
        console.error('Error submitting rating:', error);
        toast({
          title: "Error",
          description: "Failed to submit rating. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: userRating ? "Rating updated successfully!" : "Rating submitted successfully!",
      });

      fetchRatings();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
    : 0;

  const renderStars = (rating: number, interactive: boolean = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Ratings & Reviews</h3>
      
      {/* Average Rating */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-gray-800">
            {averageRating.toFixed(1)}
          </div>
          <div>
            {renderStars(Math.round(averageRating))}
            <p className="text-sm text-gray-600 mt-1">
              Based on {ratings.length} review{ratings.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* User Rating Form */}
      {user && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">
            {userRating ? 'Update your rating' : 'Rate this product'}
          </h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your rating
            </label>
            {renderStars(newRating, true, setNewRating)}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review (optional)
            </label>
            <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={3}
            />
          </div>

          <Button
            onClick={handleSubmitRating}
            disabled={isSubmitting || newRating === 0}
            className="bg-forest-600 hover:bg-forest-700"
          >
            {isSubmitting ? 'Submitting...' : userRating ? 'Update Rating' : 'Submit Rating'}
          </Button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {ratings.map((rating) => (
          <div key={rating.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              {renderStars(rating.rating)}
              <span className="text-sm text-gray-500">
                {new Date(rating.created_at).toLocaleDateString()}
              </span>
            </div>
            {rating.review && (
              <p className="text-gray-700">{rating.review}</p>
            )}
          </div>
        ))}
        
        {ratings.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No reviews yet. Be the first to rate this product!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductRating;
