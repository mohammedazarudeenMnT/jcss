'use client';

import Image from 'next/image';

export default function Experience() {
  const caseStudies = [
    {
      id: 1,
      title: "Forensic Accounting Case Studies",
      subtitle: "Uncovering fraud and corruption in complex scenarios and high risk environments",
      description: "Forensic accounting cases are available to higher education faculty and cover a broad array of topics including payroll, claims management, sales commission fraud, procurement fraud, asset misappropriation, tax fraud, sales fraud and FCPA investigations.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
      category: "Forensic Accounting"
    },
    {
      id: 2,
      title: "Predicting the unpredictable",
      subtitle: "How will technology change the future of work?",
      description: "The future is an unexplored frontier, and our intuitions about what we'll find there are often wrong. Christopher Columbus famously thought that he was establishing a new trade route to the Indies when he stumbled across the Americas. Similarly, predictions about the future of work typically bear little resemblance to the actual future.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
      category: "Future of Work"
    },
    {
      id: 3,
      title: "Generative AI in Asia Pacific",
      subtitle: "Young employees lead as employers play catch-up",
      description: "Generative artificial intelligence is the topic of conversation for senior business leaders across all industries and geographies. It's exploded on the agenda with the introduction of applications like ChatGPT, Gemini, Midjourney, Claude, and GitHub Copilot alongside software vendors incorporating gen AI capabilities into their products.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
      category: "Artificial Intelligence"
    },
    {
      id: 4,
      title: "A burgeoning 'AI-generated' market",
      subtitle: "AI insurance could be a nearly US$5 billion market in eight years, according to Deloitte US",
      description: "Generative artificial intelligence is the topic of conversation for senior business leaders across all industries and geographies. It's exploded on the agenda with the introduction of applications like ChatGPT, Gemini, Midjourney, Claude, and GitHub Copilot alongside software vendors incorporating gen AI capabilities into their products.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
      category: "AI Insurance"
    }
  ];

  return (
    <div className="relative min-h-full w-full" style={{ backgroundColor: '#1d4e77' }}>
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/exp.jpg"
          alt="Experience Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/40"></div> */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-28 sm:pt-24 lg:pt-32 pb-6 sm:pb-8">
        <div className="max-w-7xl w-full">
          {/* Case Studies Grid */}
          <div className="space-y-4 sm:space-y-6">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className="bg-white bg-opacity-95 rounded-xl sm:rounded-2xl shadow-xl animate-fade-in-up flex flex-col sm:flex-row overflow-hidden min-h-[200px] sm:h-48 lg:h-56"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image - Responsive width */}
                <div className="relative w-full sm:w-2/5 lg:w-1/4 shrink-0">
                  <div className="w-full h-48 sm:h-full">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full bg-linear-to-br from-gray-300 to-gray-400 items-center justify-center text-gray-600 text-xs">
                      Case Image
                    </div>
                  </div>
                </div>

                {/* Content - Responsive width */}
                <div className="w-full sm:w-3/5 lg:w-2/3 p-4 sm:p-5 lg:p-6 flex flex-col justify-center">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-500 mb-2 sm:mb-1 leading-tight">
                    {study.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-2 sm:mb-2 leading-tight">
                    {study.subtitle}
                  </h4>
                  
                  {/* Orange line */}
                  <div className="w-full h-0.5 bg-orange-500 mb-2 sm:mb-3"></div>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {study.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}