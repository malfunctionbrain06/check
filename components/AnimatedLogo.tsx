'use client';

import Image from 'next/image';
import React from 'react';

export function AnimatedLogo() {
  return (
    <div className="relative mb-8">
      <style>{`
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes subtle-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .animated-logo-container {
          animation: float-up-down 4s ease-in-out infinite;
        }

        .animated-logo-inner {
          animation: subtle-scale 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>

      <div className="animated-logo-container">
        <div className="animated-logo-inner inline-block">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden flex items-center justify-center bg-white shadow-2xl">
            <Image
              src="/gulabi-logo.png"
              alt="Gulabi Guiltz Logo"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
