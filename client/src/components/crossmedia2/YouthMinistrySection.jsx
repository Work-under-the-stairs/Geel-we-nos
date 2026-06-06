import React from 'react';
import { motion } from 'framer-motion';
import { Bike, ExternalLink, Landmark, Link, Users } from 'lucide-react';

const FadeUpScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const YouthMinistrySection = () => {
  return (
    <>
    {/* <div className="relative w-full bg-gray-900" dir="rtl"> */}
      
      {/* ================= 1. القسم الأول: ثابت (الأسرة والخلفية) ================= */}
      <section className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-[position:left_center] md:bg-center opacity-80"
          style={{ backgroundImage: "url('/assets/crossmedia2/family.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-gray-900/80 via-gray-900/60 to-transparent"></div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight border-r-4 border-emerald-500 pr-4"
            >
              معاون وزير الرياضة: قضايا الأسرة الحاضنة الأولى للنشء.. و5 آلاف مركز شباب لدعم الفئات المستهدفة
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed text-gray-300 font-light mb-6"
            >
              تختص وزارة الشباب والرياضة برسم السياسات والخطط اللازمة لرعاية النشء والشباب، كما أنها معنية بالقضايا المجتمعية المرتبطة بالأسرة المصرية؛ باعتبار أن 
              <span className="text-emerald-500 font-bold bg-emerald-900/20 px-2 py-1 rounded mx-1">الآباء والأمهات هم ركيزة المجتمع</span>
              ، والمسؤولون عن تنشئة جيل يمثل حاضر البلاد ومستقبلها، 
              حسب ما يرى 
             <span className="text-emerald-500 font-bold bg-emerald-900/20 px-2 py-1 rounded mx-1"> مصطفى عز العرب</span>
              ، معاون الوزير لشؤون التنمية الثقافية والمجتمعية.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl leading-relaxed text-gray-300 font-light"
            >
              ويضيف عز العرب أن الوزارة تحرص على إعداد خطط وطنية للأسرة؛ باعتبارها 
              <span className="text-emerald-500 font-bold bg-emerald-900/20 px-2 py-1 rounded mx-1">الحاضنة الأولى والأهم لإعداد الإنسان وخروجه للمجتمع، حيث إن النشء هو انعكاس لأسلوب الأسرة وتربيتها</span>.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="relative z-10 w-full">
        
        <div className="absolute left-0 right-0 top-[-18vw] md:top-[-16vw] w-full z-20 pointer-events-none drop-shadow-2xl translate-y-[2px]">
          <svg viewBox="0 0 1440 320" className="w-full h-auto fill-current text-[#111817] block" preserveAspectRatio="none">
            <path fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,96C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="bg-[#111817] relative z-20 pt-10 md:pt-20 pb-20 overflow-hidden">
          <div className="absolute top-30 right-[-10%] w-[20vw] h-[20vw] bg-emerald-900/40 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <FadeUpScroll>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                الوزارة والأسرة المصرية
              </h3>
            </FadeUpScroll>

            <FadeUpScroll delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light mb-6">
                ويشير عز العرب إلى تنسيق وزارة الشباب والرياضة مع عدد من الوزارات المعنية بشؤون الأسرة؛ مثل وزارتي الصحة والسكان، والتضامن الاجتماعي، ضمن مجموعة تنمية الأسرة المصرية، منوّهًا بتقديم الإدارة المعنية بالتنشئة عددًا من المبادرات والبرامج التي توفرها الوزارة، وتستهدف النشء في المقام الأول.
              </p>
            </FadeUpScroll>

            <FadeUpScroll delay={0.2}>
              <span className="text-emerald-500 font-bold bg-emerald-900/20 px-2 py-1 rounded">
                ويوضح عز العرب أن التنشئة تنقسم إلى محورين:
              </span>
            </FadeUpScroll>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 font-sans" dir="rtl">
              
              <FadeUpScroll delay={0.3}>
                <div className="relative p-8 h-full rounded-tr-3xl rounded-bl-3xl bg-gradient-to-br from-[#1a241e] to-[#111817] border border-emerald-900/30 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 group overflow-hidden flex flex-col">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500 z-0"></div>
                  <h4 className="text-emerald-400 font-bold text-2xl mb-4 relative z-10 group-hover:text-white transition-colors duration-300">
                    التنشئة السياسية
                  </h4>
                  <p className="text-gray-400 leading-relaxed relative z-10 text-lg flex-grow">
                    من خلال المشاركة المجتمعية، وذلك عن طريق توفير برامج وندوات للنشء والشباب.
                  </p>
                  <Landmark
                    className="absolute -bottom-10 -left-10 w-48 h-48 text-emerald-500 opacity-10 group-hover:opacity-15 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0" 
                    strokeWidth={1}
                  />
                </div>
              </FadeUpScroll>
              
              <FadeUpScroll delay={0.4}>
                <div className="relative p-8 h-full rounded-tr-3xl rounded-bl-3xl bg-gradient-to-br from-[#1a241e] to-[#111817] border border-emerald-900/30 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 group overflow-hidden flex flex-col">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500 z-0"></div>
                  <h4 className="text-emerald-400 font-bold text-2xl mb-4 relative z-10 group-hover:text-white transition-colors duration-300">
                    التنشئة الميدانية والرياضية
                  </h4>
                  <p className="text-gray-400 leading-relaxed relative z-10 text-lg flex-grow">
                    للأسر المصرية، وتنظيم العلاقة بين الآباء والأبناء، في إطار التوعية بطريقة التعامل مع سلوكياتهم.
                  </p>
                  <Bike 
                    className="absolute -bottom-10 -left-10 w-48 h-48 text-emerald-500 opacity-10 group-hover:opacity-15 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0" 
                    strokeWidth={1}
                  />
                </div>
              </FadeUpScroll>
            </div>
          </div>
        </div>
      </div>

    {/* </div> */}
      <section className="sticky top-0 h-screen w-full bg-[#111817] z-10 flex flex-col justify-center overflow-hidden pb-20">
          <div className="absolute top-60 left-[-10%] w-[20vw] h-[20vw] bg-emerald-900/40 rounded-full blur-[120px] pointer-events-none"></div>
        {/* <div className="absolute bottom-20 right-[-10%] w-[30vw] h-[30vw] bg-lime-900/10 rounded-full blur-[100px] pointer-events-none"></div> */}

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <FadeUpScroll>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 border-r-4 border-emerald-500 pr-4">
              معايير قياس النجاح
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light mb-16 md:mb-24 max-w-3xl">
              وتملك وزارة الشباب والرياضة وسائل محددة لقياس مدى نجاح مبادرات وبرامج الأسرة، غير أن بعض المبادرات لا يمكن قياس نجاحها إلا بملاحظة السلوك المجتمعي.
            <span onClick={() => window.open('https://youtu.be/-2EU_5wqdlE', '_blank')} className="text-emerald-500 font-semibold cursor-pointer px-2 py-1 hover:bg-emerald-500/20 rounded transition-colors duration-300"> 
              <ExternalLink className='w-5 inline'/>
              حوار خاص لعز العرب معاون وزير الشباب والرياضة لشؤون التنمية الثقافية لموقع "جيل ونص" ونصائحه للاهالي</span>
            </p>
          </FadeUpScroll>

          <FadeUpScroll delay={0.2}>
            <div className="relative flex flex-row items-end bg-gradient-to-r from-[#151c18] to-[#111814] px-4 md:px-8 pt-8 md:pt-12 pb-0 rounded-2xl md:rounded-3xl border border-emerald-900/40 shadow-2xl mt-12 md:mt-24">
              
              <div className="relative flex-1 pb-4 md:pb-8 pl-2 md:pl-10">
                <svg className="absolute -top-4 md:-top-10 -right-2 md:-right-4 w-8 h-8 md:w-20 md:h-20 text-emerald-500/10 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="relative z-10 text-sm md:text-3xl text-white font-medium leading-relaxed md:leading-relaxed italic">
                  "إن المسؤولية موزعة بين الوزارات المعنية لتقييم أثر المبادرات على سلوك الأسرة والنشء داخل المجتمع."
                </blockquote>
                <p className="mt-4 md:mt-8 text-emerald-400 font-bold text-xs md:text-xl">
                  — مصطفى عز العرب
                  <span className="block text-[10px] md:text-base text-gray-400 font-light mt-1 md:mt-2">معاون الوزير لشؤون التنمية الثقافية والمجتمعية</span>
                </p>
              </div>

              <div className="w-50 md:w-[350px] lg:w-[400px] shrink-0 self-end -left-10 -mr-20 -mt-5 md:-mt-300 relative z-20 flex justify-center ">
                <img 
                  src="/assets/crossmedia2/ezz-elarab.png" 
                  alt="مصطفى عز العرب" 
                  className="w-full h-auto max-h-[160px] md:max-h-[400px] object-contain object-bottom drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] md:drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] filter contrast-125"
                />
              </div>

            </div>
          </FadeUpScroll>
        </div>
      </section>
      </>
  );
};

export default YouthMinistrySection;