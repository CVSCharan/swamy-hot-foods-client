import '../styles/SplashScreen.css';

export default function SplashScreen() {
  return (
    <div className="jets-container">
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="jets-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for sky background */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F6FF" />
          </linearGradient>

          {/* Smoke trail gradients */}
          <linearGradient id="saffronSmoke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF9933" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="whiteSmoke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="greenSmoke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#138808" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#138808" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#138808" stopOpacity="0" />
          </linearGradient>

          {/* Filter for smoke effect */}
          <filter id="smokeBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Sky background */}
        <rect width="100%" height="100%" fill="url(#skyGradient)" />

        {/* Clouds for atmosphere */}
        <g className="clouds">
          <ellipse
            cx="150"
            cy="80"
            rx="40"
            ry="20"
            fill="white"
            opacity="0.6"
            className="cloud cloud1"
          />
          <ellipse
            cx="600"
            cy="60"
            rx="50"
            ry="25"
            fill="white"
            opacity="0.5"
            className="cloud cloud2"
          />
          <ellipse
            cx="400"
            cy="90"
            rx="35"
            ry="18"
            fill="white"
            opacity="0.4"
            className="cloud cloud3"
          />
        </g>

        {/* Smoke trails */}
        <g className="smoke-trails">
          {/* Saffron smoke trail */}
          <path
            d="M200 500 Q250 450 300 400 Q350 350 400 300 Q450 250 500 200 Q550 150 600 100"
            stroke="url(#saffronSmoke)"
            strokeWidth="15"
            fill="none"
            filter="url(#smokeBlur)"
            className="smoke-trail saffron-trail"
          />

          {/* White smoke trail */}
          <path
            d="M250 500 Q300 450 350 400 Q400 350 450 300 Q500 250 550 200 Q600 150 650 100"
            stroke="url(#whiteSmoke)"
            strokeWidth="18"
            fill="none"
            filter="url(#smokeBlur)"
            className="smoke-trail white-trail"
          />

          {/* Green smoke trail */}
          <path
            d="M300 500 Q350 450 400 400 Q450 350 500 300 Q550 250 600 200 Q650 150 700 100"
            stroke="url(#greenSmoke)"
            strokeWidth="15"
            fill="none"
            filter="url(#smokeBlur)"
            className="smoke-trail green-trail"
          />
        </g>

        {/* Fighter Jets */}
        <g className="jets">
          {/* Jet 1 - Leading */}
          <g className="jet jet1">
            <polygon
              points="0,-8 -20,8 -15,12 -8,8 8,8 15,12 20,8"
              fill="#2C3E50"
              className="jet-body"
            />
            <polygon
              points="-25,8 -30,15 -20,12"
              fill="#34495E"
              className="jet-wing"
            />
            <polygon
              points="25,8 30,15 20,12"
              fill="#34495E"
              className="jet-wing"
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="#E74C3C"
              className="jet-cockpit"
            />
          </g>

          {/* Jet 2 - Center */}
          <g className="jet jet2">
            <polygon
              points="0,-8 -20,8 -15,12 -8,8 8,8 15,12 20,8"
              fill="#2C3E50"
              className="jet-body"
            />
            <polygon
              points="-25,8 -30,15 -20,12"
              fill="#34495E"
              className="jet-wing"
            />
            <polygon
              points="25,8 30,15 20,12"
              fill="#34495E"
              className="jet-wing"
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="#E74C3C"
              className="jet-cockpit"
            />
          </g>

          {/* Jet 3 - Trailing */}
          <g className="jet jet3">
            <polygon
              points="0,-8 -20,8 -15,12 -8,8 8,8 15,12 20,8"
              fill="#2C3E50"
              className="jet-body"
            />
            <polygon
              points="-25,8 -30,15 -20,12"
              fill="#34495E"
              className="jet-wing"
            />
            <polygon
              points="25,8 30,15 20,12"
              fill="#34495E"
              className="jet-wing"
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="#E74C3C"
              className="jet-cockpit"
            />
          </g>
        </g>

        {/* Additional smoke particles */}
        <g className="smoke-particles">
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={200 + i * 50}
              cy={350 - i * 25}
              r={3 + (i % 3)}
              fill={
                i % 3 === 0 ? "#FF9933" : i % 3 === 1 ? "#FFFFFF" : "#138808"
              }
              opacity="0.6"
              className="particle"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}