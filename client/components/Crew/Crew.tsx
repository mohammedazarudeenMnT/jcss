'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IconBrandLinkedinFilled } from '@tabler/icons-react';
import { teamMembers } from './teamData';




const Crew: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  const handleCardClick = (memberId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set<number>();
      // If the clicked card is already flipped, close it
      // Otherwise, open only the clicked card (closing all others)
      if (!prev.has(memberId)) {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const toggleDescriptionExpand = (memberId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const countLines = (text: string): number => {
    return text.split('\n').length;
  };

  const shouldTruncate = (text: string): boolean => {
    // Show "See More" if text is longer than ~3-4 lines (300 chars)
    return text.length > 250;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 crew-section" style={{ backgroundColor: '#000000' }}>
      <div className="w-full bg-black crew-section" style={{ backgroundColor: '#000000' }}>
        <div className="w-full mx-auto">
          
          {/* Crew Grid - Responsive Layout */}
          <div className="grid gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            2xl:grid-cols-5 
            auto-rows-fr
            place-items-center
            w-full
            max-w-[1600px] 
            mx-auto
            px-4
          ">
          {teamMembers.map((member) => {
            const isFlipped = flippedCards.has(member.id);
            return (
              <div
                key={member.id}
                className="relative cursor-pointer perspective-1000 w-full max-w-[320px] aspect-2/3 min-h-[480px] mx-auto"
                onClick={() => handleCardClick(member.id)}
              >
                {/* Flip Card Container */}
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}>
                  
                  {/* Front Side - Polaroid Style Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden gap-2">
                    {/* Polaroid Card */}
                    <div className="bg-white rounded-3xl p-4 shadow-2xl crew-card-front h-full flex flex-col w-full mx-auto group relative transition-all duration-500">
                      {/* Photo Container */}
                      <div className="relative flex-1 w-full mb-4 rounded-2xl overflow-hidden bg-gray-100 aspect-4/5 group">
                        {/* Grayscale Image - Default */}
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-cover crew-image grayscale group-hover:opacity-0 transition-opacity duration-500"
                        />

                        {/* Color Image - On Hover */}
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover crew-image opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
                          unoptimized
                        />
                      </div>
                      {/* Name Label */}
                      <div className="text-center">
                        <h3 className="text-orange-500 font-bold text-xl tracking-wide uppercase crew-name transition-all duration-500">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Back Side - Details Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden font-medium rotate-y-180">
                    <div className="bg-white rounded-3xl p-4 shadow-2xl h-full w-full mx-auto overflow-y-auto">
                      <div className="h-full flex flex-col justify-between">
                        {/* Header with Name and LinkedIn */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-gray-900 font-bold text-base leading-tight flex-1 pr-2">{member.name}</h3>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-all shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <IconBrandLinkedinFilled size={14} className="text-white" />
                              </div>
                            </a>
                          )}
                        </div>
                        
                         {/* Divider */}
                        <div className="border-t border-gray-200 mb-2"></div>

                        {/* Description */}
                        <div className="mb-1">
                          <p className={`text-gray-600 text-sm leading-relaxed ${
                            !expandedDescriptions.has(member.id) ? 'line-clamp-6' : ''
                          }`}>
                            {member.description}
                          </p>
                          {shouldTruncate(member.description) && (
                            <button
                              onClick={(e) => toggleDescriptionExpand(member.id, e)}
                              className="text-orange-500 hover:text-orange-600 text-xs font-semibold mt-2 transition-colors"
                            >
                              {expandedDescriptions.has(member.id) ? 'See Less' : 'See More'}
                            </button>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 mb-1"></div>

                        {/* Specialisation */}
                        <div className="mb-2 flex-1">
                          <h4 className="font-bold text-base text-gray-900 mb-1">Specialisation:</h4>
                          <div className="space-y-1">
                            {member.specializations.map((spec, index) => (
                              <div key={index} className="text-gray-600 text-sm flex items-start">
                                <span className="text-gray-900 mr-2 text-sm">•</span>
                                <span className="flex-1">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 mb-1"></div>

                        {/* Academic */}
                        <div className="pb-5">
                          <h4 className="font-bold text-base text-gray-900">Academic:</h4>
                          <div className="text-gray-600 text-xs">
                            {member.academic.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crew;