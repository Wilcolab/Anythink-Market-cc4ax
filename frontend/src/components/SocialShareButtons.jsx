import React, { useState } from 'react'

const SocialShareButtons = ({ score, total, percentage }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  // Generate share content
  const shareText = `I just scored ${score}/${total} (${percentage}%) on the 90s Fun Quiz! 🎉 Test your 90s knowledge too!`
  const shareUrl = window.location.origin || 'https://90s-quiz-app.com'
  
  // Social media share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
  }

  const handleShare = (platform) => {
    setSelectedPlatform(platform)
    setShowPreview(true)
  }

  const confirmShare = () => {
    const url = shareUrls[selectedPlatform]
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
    setShowPreview(false)
    setSelectedPlatform(null)
  }

  const handleFallbackShare = () => {
    if (navigator.share) {
      navigator.share({ 
        text: shareText,
        url: shareUrl
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        .then(() => alert('Share text copied to clipboard!'))
        .catch(() => alert('Unable to copy. Please share manually.'))
    }
  }

  return (
    <div className="space-y-4">
      {/* Share Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          Twitter
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>
      </div>

      {/* Fallback Share Button */}
      <div className="text-center">
        <button
          onClick={handleFallbackShare}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          📱 Use device sharing / Copy to clipboard
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-xl p-6 mx-4 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Share to {selectedPlatform?.charAt(0).toUpperCase() + selectedPlatform?.slice(1)}
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Preview:</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{shareText}</p>
              <p className="text-blue-600 text-sm mt-2">{shareUrl}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmShare}
                className="flex-1 btn-primary"
              >
                Share Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialShareButtons
