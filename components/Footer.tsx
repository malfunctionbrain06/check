import Link from 'next/link';
import { Mail, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappPhone = '9921167992';
  const whatsappLink = `https://wa.me/${whatsappPhone}`;

  return (
    <footer id="contact" className="bg-[#F9F5F2] border-t border-[#E8D5D0] py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">Gulabi Guiltz</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Handcrafted beaded jewelry and crochet accessories made with love and creativity. Each piece tells a story of artisan craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#C97BA4] hover:text-[#F7A8B8] transition-colors text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#C97BA4] hover:text-[#F7A8B8] transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#C97BA4] hover:text-[#F7A8B8] transition-colors text-sm font-medium">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4 text-sm">Connect With Us</h4>
            <div className="space-y-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#C97BA4] hover:text-[#F7A8B8] transition-colors group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">WhatsApp: +91 {whatsappPhone}</span>
              </a>
              <a
                href="https://www.instagram.com/gulabi_guiltz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#C97BA4] hover:text-[#F7A8B8] transition-colors group"
              >
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">@gulabi_guiltz</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8D5D0] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
            <p>&copy; {currentYear} Gulabi Guiltz. All rights reserved.</p>
            <p className="mt-4 md:mt-0 text-center md:text-right">Handcrafted stories, worn softly</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
