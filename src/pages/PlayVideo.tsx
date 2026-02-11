import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaDownload, FaPlay, FaExclamationCircle, FaSpinner, FaFire, FaClock, FaShareAlt, FaShieldAlt } from 'react-icons/fa';
import { useLayout } from '../context/LayoutContext';

declare global {
  interface Window {
    fluidPlayer?: (elementId: string, options?: any) => any;
  }
}

interface VideoData {
  id: string;
  Judul: string;
  Url: string;
}

const VideoCard = ({ video, onClick }: { video: VideoData; onClick: (id: string) => void }) => (
  <div 
    onClick={() => onClick(video.id)} 
    className="group cursor-pointer flex flex-col gap-3"
  >
    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-sm group-hover:shadow-red-900/20 group-hover:border-red-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      <video 
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
        preload="metadata" 
        muted
      >
        <source src={video.Url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
          <FaPlay className="text-white ml-1" size={16} />
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-white tracking-wider">
        HD
      </div>
    </div>
    <div className="flex flex-col gap-1.5 px-1">
      <h3 className="text-zinc-200 font-medium text-sm leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
        {video.Judul}
      </h3>
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <FaClock size={10} /> 
          <span>New Upload</span>
        </span>
      </div>
    </div>
  </div>
);

export function PlayVideo() {
  const { id: paramsId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const queryId = searchParams.get('v');
  const id = paramsId || queryId;

  const { setShowSearch } = useLayout();
  const playerInstance = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [blobUrl, setBlobUrl] = useState('');
  const [allVideos, setAllVideos] = useState<VideoData[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<VideoData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const adRedirect = useCallback(() => {
    const randomUrls = [
      'https://otieu.com/4/10209209',
      'https://plumprush.com/cY2po8',
      'https://viiukuhe.com/dc/?blockID=406304'
    ];
    const now = Date.now();
    const lastTime = sessionStorage.getItem('lastAdTime');
    const cooldown = 30000; 
    
    if (!lastTime || (now - parseInt(lastTime)) > cooldown) {
      const target = randomUrls[Math.floor(Math.random() * randomUrls.length)];
      window.open(target, '_blank');
      sessionStorage.setItem('lastAdTime', now.toString());
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      setShowSearch(false);
      try {
        const res = await fetch('https://raw.githubusercontent.com/AgungDevlop/Viral/refs/heads/main/Video.json');
        const data: VideoData[] = await res.json();
        
        if (isMounted) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setAllVideos(shuffled);

          if (id) {
            const target = data.find(v => v.id === id);
            if (target) {
              setVideoData(target);
              setShowSearch(true);
              
              try {
                const vidRes = await fetch(target.Url);
                if (!vidRes.ok) throw new Error('Network response was not ok');
                const blob = await vidRes.blob();
                const bUrl = URL.createObjectURL(blob);
                if (isMounted) setBlobUrl(bUrl);
              } catch (e) {
                if (isMounted) setBlobUrl(target.Url);
              }
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      setShowSearch(false);
      if (blobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [id, setShowSearch]);

  useEffect(() => {
    if (query) {
      const filtered = allVideos.filter(v => v.Judul.toLowerCase().includes(query.toLowerCase()));
      setDisplayedVideos(filtered);
    } else {
      setDisplayedVideos(allVideos);
    }
    setCurrentPage(1);
  }, [query, allVideos]);

  useEffect(() => {
    if (!blobUrl || !document.getElementById('video-player')) return;

    const initPlayer = () => {
      if (playerInstance.current) {
        try {
          playerInstance.current.destroy();
        } catch (e) { }
      }
      
      if (window.fluidPlayer) {
        playerInstance.current = window.fluidPlayer('video-player', {
          layoutControls: {
            controlBar: { autoHide: true, animated: true, autoHideTimeout: 3 },
            htmlOnPauseBlock: { html: null, height: null, width: null },
            autoPlay: false,
            mute: false,
            allowTheatre: true,
            playPauseAnimation: true,
            playbackRateEnabled: true,
            allowDownload: false,
            playButtonShowing: true,
            fillToContainer: true,
            primaryColor: "#ef4444",
            posterImage: ""
          }
        });
        
        const events = ['play', 'pause', 'seeked'];
        events.forEach(evt => {
          playerInstance.current.on(evt, adRedirect);
        });
      }
    };

    const timer = setTimeout(initPlayer, 100);

    return () => {
      clearTimeout(timer);
      if (playerInstance.current) {
        try {
          playerInstance.current.destroy();
        } catch (e) { }
      }
    };
  }, [blobUrl, adRedirect]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById('share-btn');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="text-green-400">Copied!</span>';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }
  };

  const handleDownload = () => {
    if (videoData) {
      sessionStorage.setItem('videoUrl', videoData.Url);
      sessionStorage.setItem('videoTitle', videoData.Judul);
      window.open('/download', '_blank');
      adRedirect();
    }
  };

  const handleCardClick = (vidId: string) => {
    window.open(`/play/${vidId}`, '_blank');
  };

  const paginate = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const currentItems = displayedVideos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(displayedVideos.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-zinc-400 gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
          <FaSpinner className="relative animate-spin text-5xl text-red-500" />
        </div>
        <p className="text-sm font-medium tracking-wide animate-pulse">Initializing Secure Stream...</p>
      </div>
    );
  }

  if (id && !videoData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Helmet>
          <title>Video Not Found - Videy Stream</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="bg-zinc-900/80 p-8 rounded-full mb-6 border border-zinc-800 shadow-2xl">
          <FaExclamationCircle size={48} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Content Unavailable</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
          The video you are looking for might have been removed or the link is invalid.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-white text-zinc-950 rounded-full font-bold hover:bg-zinc-200 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
      <Helmet>
        <title>{videoData ? `${videoData.Judul} - Videy Stream` : 'Trending Videos - Videy Stream'}</title>
        <meta name="description" content={videoData ? `Watch ${videoData.Judul} in HD. Fast streaming, no buffering.` : "Browse trending viral videos."} />
        <meta property="og:title" content={videoData ? videoData.Judul : 'Videy Stream'} />
        <meta property="og:type" content="video.movie" />
      </Helmet>

      {videoData && (
        <div className="mb-16 animate-fade-in">
          <div className="relative group rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black ring-1 ring-white/10">
            <div className="aspect-video w-full">
              <video id="video-player" className="w-full h-full">
                <source src={blobUrl} type="video/mp4" />
              </video>
            </div>
          </div>
            
          <div className="mt-6 p-6 bg-zinc-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
              {videoData.Judul}
            </h1>
              
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-t border-white/5 pt-6">
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button 
                  onClick={handleDownload}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 active:scale-95"
                >
                  <FaDownload /> 
                  <span>Download Video</span>
                </button>
                <button 
                  id="share-btn"
                  onClick={handleCopy}
                  className="flex-none px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl transition-colors border border-zinc-700/50 font-medium flex items-center gap-2"
                >
                  <FaShareAlt />
                  <span>Share</span>
                </button>
              </div>
                
              <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Stream Ready
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt /> Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
          <div className="p-2.5 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/20">
            <FaFire className="text-red-500 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {query ? `Search Results: "${query}"` : (id ? 'Recommended For You' : 'Trending Now')}
          </h2>
        </div>

        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map(video => (
              <VideoCard key={video.id} video={video} onClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-zinc-500 text-lg font-medium">No videos found matching your criteria.</p>
            <button 
              onClick={() => setShowSearch(false)} 
              className="mt-4 text-red-400 hover:text-red-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-16">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all font-medium"
            >
              Previous
            </button>
            <div className="px-6 py-2.5 bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-sm rounded-lg flex items-center shadow-inner">
              Page <span className="text-white font-bold mx-1">{currentPage}</span> of {totalPages}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}