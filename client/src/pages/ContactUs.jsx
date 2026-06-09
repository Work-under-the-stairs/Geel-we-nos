import React from 'react';
import { MapPin, Mail } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-primary font-arabic py-16 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 relative inline-block">
          اتصل بنا
          <span className="absolute bottom-[-10px] right-0 left-0 h-1.5 bg-secondary rounded-full"></span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4">- المقر الرئيسي:</h2>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                جامعة عين شمس، كلية الإعلام، العباسية، القاهرة.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4">- الإيميل:</h2>
              <a 
                href="mailto:info@masscomm.asu.edu.eg" 
                className="text-lg text-gray-700 font-medium block hover:text-secondary transition-colors duration-200 break-all text-right"
              >
                info@masscomm.asu.edu.eg
              </a>
            </div>
          </div>

        </div>

        <div className="w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-md border-2 border-slate-100 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.6154005364087!2d31.2838965!3d30.0765569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fd32974ba25%3A0x715e3e709fd67a83!2z2YPZhNmK2Kkg2KfZhNil2LnZhNin2YUg2KzYp9mF2LnYqSDYudmK2YYg2LTZhdiz!5e0!3m2!1sar!2seg!4v1781018443187!5m2!1sar!2seg"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Faculty of Mass Communication, Ain Shams University"
            className="grayscale-[5%] contrast-[105%] hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;