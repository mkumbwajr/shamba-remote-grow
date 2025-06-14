
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { NewsArticle } from '@/hooks/useNews';
import NewsCommentSection from './NewsCommentSection';

interface NewsArticleCardProps {
  article: NewsArticle;
}

const NewsArticleCard = ({ article }: NewsArticleCardProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'partnership':
        return 'bg-blue-100 text-blue-800';
      case 'testimonial':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'partnership':
        return String(t('partnerships'));
      case 'testimonial':
        return String(t('testimonials'));
      case 'update':
        return String(t('updates'));
      default:
        return category;
    }
  };

  const shouldShowReadMore = article.content.length > 300;
  const displayContent = isExpanded || !shouldShowReadMore 
    ? article.content 
    : `${article.content.substring(0, 300)}...`;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Article Image */}
        {article.image_url && (
          <div className="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="p-6">
          {/* Category Badge */}
          <Badge className={`mb-3 ${getCategoryColor(article.category)}`}>
            {getCategoryLabel(article.category)}
          </Badge>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {article.title}
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-sm max-w-none mb-4">
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {displayContent}
            </div>
            
            {shouldShowReadMore && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    {String(t('readLess'))}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {String(t('readMore'))}
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{String(t('publishedBy'))} {article.author_name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {String(t('publishedOn'))} {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {String(t('comments'))}
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <NewsCommentSection articleId={article.id} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsArticleCard;
