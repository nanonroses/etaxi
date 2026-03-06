'use client';

import React, { useState } from 'react';
import { Smartphone, Users, MapPin, CreditCard, Calculator } from 'lucide-react';

// --- Data for the B2B Solutions Accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'App Móvil',
    description: 'App iOS y Android con seguimiento GPS en tiempo real',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    icon: Smartphone,
  },
  {
    id: 2,
    title: 'Gestión de Flota',
    description: 'Dashboard web para gestionar conductores, vehículos y turnos',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    icon: Users,
  },
  {
    id: 3,
    title: 'Panel de Monitoreo',
    description: 'Mapa en vivo con ubicación de toda tu flota 24/7',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    icon: MapPin,
  },
  {
    id: 4,
    title: 'Pasarela de Pago',
    description: 'Integración con Webpay, Flow y tarjetas de crédito',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
    icon: CreditCard,
  },
  {
    id: 5,
    title: 'Contabilidad',
    description: 'Facturación electrónica y liquidaciones automáticas',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
    icon: Calculator,
  },
];

interface AccordionItemData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter, onClick }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-full md:w-[400px]' : 'w-full md:w-[60px]'}
        ${!isActive ? 'md:flex-shrink-0' : ''}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/400x450/182b33/ffffff?text=ETAXI';
        }}
      />
      {/* Dark overlay with brand gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030c13] via-[#030c13]/60 to-transparent"></div>

      {/* Active state content */}
      {isActive && (
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="inline-block px-3 py-1 bg-[#dd1828] text-xs font-semibold rounded-full mb-2">
            Incluido
          </span>
          <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
          <p className="text-sm text-white/80">{item.description}</p>
        </div>
      )}

      {/* Inactive state - Vertical text (desktop only) */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          hidden md:block
          ${
            isActive
              ? 'opacity-0'
              : 'bottom-24 left-1/2 -translate-x-1/2 -rotate-90 origin-center'
          }
        `}
      >
        {item.title}
      </span>

      {/* Mobile: Show title at bottom when inactive */}
      <span
        className={`
          absolute text-white text-base font-semibold
          transition-all duration-300 ease-in-out
          md:hidden
          ${
            isActive
              ? 'opacity-0'
              : 'bottom-4 left-4 right-4 text-center'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

interface InteractiveImageAccordionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  items?: AccordionItemData[];
}

// --- Main Component ---
export function InteractiveImageAccordion({
  title = "Solución Integral para tu Empresa",
  subtitle = "Cuando contratas ETAXI para tu empresa o gremio, recibes un ecosistema completo de herramientas diseñadas para digitalizar y optimizar tu operación de transporte.",
  ctaText = "Solicitar Demo",
  ctaHref = "#contact",
  items = accordionItems,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="font-sans">
      <section className="container mx-auto max-w-[1200px] px-4 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Side: Text Content */}
          <div className="w-full lg:w-2/5 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-[#dd1828]/20 rounded-full mb-4 border border-[#dd1828]/30">
              <p className="text-sm font-semibold text-[#fff500]">
                Todo en Uno
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {title}
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            <div className="mt-8">
              <a
                href={ctaHref}
                className="inline-block bg-[#dd1828] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#dd1828]/90 hover:shadow-[0_0_20px_rgba(221,24,40,0.4)] transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#fff500]"
              >
                {ctaText}
              </a>
            </div>

            {/* Feature list */}
            <div className="mt-8 grid grid-cols-1 gap-3">
              {items.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(index)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300
                      ${activeIndex === index
                        ? 'bg-[#dd1828]/20 border border-[#dd1828]/50'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                      }
                    `}
                  >
                    <span className={`
                      w-10 h-10 flex items-center justify-center rounded-full
                      ${activeIndex === index
                        ? 'bg-[#dd1828] text-white'
                        : 'bg-white/10 text-white/60'
                      }
                    `}>
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className={`
                        font-semibold
                        ${activeIndex === index ? 'text-white' : 'text-white/80'}
                      `}>
                        {item.title}
                      </span>
                      <span className={`
                        text-xs
                        ${activeIndex === index ? 'text-white/70' : 'text-white/50'}
                      `}>
                        {item.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-3/5">
            {/* Desktop: Horizontal accordion */}
            <div className="hidden md:flex flex-row items-center justify-center gap-2 p-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>

            {/* Mobile: Show only active item */}
            <div className="md:hidden">
              <div className="relative h-[300px] rounded-2xl overflow-hidden">
                <img
                  src={items[activeIndex].imageUrl}
                  alt={items[activeIndex].title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030c13] via-[#030c13]/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-3 py-1 bg-[#dd1828] text-xs font-semibold rounded-full mb-2">
                    Incluido
                  </span>
                  <h3 className="text-xl font-bold mb-1">{items[activeIndex].title}</h3>
                  <p className="text-sm text-white/80">{items[activeIndex].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
