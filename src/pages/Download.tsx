import { useEffect, useState } from 'react';
import { FaDownload, FaFileVideo, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function Download() {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(true);

  const randomUrls = [
    'https://otieu.com/4/10209209',
    'https://plumprush.com/cY2po8',
    'https://viiukuhe.com/dc/?blockID=406304'
  ];

  useEffect(() => {
    const url = sessionStorage.getItem('videoUrl');
    const title = sessionStorage.getItem('videoTitle');
    setVideoUrl(url);
    setVideoTitle(title);

    const timer = setTimeout(() => setPreparing(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleDownload = () => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.target = '_blank';
      link.download = videoTitle || 'video';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.location.href = randomUrl;
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] p-4">
      <div className="relative w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-zinc-400 hover:text-white transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
            <div className="relative bg-zinc-950 p-6 rounded-full border border-zinc-800 shadow-xl">
              <FaFileVideo size={40} className="text-red-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-3">
            {preparing ? 'Preparing Download...' : 'Ready to Download'}
          </h1>
          
          <p className="text-zinc-400 text-sm mb-8 px-4 line-clamp-2">
            {videoTitle || 'Unknown Video Title'}
          </p>

          <div className="w-full space-y-4">
            {videoUrl ? (
              <button
                onClick={handleDownload}
                disabled={preparing}
                className={`w-full py-4 px-6 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${
                  preparing 
                    ? 'bg-zinc-800 cursor-wait opacity-70' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:shadow-red-500/25 transform active:scale-[0.98]'
                }`}
              >
                <FaDownload className={`mr-3 text-lg ${preparing ? 'animate-bounce' : ''}`} />
                {preparing ? 'Please wait...' : 'Download High Quality'}
              </button>
            ) : (
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-red-200 text-sm">
                Download link expired or invalid. Please try again.
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-6">
              <FaShieldAlt className="text-zinc-600" />
              <span>Secure, Fast & Free Download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}