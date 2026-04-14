'use client';

import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  price: string;
  description: string;
  image: string;
}

export function ProductCard({
  id,
  name,
  code,
  price,
  description,
  image,
}: ProductCardProps) {
  const whatsappPhone = '9921167992';
  
  const message = `Hi !! I wanted to know about buying ${name} (Code: ${code}). My name is ____ and my contact number is ____.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white border border-[#E8D5D0] hover:border-[#C97BA4] hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#F9F5F2] to-[#E8D5D0]">
        <Image
          src={image}
          alt={name}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-1">
              {name}
            </h3>
            <p className="text-xs font-medium text-[#C97BA4] uppercase tracking-wide">
              Code: {code}
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#E8D5D0]">
          <span className="text-lg font-semibold text-[#C97BA4]">
            {price}
          </span>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C97BA4] text-white font-semibold rounded-full hover:bg-[#F7A8B8] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle size={16} />
            <span className="text-sm">Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
