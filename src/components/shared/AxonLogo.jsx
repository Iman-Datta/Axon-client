const AxonLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="axon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" /> {/* Adjusted to lighter blue for dark mode */}
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
    <line x1="60" y1="10" x2="15" y2="95" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="60" y1="10" x2="105" y2="95" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="15" y1="95" x2="105" y2="95" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="60" y1="10" x2="37" y2="52" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="60" y1="10" x2="83" y2="52" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="37" y1="52" x2="15" y2="95" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="83" y1="52" x2="105" y2="95" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <line x1="37" y1="52" x2="83" y2="52" stroke="url(#axon-grad)" strokeWidth="3.5" />
    <circle cx="60" cy="10" r="5" fill="#3b82f6" />
    <circle cx="15" cy="95" r="6" fill="#2563eb" />
    <circle cx="105" cy="95" r="6" fill="#14b8a6" />
    <circle cx="37" cy="52" r="5" fill="#2563eb" />
    <circle cx="83" cy="52" r="5" fill="#0d9488" />
    <circle cx="60" cy="62" r="11" fill="#0f172a" stroke="url(#axon-grad)" strokeWidth="2.5" />
    <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="#ffffff">
      <line x1="57" y1="57" x2="57" y2="67" />
      <path d="M57 67 C 57 61, 63 61, 63 58" fill="none" />
      <circle cx="57" cy="56" r="1.5" />
      <circle cx="57" cy="68" r="1.5" />
      <circle cx="63" cy="57" r="1.5" />
    </g>
  </svg>
);

export default AxonLogo