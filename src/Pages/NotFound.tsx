import { Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NextJS404Page = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
            {/* Animated SVG Background */}
            <svg
                className="absolute inset-0 w-full h-full z-0 opacity-30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 810"
                preserveAspectRatio="xMinYMin slice"
            >
                {/* Animated Geometric Shapes */}
                <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                        <stop offset="100%" stopColor="rgba(99,102,241,0.1)" />
                    </linearGradient>
                </defs>

                {/* Floating Triangles */}
                <g className="animate-float-slow">
                    <path
                        d="M-100 600 L200 400 L500 600 Z"
                        fill="url(#blueGradient)"
                        transform="rotate(45 200 500)"
                    />
                    <path
                        d="M1300 200 L1600 0 L1900 200 Z"
                        fill="url(#blueGradient)"
                        transform="rotate(-30 1600 100)"
                    />
                </g>

                {/* Rotating Circles */}
                <g className="animate-rotate">
                    <circle
                        cx="200"
                        cy="100"
                        r="50"
                        fill="rgba(99,102,241,0.1)"
                    />
                    <circle
                        cx="1200"
                        cy="700"
                        r="70"
                        fill="rgba(59,130,246,0.1)"
                    />
                </g>

                {/* Wavy Lines */}
                <path
                    d="M0 400 Q360 300, 720 400 Q1080 500, 1440 400"
                    fill="none"
                    stroke="rgba(59,130,246,0.2)"
                    strokeWidth="2"
                    className="animate-wave"
                />
                <path
                    d="M0 500 Q360 400, 720 500 Q1080 600, 1440 500"
                    fill="none"
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="2"
                    className="animate-wave-delayed"
                />
            </svg>

            {/* Content Container */}
            <div className="relative z-10 text-center max-w-xl w-full">
                {/* Error Code */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="text-4xl font-bold text-gray-600">404</div>
                    <div className="h-12 w-px bg-gray-700"></div>
                    <div className="text-lg text-gray-400">Page Not Found</div>
                </div>

                {/* Main Message */}
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                    Looks like you've lost your way
                </h1>

                {/* Description */}
                <p className="text-gray-400 mb-8 text-lg">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/"
                        className="group flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 ease-in-out"
                    >
                        <Home className="text-gray-300 group-hover:text-white transition-colors" size={20} />
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                            Go Home
                        </span>
                    </Link>
                    <Link
                        to="/"
                        className="group flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                    >
                        <span className="text-white">Contact Support</span>
                        <ArrowRight
                            className="text-white transform group-hover:translate-x-1 transition-transform"
                            size={20}
                        />
                    </Link>
                </div>
            </div>

            {/* Subtle Noise Texture */}
            <div className="fixed inset-0 opacity-20 pointer-events-none z-0 bg-noise"></div>
        </div>
    );
};

export default NextJS404Page;