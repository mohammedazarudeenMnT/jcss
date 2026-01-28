'use client';

import { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import Footer from '@/components/Footer/Footer';


interface LocationData {
  name: string;
  country: string;
  coordinates: [number, number];
  address: string;
  phone: string;
  fax: string;
}

export default function ContactUs() {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Handle scroll detection for custom scrollbar
  const handleScroll = () => {
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set new timeout to hide scrollbar
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Hide scrollbar 1 second after scrolling stops
  };
  
  const locations: LocationData[] = [
    { 
      name: 'Bangalore', 
      country: 'India', 
      coordinates: [77.5946, 12.9716], // Sankey Road area - correct
      address: '2nd Floor UniWorth Plaza, #20 Sankey Road, Bangalore -560020',
      phone: '+91 80 2334 7000',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Ahmedabad', 
      country: 'India', 
      coordinates: [72.5200, 23.0370], // More precise for Prahlad Nagar area
      address: 'No.805A, Pinnacle Business Park,Corporate Road, Prahlad Nagar, Ahmedabad - 380015' ,
      phone: '+91-44-42075580',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Chennai', 
      country: 'India', 
      coordinates: [80.2340, 13.0418], // More precise for T.Nagar area
      address: 'Mena Kempala Arcade, 7A, 7th floor, A Block, New No. 18 & 20 (Old No. 113), Sir Theeagaraya Road, T.Nagar, Chennai – 600 017',
      phone: '+91-44-42075580',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Gurgaon', 
      country: 'India', 
      coordinates: [77.0688, 28.4595], // More precise for Sector 21 area
      address: 'Unit no. 220, Suncity Trade Tower, Sector 21, Near Krishna Chowk Gurgaon-122001, India',
      phone: '+91-44-42075580',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Hyderabad', 
      country: 'India', 
      coordinates: [78.4089, 17.4126], // More precise for Jubilee Hills area
      address: 'SL Jubilee, 3rd Floor, Office No.304 Regus Eversun Business Centre Pvt Ltd, Plot No 1201 & 1215A, Road No.36 Jubile Hills, Hyderabad - 500034',
      phone: '+91-44-42075580',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Pune', 
      country: 'India', 
      coordinates: [73.8567, 18.5204], // Yerawada area - correct
      address: 'Office No. 611 to 617, Global Square, Deccan College Road, Yerawada, Pune, Maharashtra-411006',
      phone: '+91-44-42075580',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Singapore', 
      country: 'Singapore', 
      coordinates: [103.8501, 1.2830], // More precise for Cecil Street area
      address: 'The Octagon, 105 Cecil Street, # 13-01, Singapore — 069534',
      phone: '+65 3157 1767',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Tokyo', 
      country: 'Japan', 
      coordinates: [139.7595, 35.6681], // More precise for Minato-ku area
      address: 'Level 14, Hibiya Central Building, 1-2-9 Nishi Shimbashi, Minato-ku, Tokyo — 105-0003',
      phone: '+81 90 9232 5671',
      fax: '+91-44-42075581'
    },
    { 
      name: 'Jakarta', 
      country: 'Indonesia', 
      coordinates: [106.8294, -6.2297], // More precise for Kuningan area
      address: 'Menara Karya, Level 28, Jl. H R Rasuna Said, Kuningan, Jakarta, Indonesia 12950',
      phone: '+62 857 1913 3365',
      fax: '+91-44-42075581'
    }
  ];

  const handleMarkerClick = (location: LocationData) => {
    console.log('Marker clicked:', location.name); // Debug log
    setSelectedLocation(selectedLocation?.name === location.name ? null : location);
  };

  // Auto-close popup after 2 minutes
  useEffect(() => {
    if (selectedLocation) {
      const timer = setTimeout(() => {
        setSelectedLocation(null);
      }, 2 * 60 * 1000); // 2 minutes in milliseconds

      return () => clearTimeout(timer);
    }
  }, [selectedLocation]);

  // Function to calculate popup position based on coordinates
  const getPopupPosition = (coordinates: [number, number]) => {
    // Map projection settings
    const scale = 400;
    const centerLng = 90;
    const centerLat = 15;
    
    // Convert geographic coordinates to screen coordinates
    const x = ((coordinates[0] - centerLng) * scale / 360) + 50; // Approximate conversion
    const y = ((centerLat - coordinates[1]) * scale / 180) + 50; // Approximate conversion
    
    // Ensure popup stays within bounds and adjust position
    const popupWidth = 320; // 80 * 4 (w-80 = 320px)
    const popupHeight = 200;
    
    let left = Math.max(20, Math.min(x, window.innerWidth * 0.85 - popupWidth - 20));
    let top = Math.max(20, Math.min(y, window.innerHeight * 0.9 - popupHeight - 20));
    
    return { left: `${left}px`, top: `${top}px` };
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div id="contact-section" className="min-h-screen bg-[#042d4d] py-6">
        {/* Mobile Header */}
        <div className="text-center mb-6 px-4">
          <h1 className="text-2xl font-bold text-orange-400 mb-2">Contact Us</h1>
          <p className="text-white text-sm">Get in touch with our global offices</p>
        </div>

        {/* Location Cards */}
        <div className="px-4 space-y-4 mb-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-bold text-orange-400 mb-2">{location.name}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-white leading-relaxed">{location.address}</p>
                <div className="flex items-center gap-2 text-white">
                  <IconPhone size={16} />
                  <a href={`tel:${location.phone}`} className="hover:text-orange-400 transition-colors">
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <IconMail size={16} />
                  <a href="mailto:ask@jcssglobal.com" className="hover:text-orange-400 transition-colors">
                    ask@jcssglobal.com
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Section Card */}
        <div className="mx-4 bg-[#031a2b] rounded-lg p-4 border border-white/20">
          <h3 className="text-orange-400 font-semibold mb-3 text-center">Our Global Presence</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-orange-500 font-medium">India:</span>
              <span className="text-white ml-2">Bangalore, Ahmedabad, Chennai, Gurgaon, Hyderabad, Pune</span>
            </div>
            <div>
              <span className="text-orange-500 font-medium">Singapore:</span>
              <span className="text-white ml-2">Singapore</span>
            </div>
            <div>
              <span className="text-orange-500 font-medium">Japan:</span>
              <span className="text-white ml-2">Tokyo</span>
            </div>
            <div>
              <span className="text-orange-500 font-medium">Indonesia:</span>
              <span className="text-white ml-2">Jakarta</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tablet Layout
  if (isTablet) {
    return (
      <div id="contact-section" className="h-screen bg-[#042d4d] flex flex-col overflow-hidden">
        {/* Top Section - Map (75% of screen) */}
        <div className="h-[75vh] relative pt-20">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 420,
              center: [100, 15]
            }}
            width={800}
            height={500}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1e3a8a"
                    stroke="#1e40af"
                    strokeWidth={0.5}
                    style={{
                      default: { fill: "#1d4e77", outline: "none" },
                      hover: { fill: "#1d4e77", outline: "none" },
                      pressed: { fill: "#1d4e77", outline: "none" }
                    }}
                  />
                ))
              }
            </Geographies>
            
            {locations.map((location, index) => (
              <Marker key={index} coordinates={location.coordinates}>
                <g 
                  onClick={() => handleMarkerClick(location)}
                  style={{ cursor: 'pointer' }}
                  className="hover:scale-110 transition-transform duration-300"
                >
                  {/* Pin Marker */}
                  <g transform="translate(-8, -16)">
                    <path
                      d="M8 0C3.582 0 0 3.582 0 8c0 6 8 8 8 8s8-2 8-8c0-4.418-3.582-8-8-8z"
                      fill={selectedLocation?.name === location.name ? "#ea580c" : "#f97316"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <circle cx="8" cy="8" r="2" fill="#ffffff" />
                  </g>
                  
                  {/* City Name Label */}
                  <text
                    textAnchor="middle"
                    y={-20}
                    className="fill-white text-xs font-semibold"
                    style={{ 
                      fontSize: '10px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.8))'
                    }}
                  >
                    {location.name}
                  </text>
                  
                  {/* Country Name Label */}
                  {/* <text
                    textAnchor="middle"
                    y={-8}
                    className="fill-gray-300 text-xs"
                    style={{ 
                      fontSize: '8px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.8))'
                    }}
                  >
                    {location.country}
                  </text> */}
                </g>
              </Marker>
            ))}
          </ComposableMap>

          {/* Tablet Popup - Bottom Left Corner */}
          {selectedLocation && (
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 w-72 z-50">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-800 text-center">{selectedLocation.name}</h3>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-600 mb-2">{selectedLocation.address}</p>
                <div className="text-xs text-gray-600">
                  <div>Tel: {selectedLocation.phone}</div>
                  {/* <div>Fax: {selectedLocation.fax}</div> */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section - Contact Info (25% of screen) */}
        <div className="h-[25vh] bg-[#031a2b] p-4 overflow-y-auto">
          <div className="flex flex-col gap-3 h-full">
            {/* Contact Card */}
            <div className="bg-white/10 rounded-lg p-3 text-center shrink-0">
              <h3 className="text-orange-400 font-bold text-base mb-2">Contact Us</h3>
              <p className="text-white text-xs mb-2">2nd Floor, Dhiworth Plaza, # 20 Sankey Road, Bangalore – 560 020</p>
              <div className="flex justify-center gap-4 text-xs">
                <a href="tel:+918023347000" className="text-white hover:text-orange-400 flex items-center gap-1">
                  <IconPhone size={14} /> +91-80-23347000
                </a>
                <a href="mailto:ask@jcssglobal.com" className="text-white hover:text-orange-400 flex items-center gap-1">
                  <IconMail size={14} /> ask@jcssglobal.com
                </a>
              </div>
            </div>

            {/* Location Bar */}
            <div className="text-center text-xs shrink-0">
              <div className="flex flex-wrap justify-center gap-1 mb-1">
                <span className="text-orange-500 font-semibold">India:</span>
                <span className="text-white">Bangalore | Ahmedabad | Chennai | Gurgaon | Hyderabad | Pune</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                <span className="text-orange-500 font-semibold">Singapore</span>
                <span className="text-slate-500">|</span>
                <span className="text-orange-500 font-semibold">Japan:</span>
                <span className="text-white">Tokyo</span>
                <span className="text-slate-500">|</span>
                <span className="text-orange-500 font-semibold">Indonesia:</span>
                <span className="text-white">Jakarta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (Original)
  return (
    <div className="bg-[#042d4d]">
      {/* Main Contact Section */}
      <div id="contact-section" className="min-h-screen max-w-screen bg-[#042d4d] pt-22">
        {/* Top Section - 90% height */}
        <div className="h-[90vh] flex">
          {/* Left Section - 15% width - Address */}
          <div 
            className={`w-[15%] p-3 border-r border-white overflow-y-auto scroll-hidden ${isScrolling ? 'scrolling' : ''}`}
            onScroll={handleScroll}
          >
            <div className="flex flex-col gap-3">
              {/* Header */}
              <div className="text-center text-2xl font-bold text-orange-400 mb-2">
                Contact Us
              </div>
              
              {/* Main Address */}
              <div className="bg-white/10 rounded-lg p-3 text-center mb-3">
                <div className="text-white text-xs mb-2">
                  2nd Floor, Dhiworth Plaza, # 20 Sankey Road, Bangalore – 560 020
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+918023347000" className="text-white hover:text-orange-500 transition-colors flex items-center justify-center gap-1 text-xs">
                    <IconPhone size={12} /> +91-80-23347000
                  </a>
                  <a href="mailto:ask@jcssglobal.com" className="text-white hover:text-orange-500 transition-colors flex items-center justify-center gap-1 text-xs">
                    <IconMail size={12} /> ask@jcssglobal.com
                  </a>
                </div>
              </div>

              {/* All Locations Cards */}
              <div className="space-y-2">
                <h4 className="text-orange-400 font-semibold text-xs text-center mb-2">All Locations</h4>
                
                {/* Active Location at Top */}
                {selectedLocation && (
                  <div className="bg-white rounded-lg p-3 border-2 border-orange-400 shadow-lg animate-slide-down-slow animate-pulse-glow">
                    <div className="text-black font-bold text-sm mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
                      {selectedLocation.name}
                    </div>
                    <div className="text-gray-700 text-xs mb-2 leading-tight">{selectedLocation.address}</div>
                    <div className="flex flex-col gap-1">
                      <a 
                        href={`tel:${selectedLocation.phone}`} 
                        className="text-gray-700 hover:text-orange-600 transition-colors text-xs flex items-center gap-1"
                      >
                        <IconPhone size={10} /> {selectedLocation.phone}
                      </a>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 transition-colors text-xs flex items-center gap-1"
                      >
                        <IconMapPin size={10} /> View on Maps
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Other Locations */}
                {locations
                  .filter(location => !selectedLocation || location.name !== selectedLocation.name)
                  .map((location, index) => (
                  <div 
                    key={location.name} 
                    className="bg-white/5 rounded-lg p-2 border border-white/10 transition-all duration-700 ease-in-out hover:bg-white/10 transform"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animation: selectedLocation ? `fade-in-up 0.8s ease-out ${index * 0.1}s both` : 'none'
                    }}
                  >
                    <div className="text-white font-medium text-xs mb-1">{location.name}</div>
                    <div className="text-white/80 text-xs mb-2 leading-tight">{location.address}</div>
                    <div className="flex flex-col gap-1">
                      <a 
                        href={`tel:${location.phone}`} 
                        className="text-white/80 hover:text-orange-400 transition-colors text-xs flex items-center gap-1"
                      >
                        <IconPhone size={10} /> {location.phone}
                      </a>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 transition-colors text-xs flex items-center gap-1"
                      >
                        <IconMapPin size={10} /> View on Maps
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - 85% width - Map */}
          <div className="w-[85%] relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 500,
                center: [110, 20]
              }}
              width={200}
              height={600}
              style={{ width: '100%', height: '100%' }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1e3a8a"
                      stroke="#1e40af"
                      strokeWidth={0.5}
                      style={{
                        default: { fill: "#1d4e77", outline: "none" },
                        hover: { fill: "#1d4e77", outline: "none" },
                        pressed: { fill: "#1d4e77", outline: "none" }
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {/* Custom Location Markers */}
              {locations.map((location, index) => (
                <Marker key={index} coordinates={location.coordinates}>
                  <g 
                    onClick={() => handleMarkerClick(location)}
                    style={{ cursor: 'pointer' }}
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    {/* Custom Pin Marker */}
                    <g transform="translate(-12, -24)">
                      {/* Pin Shadow */}
                      <ellipse
                        cx="12"
                        cy="26"
                        rx="4"
                        ry="2"
                        fill="#000000"
                        fillOpacity={0.2}
                      />
                      
                      {/* Pin Body */}
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12c0 9 12 12 12 12s12-3 12-12c0-6.627-5.373-12-12-12z"
                        fill={selectedLocation?.name === location.name ? "#ea580c" : "#f97316"}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      
                      {/* Inner Circle */}
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="#ffffff"
                      />
                      
                      {/* Location Dot */}
                      <circle
                        cx="12"
                        cy="12"
                        r="2"
                        fill={selectedLocation?.name === location.name ? "#ea580c" : "#f97316"}
                      />
                    </g>
                    
                    {/* City Name Label */}
                    <text
                      textAnchor="middle"
                      y={-30}
                      className="fill-white text-sm font-bold"
                      style={{ 
                        fontSize: '12px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.8))'
                      }}
                    >
                      {location.name}
                    </text>
                    
                    {/* Country Name Label */}
                    {/* <text
                      textAnchor="middle"
                      y={-16}
                      className="fill-gray-300 text-xs"
                      style={{ 
                        fontSize: '10px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.8))'
                      }}
                    >
                      {location.country}
                    </text> */}
                    
                    {/* Pulsing Ring Animation */}
                    <circle
                      r="15"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                      className="animate-ping"
                    />
                  </g>
                </Marker>
              ))}
            </ComposableMap>

            {/* Location Details Popup - Bottom Left Corner */}
            {selectedLocation && (
              <div 
                className="absolute bottom-6 left-6 bg-white rounded-lg shadow-xl border border-gray-200 w-80 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 uppercase text-center">
                    {selectedLocation.name}
                  </h3>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  {/* Address */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedLocation.address}
                    </p>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Tel:</span> {selectedLocation.phone}
                    </div>
                    {/* <div className="text-sm text-gray-600">
                      <span className="font-medium">Fax:</span> {selectedLocation.fax}
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - 10% height */}
        <div className="h-[10vh] bg-[#031a2b] border-t border-white/10">
          {/* Bottom Location Bar */}
          <div className="px-6 py-6 border-t border-white/5 flex justify-center items-center">
            <div className="flex items-center gap-6 text-base">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-semibold">India:</span>
                <span className="text-white">Bangalore</span>
                <span className="text-slate-500">|</span>
                <span className="text-white">Ahmedabad</span>
                <span className="text-slate-500">|</span>
                <span className="text-white">Chennai</span>
                <span className="text-slate-500">|</span>
                <span className="text-white">Gurgaon</span>
                <span className="text-slate-500">|</span>
                <span className="text-white">Hyderabad</span>
                <span className="text-slate-500">|</span>
                <span className="text-white">Pune</span>
              </div>
              <div className="text-slate-500">|</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-semibold">Singapore</span>
              </div>
              <div className="text-slate-500">|</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-semibold">Japan:</span>
                <span className="text-white">Tokyo</span>
              </div>
              <div className="text-slate-500">|</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-semibold">Indonesia:</span>
                <span className="text-white">Jakarta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section - Now accessible by scrolling */}
      <Footer />
    </div>
  );
}
