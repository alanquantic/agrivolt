'use client'

import { useState } from 'react'

interface YouTubeVideoProps {
  videoId: string
  title?: string
}

export default function YouTubeVideo({ videoId, title = "Video de AgriVolt" }: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black cursor-pointer group" onClick={handlePlay}>
      {/* Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback a thumbnail de menor calidad si maxresdefault no existe
          const target = e.target as HTMLImageElement
          target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        }}
      />
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      
      {/* Botón de play personalizado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8 text-slate-900 ml-1"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Texto de play */}
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm font-medium">Haz clic para reproducir</p>
      </div>
    </div>
  )
}
