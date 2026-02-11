import { FaBolt, FaStar, FaShieldAlt, FaLock, FaServer } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 relative">
      <Helmet>
        <title>Videy Private Cloud - Restricted Access</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Private media storage. Access restricted to authorized users via direct link." />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 w-full">
        
        {/* Security Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/5 border border-red-500/10 text-red-500 text-xs font-bold tracking-widest uppercase mb-10 hover:bg-red-500/10 transition-colors cursor-default select-none">
          <FaLock size={12} />
          <span>Private Access Only</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight">
          Secure Media <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500 animate-gradient-x">
            Gateway
          </span>
        </h1>
        
        {/* Subtitle / Explanation */}
        <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed font-light">
          This platform is private. Content is accessible only via direct URL. 
          <br className="hidden sm:block" />
          Please use the secure link provided to you to begin streaming.
        </p>

        {/* Status Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/50 px-5 py-2.5 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-medium">System Operational</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/50 px-5 py-2.5 rounded-xl border border-white/5 backdrop-blur-sm">
            <FaServer className="text-zinc-500" />
            <span className="text-sm font-medium">Private Node</span>
          </div>
        </div>
      </div>

      {/* Feature Grid (Simplified for Private context) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-24 sm:mt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: FaShieldAlt,
              title: "Encrypted",
              desc: "End-to-end connection security for all streams.",
              color: "text-red-500",
              border: "group-hover:border-red-500/20"
            },
            {
              icon: FaBolt,
              title: "Low Latency",
              desc: "Direct peer routing ensures minimal buffer delay.",
              color: "text-orange-500",
              border: "group-hover:border-orange-500/20"
            },
            {
              icon: FaStar,
              title: "Lossless",
              desc: "Original quality preservation for authorized viewers.",
              color: "text-white",
              border: "group-hover:border-white/20"
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className={`group p-6 bg-zinc-900/20 border border-white/5 rounded-2xl transition-all duration-500 hover:bg-zinc-900/40 ${feature.border}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <feature.icon className={`text-xl ${feature.color}`} />
                <h3 className="text-lg font-bold text-zinc-200">{feature.title}</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center border-t border-white/5 pt-8">
           <p className="text-xs text-zinc-700 font-mono">
             ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} &bull; SECURE CONNECTION ESTABLISHED
           </p>
        </div>
      </div>
    </div>
  );
}