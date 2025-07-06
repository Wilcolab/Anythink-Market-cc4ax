import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { trackSocialShare } from '../utils/analytics'

const SocialShareButtons = ({ score, total, percentage }) => {
  const [shareSuccess, setShareSuccess] = useState(false)
  
  // Generate enhanced share message with current URL
  const currentUrl = window.location.href
  const getShareMessage = (platform) => {
    const baseMessage = `I just scored ${score}/${total} (${percentage}%) on the 90s Fun Quiz!`
    const challenge = `Can you beat my score?`
    const emoji = percentage >= 90 ? '🏆' : percentage >= 80 ? '🎉' : percentage >= 70 ? '😊' : '📚'
    
    switch (platform) {
      case 'twitter':
        return `${baseMessage} ${emoji} ${challenge}`
      case 'linkedin':
        return `${baseMessage} This fun quiz tests your knowledge of 90s history and culture. ${challenge}`
      default:
        return `${baseMessage} ${emoji} ${challenge}`
    }
  }
  
  const hashtags = '90sQuiz,TriviaChallenge,90sNostalgia,QuizChallenge'

  // Enhanced social sharing URLs with platform-specific messages
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(getShareMessage('facebook'))}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage('twitter'))}&hashtags=${encodeURIComponent(hashtags)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&summary=${encodeURIComponent(getShareMessage('linkedin'))}`
  }

  const handleSocialShare = (platform) => {
    try {
      // Track the share attempt
      trackSocialShare(platform, score, percentage)
      
      window.open(shareUrls[platform], '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes')
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)
    } catch (error) {
      console.error('Error opening share window:', error)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-gray-800 mb-2">🚀 Share Your Achievement!</h4>
        <p className="text-gray-600 mb-1">
          Let your friends know about your {percentage >= 80 ? 'amazing' : percentage >= 60 ? 'great' : 'awesome'} score!
        </p>
        {shareSuccess && (
          <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mt-2 animate-fade-in">
            ✅ Share window opened!
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {/* Facebook Share Button */}
        <button
          onClick={() => handleSocialShare('facebook')}
          className="group flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          title="Share on Facebook"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-lg">Facebook</span>
        </button>

        {/* Twitter Share Button */}
        <button
          onClick={() => handleSocialShare('twitter')}
          className="group flex items-center space-x-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          title="Share on Twitter"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <span className="text-lg">Twitter</span>
        </button>

        {/* LinkedIn Share Button */}
        <button
          onClick={() => handleSocialShare('linkedin')}
          className="group flex items-center space-x-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          title="Share on LinkedIn"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span className="text-lg">LinkedIn</span>
        </button>
      </div>
      
      {/* Enhanced sharing tips */}
      <div className="text-center max-w-md">
        <p className="text-sm text-gray-500 mb-2">
          🎯 Share your score and challenge your friends to beat it!
        </p>
        <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
          <span>✨ Tip: Higher scores get special emojis in your posts!</span>
        </div>
      </div>
      
      {/* Score-based motivational message */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 text-center max-w-md">
        <p className="text-sm font-medium text-gray-700">
          {percentage >= 90 && "🏆 Incredible! You're a true 90s expert!"}
          {percentage >= 80 && percentage < 90 && "🎉 Excellent work! Your friends will be impressed!"}
          {percentage >= 70 && percentage < 80 && "😊 Great job! Share your knowledge with others!"}
          {percentage >= 60 && percentage < 70 && "📚 Nice score! Challenge your friends to do better!"}
          {percentage < 60 && "🎮 Good effort! Share and see if your friends can beat you!"}
        </p>
      </div>
    </div>
  )
}

SocialShareButtons.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired
}

export default SocialShareButtons
