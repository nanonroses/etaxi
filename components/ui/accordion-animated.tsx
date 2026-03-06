'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionAnimatedProps {
  items: AccordionItem[];
}

export function AccordionAnimated({ items }: AccordionAnimatedProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItemComponent
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

interface AccordionItemComponentProps {
  item: AccordionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItemComponent({ item, index, isOpen, onToggle }: AccordionItemComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className={`border-2 border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:border-[#F8D347] hover:shadow-xl group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${isOpen ? 'shadow-xl border-[#F8D347] scale-[1.02]' : 'shadow-md'}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-all duration-300 group/button relative overflow-hidden"
      >
        {/* Background gradient on hover/open */}
        <div className={`absolute inset-0 bg-gradient-to-r from-[#F8D347]/5 to-transparent transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 group-hover/button:opacity-100'
        }`} />

        <h3 className={`text-lg md:text-xl font-bold pr-4 relative z-10 transition-colors duration-300 ${
          isOpen ? 'text-[#F8D347]' : 'text-[#0C1A2B] group-hover/button:text-[#F8D347]'
        }`}>
          {item.question}
        </h3>

        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
          isOpen
            ? 'bg-[#F8D347] rotate-180 scale-110'
            : 'bg-gray-100 group-hover/button:bg-[#F8D347]/20 group-hover/button:scale-110'
        }`}>
          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
            isOpen ? 'text-[#0C1A2B]' : 'text-gray-600 group-hover/button:text-[#F8D347]'
          }`} />
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="p-6 pt-0">
          <div className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-l-4 border-[#F8D347] transition-all duration-500 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <p className="text-muted-foreground leading-relaxed text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
