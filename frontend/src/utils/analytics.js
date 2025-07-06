// Simple analytics helper for tracking social shares
export const trackSocialShare = (platform, score, percentage) => {
  try {
    // Log to console for development (in production, this could send to analytics service)
    console.log(`Social Share - Platform: ${platform}, Score: ${score}, Percentage: ${percentage}%`)
    
    // Store in localStorage for simple tracking
    const shareData = {
      platform,
      score,
      percentage,
      timestamp: new Date().toISOString(),
      url: window.location.href
    }
    
    // Get existing shares
    const existingShares = JSON.parse(localStorage.getItem('quizShares') || '[]')
    existingShares.push(shareData)
    
    // Keep only last 50 shares
    if (existingShares.length > 50) {
      existingShares.shift()
    }
    
    localStorage.setItem('quizShares', JSON.stringify(existingShares))
    
    return true
  } catch (error) {
    console.error('Error tracking social share:', error)
    return false
  }
}

export const getShareStats = () => {
  try {
    const shares = JSON.parse(localStorage.getItem('quizShares') || '[]')
    const stats = {
      total: shares.length,
      byPlatform: {},
      averageScore: 0,
      highScore: 0
    }
    
    if (shares.length > 0) {
      shares.forEach(share => {
        stats.byPlatform[share.platform] = (stats.byPlatform[share.platform] || 0) + 1
        stats.averageScore += share.score
        stats.highScore = Math.max(stats.highScore, share.score)
      })
      
      stats.averageScore = Math.round(stats.averageScore / shares.length)
    }
    
    return stats
  } catch (error) {
    console.error('Error getting share stats:', error)
    return { total: 0, byPlatform: {}, averageScore: 0, highScore: 0 }
  }
}
