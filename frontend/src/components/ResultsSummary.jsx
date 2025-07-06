import React from 'react'

const ResultsSummary = ({ results, onRestart }) => {
  const { score, total, percentage, results: questionResults } = results

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreEmoji = () => {
    if (percentage >= 90) return '🏆'
    if (percentage >= 80) return '🎉'
    if (percentage >= 70) return '😊'
    if (percentage >= 60) return '😐'
    return '😅'
  }

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a 90s expert!"
    if (percentage >= 80) return "Excellent! You really know your 90s!"
    if (percentage >= 70) return "Great job! You have good 90s knowledge!"
    if (percentage >= 60) return "Not bad! You know some 90s trivia!"
    return "Keep learning! The 90s were amazing!"
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-8 animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{getScoreEmoji()}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-600">{getPerformanceMessage()}</p>
        </div>

        {/* Score Summary */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8">
          <div className="text-center">
            <div className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{total}
            </div>
            <div className={`text-3xl font-semibold mb-2 ${getScoreColor()}`}>
              {percentage}%
            </div>
            <p className="text-gray-600">
              You got {score} out of {total} questions correct!
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 Detailed Results
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {questionResults.map((result, index) => (
              <div 
                key={result.question_id}
                className={`p-4 rounded-lg border-l-4 ${
                  result.is_correct 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold text-gray-500 mr-3">
                        Q{index + 1}
                      </span>
                      <span className={`text-lg ${result.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                        {result.is_correct ? '✅' : '❌'}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 font-medium mb-3">
                      {result.question}
                    </p>
                    
                    <div className="text-sm space-y-1">
                      {result.user_answer !== null ? (
                        <div>
                          <span className="font-semibold text-gray-600">Your answer: </span>
                          <span className={result.is_correct ? 'text-green-600' : 'text-red-600'}>
                            {result.question.options ? result.question.options[result.user_answer] : 'Invalid answer'}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-gray-500 italic">No answer provided</span>
                        </div>
                      )}
                      
                      {!result.is_correct && (
                        <div>
                          <span className="font-semibold text-gray-600">Correct answer: </span>
                          <span className="text-green-600">{result.correct_option}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Success Rate Badge */}
                  <div className="ml-4 text-center">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                      <div className="text-sm font-bold text-blue-600">
                        {result.success_rate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6 justify-center">
          <button
            onClick={onRestart}
            className="btn-primary text-lg px-8 py-4 mx-auto"
          >
            🔄 Try Again
          </button>
          
          {/* Social Share Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">
              📤 Share Your Results
            </h4>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Facebook Share */}
              <button
                onClick={() => {
                  const shareText = `I just scored ${score}/${total} (${percentage}%) on the 90s Fun Quiz! 🎉 Can you beat my score?`;
                  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                  window.open(facebookUrl, '_blank', 'width=600,height=400');
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              {/* Twitter Share */}
              <button
                onClick={() => {
                  const shareText = `I just scored ${score}/${total} (${percentage}%) on the 90s Fun Quiz! 🎉 Can you beat my score?`;
                  const hashtags = '90sQuiz,Quiz,90s,Challenge';
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&hashtags=${encodeURIComponent(hashtags)}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(twitterUrl, '_blank', 'width=600,height=400');
                }}
                className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </button>

              {/* LinkedIn Share */}
              <button
                onClick={() => {
                  const shareText = `I just scored ${score}/${total} (${percentage}%) on the 90s Fun Quiz! 🎉 Test your 90s knowledge and see if you can beat my score!`;
                  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(shareText)}`;
                  window.open(linkedinUrl, '_blank', 'width=600,height=400');
                }}
                className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>

            {/* Fallback Copy Button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  const text = `I just scored ${score}/${total} (${percentage}%) on the 90s Fun Quiz! 🎉`;
                  if (navigator.share) {
                    navigator.share({ 
                      title: '90s Fun Quiz Results',
                      text: text,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(`${text} ${window.location.href}`);
                    alert('Score and link copied to clipboard!');
                  }
                }}
                className="text-gray-600 hover:text-gray-800 text-sm underline transition-colors duration-200"
              >
                � Copy to Clipboard
              </button>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎯 Challenge your friends to beat your score!</p>
          <p className="mt-1">✨ The 90s were truly a magical decade!</p>
        </div>
      </div>
    </div>
  )
}

export default ResultsSummary 