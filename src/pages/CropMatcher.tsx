
import CropMatcher from '@/components/CropMatcher';

const CropMatcherPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 to-crop-50">
      <div className="container mx-auto px-4 py-8">
        <CropMatcher />
      </div>
    </div>
  );
};

export default CropMatcherPage;
