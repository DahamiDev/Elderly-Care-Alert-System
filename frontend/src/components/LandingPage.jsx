import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Shield,
  Bell,
  Calendar,
  UserCheck,
  Smartphone,
  Send,
  Users,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Star,
  Heart,
  Mail,
  ArrowRight,
  User,
  HelpCircle,
} from "lucide-react";
import Navbar from "./Navbar";

// Spec requested imports
import heroCoupleImg from "../assets/hero-couple.jpg";
import leaf1 from "../assets/leaf-1.png";
import leaf2 from "../assets/leaf-2.png";
import aboutUsImg from "../assets/about_us.png";
import aboutSystemImg from "../assets/about-system.png";
import logoImg from "../assets/logo.png";

// Steps imports
import image1 from "../assets/image_1.png";
import image2 from "../assets/image_2.png";
import image3 from "../assets/image_3.png";
import image4 from "../assets/image_4.png";
import image5 from "../assets/image_5.png";

// Mockup phone imports
import iMockup1 from "../assets/iMockup_1.png";
import iMockup2 from "../assets/iMockup_2.png";

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${newsletterEmail}`);
    setNewsletterEmail("");
  };

  // 5 Feature Cards translating using locales
  const newFeatures = [
    {
      id: 1,
      title: t("features.checkins"),
      desc: t("features.checkinsDesc"),
      icon: <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      isElevated: false,
      bgClass:
        "bg-slate-50/80 dark:bg-slate-900 border border-slate-100 dark:border-slate-800",
      shadowClass: "shadow-lg",
      textColor: "text-slate-900 dark:text-white font-extrabold",
      descColor: "text-slate-500 dark:text-slate-400",
      translateClass: "md:translate-y-16",
    },
    {
      id: 2,
      title: t("features.alerts"),
      desc: t("features.alertsDesc"),
      icon: <Bell className="h-6 w-6 text-purple-700 dark:text-purple-300" />,
      isElevated: true,
      bgClass:
        "bg-[#E0C1FB] dark:bg-purple-950/10 border border-purple-300 dark:border-purple-800",
      shadowClass: "shadow-lg",
      textColor: "text-purple-950 dark:text-purple-100 font-extrabold",
      descColor: "text-purple-900 dark:text-purple-300 font-medium",
      translateClass: "md:-translate-y-20",
    },
    {
      id: 3,
      title: t("features.easyToUse"),
      desc: t("features.easyToUseDesc"),
      icon: <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      isElevated: false,
      bgClass:
        "bg-slate-50/80 dark:bg-slate-900 border border-slate-100 dark:border-slate-800",
      shadowClass: "shadow-lg",
      textColor: "text-slate-900 dark:text-white font-extrabold",
      descColor: "text-slate-500 dark:text-slate-400",
      translateClass: "md:translate-y-16",
    },
    {
      id: 4,
      title: t("features.security"),
      desc: t("features.securityDesc"),
      icon: (
        <Calendar className="h-6 w-6 text-purple-700 dark:text-purple-300" />
      ),
      isElevated: true,
      bgClass:
        "bg-[#E0C1FB] dark:bg-purple-950/10 border border-purple-300 dark:border-purple-800",
      shadowClass: "shadow-lg",
      textColor: "text-purple-900 dark:text-purple-100 font-extrabold",
      descColor: "text-purple-900 dark:text-purple-300 font-medium",
      translateClass: "md:-translate-y-20",
    },
    {
      id: 5,
      title: t("dashboard.safetyHistory"),
      desc: t("features.checkinsDesc"),
      icon: (
        <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      ),
      isElevated: false,
      bgClass:
        "bg-slate-50/80 dark:bg-slate-900 border border-slate-100 dark:border-slate-800",
      shadowClass: "shadow-lg",
      textColor: "text-slate-900 dark:text-white font-extrabold",
      descColor: "text-slate-500 dark:text-slate-400",
      translateClass: "md:translate-y-16",
    },
  ];

  // Steps illustrations loading actual translation strings
  const steps = [
    {
      num: "01",
      title: t("how.step1Title"),
      desc: t("how.step1Desc"),
      side: "left",
      img: image1,
      icon: <Send className="h-4 w-4 text-purple-600 dark:text-purple-300" />,
    },
    {
      num: "02",
      title: t("how.step2Title"),
      desc: t("how.step2Desc"),
      side: "right",
      img: image2,
      icon: <User className="h-4 w-4 text-purple-600 dark:text-purple-300" />,
    },
    {
      num: "03",
      title: t("how.step3Title"),
      desc: t("how.step3Desc"),
      side: "left",
      img: image3,
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    },
    {
      num: "04",
      title: t("how.step4Title"),
      desc: t("how.step4Desc"),
      side: "right",
      img: image4,
      icon: (
        <HelpCircle className="h-4 w-4 text-purple-600 dark:text-purple-300" />
      ),
    },
    {
      num: "05",
      title: t("how.step5Title"),
      desc: t("how.step5Desc"),
      side: "left",
      img: image5,
      icon: <Bell className="h-4 w-4 text-purple-600 dark:text-purple-300" />,
    },
  ];

  const faqs = [
    {
      q: t("faq.q1"),
      a: t("faq.a1"),
    },
    {
      q: t("faq.q2"),
      a: t("faq.a2"),
    },
    {
      q: t("faq.q3"),
      a: t("faq.a3"),
    },
    {
      q: t("faq.q4"),
      a: t("faq.a4"),
    },
  ];

  const row1Testimonials = [
    {
      quote: t("reviews.quote1"),
      name: "Amal Dais",
      relation: t("reviews.relation1"),
    },
    {
      quote: t("reviews.quote2"),
      name: "Sanasa",
      relation: t("reviews.relation2"),
    },
    {
      quote: t("reviews.quote3"),
      name: "Sarah Perera",
      relation: t("reviews.relation3"),
    },
  ];

  const row2Testimonials = [
    {
      quote: t("reviews.quote4"),
      name: "Amara Hewage",
      relation: t("reviews.relation4"),
    },
    {
      quote: t("reviews.quote5"),
      name: "Ravi Kumara",
      relation: t("reviews.relation5"),
    },
    {
      quote: t("reviews.quote6"),
      name: t("reviews.quote6"),
    },
  ];

  const duplicatedRow1 = [
    ...row1Testimonials,
    ...row1Testimonials,
    ...row1Testimonials,
    ...row1Testimonials,
  ];
  const duplicatedRow2 = [
    ...row2Testimonials,
    ...row2Testimonials,
    ...row2Testimonials,
    ...row2Testimonials,
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      {/* Hero Section - Full Bleed Background Style */}
      <section className="relative overflow-hidden min-h-[560px] lg:h-[640px] flex items-center bg-white dark:bg-slate-950">
        {/* Left Side Content Area (z-20) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          <div className="w-full lg:w-1/2 pr-8 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Shield className="h-4 w-4 mr-1 text-purple-600" />
              Active Protection
            </div>

            {/* Smooth gradient semibold/bold title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#4C1D95]">
              {t("hero.title")}
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-600/20 hover:shadow-purple-600/35 hover:-translate-y-0.5 transition-all duration-200 text-center flex items-center justify-center space-x-1"
              >
                <span>{t("hero.getStarted")}</span>
                <span>→</span>
              </Link>
              <a
                href="#how"
                className="bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 px-8 py-3.5 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                {t("hero.learnMore")}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side Absolute Full-Bleed Image (z-10) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 h-full z-10">
          <img
            src={heroCoupleImg}
            alt="Elderly couple smiling using a smartphone"
            className="w-full h-full object-cover object-center"
          />
          {/* Fixed gradient overlay for both Light and Dark modes */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent dark:from-slate-950 dark:via-slate-950/5"></div>
        </div>

        {/* Floating Figma graphic overlay items radiating from image */}
        <div className="absolute top-[10%] left-[45%] text-purple-600/40 dark:text-purple-600/20 animate-float pointer-events-none select-none z-20">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="absolute top-[40%] left-[40%] text-purple-600/40 dark:text-purple-600/20 animate-float-delay pointer-events-none select-none z-20">
          <User className="h-8 w-8" />
        </div>
        <div className="absolute top-[15%] right-[25%] text-purple-600/30 animate-float pointer-events-none select-none z-20">
          <Send className="h-6 w-6 transform -rotate-12" />
        </div>
        <div className="absolute top-[42%] right-[22%] text-purple-600/30 animate-float-delay pointer-events-none select-none z-20">
          <Send className="h-6 w-6 transform rotate-12" />
        </div>

        {/* Floating shield graphic in the center screen */}
        <div className="hidden lg:flex absolute right-[40%] top-[12%] bg-white dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-[2rem] shadow-2xl border border-purple-100/60 dark:border-purple-900/40 items-center justify-center z-35 animate-float">
          <div className="relative text-center flex flex-col items-center">
            <div className="bg-purple-100 dark:bg-slate-800 p-4 rounded-full text-purple-600 dark:text-purple-400">
              <Heart className="h-14 w-14 fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Zig-Zag Staggered Layout with Large Floating Leaves */}
      <section className="py-28 bg-white dark:bg-slate-900 relative transition-colors duration-300 overflow-hidden">
        {/* Left-middle large leaf */}
        <div className="absolute left-[-2%] top-[12%] w-40 md:w-56 pointer-events-none select-none z-10">
          <img
            src={leaf1}
            alt="Leaf decoration left"
            className="opacity-90 dark:opacity-30"
          />
        </div>

        {/* Bottom-right large leaf */}
        <div className="absolute right-[-2%] bottom-[1%] w-40 md:w-56 pointer-events-none select-none z-10">
          <img
            src={leaf2}
            alt="Leaf decoration right"
            className="opacity-90 dark:opacity-30"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight font-sans">
              {t("features.title")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t("features.subtitle")}
            </p>
          </div>

          {/* Staggered Features layout - Vertically elongated with py-12 px-6 min-h-[320px] and shadow-lg */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch pt-8 pb-12">
            {newFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`py-12 px-6 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[320px] group ${feature.bgClass} ${feature.translateClass}`}
              >
                <div className="space-y-6">
                  <div className="bg-white/90 dark:bg-slate-950 p-3.5 rounded-2xl inline-block shadow-md group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-base font-extrabold tracking-tight ${feature.textColor}`}
                  >
                    {feature.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${feature.descColor}`}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section (Grandma illustration loading about-system.png) */}
      <section
        id="about"
        className="py-12 bg-white dark:bg-slate-900 transition-colors duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered title with dark purple text and a subtle line underneath */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-purple-950 dark:text-purple-300">
              {t("about.title")}
            </h2>
            <div className="w-12 h-1 bg-[#7C3AED] mx-auto mt-2 rounded"></div>
          </div>

          {/* Container with visible curves (rounded-[3rem]), colored #E0C1FB, no border, and significantly increased width/height */}
          <div className="bg-[#E0C1FB] dark:bg-purple-950/60 rounded-[3rem] py-24 md:py-36 px-10 md:px-24 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: aboutUsImg standing couple illustration */}
              <div className="lg:col-span-6 flex justify-center">
                <img
                  src={aboutUsImg}
                  alt="Elderly lady holding a tablet next to a smartphone with checking screen"
                  className="max-h-[420px] md:max-h-[500px] lg:max-h-[560px] object-contain drop-shadow-xl hover:scale-101 transition-transform duration-300"
                />
              </div>

              {/* Right Column: Text content */}
              <div className="lg:col-span-6 space-y-8 text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold text-purple-950 dark:text-purple-100 leading-tight">
                  {t("about.subtitle")}
                </h3>
                <div className="space-y-6 text-purple-900 dark:text-purple-200 text-sm md:text-lg leading-relaxed font-semibold">
                  <p>{t("about.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it's work Section - Custom Interactive Staggered Timeline */}
      <section
        id="how"
        className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-28">
            <h2 className="text-3xl font-extrabold text-purple-900 dark:text-purple-300 sm:text-4xl tracking-tight">
              {t("how.title")}
            </h2>
            <div className="w-12 h-1 bg-[#7C3AED] mx-auto mt-2 rounded"></div>
          </div>

          <div className="relative">
            {/* Center vertical line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform -translate-x-1/2"></div>

            <div className="space-y-36">
              {steps.map((step, idx) => {
                const isLeft = step.side === "left";
                return (
                  <div
                    key={idx}
                    className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0"
                  >
                    {/* Centered Step Indicator Number sitting on line */}
                    <div className="hidden lg:flex absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-12 bg-white dark:bg-slate-950 px-4 py-1 font-bold text-xl text-purple-950 dark:text-purple-300 z-10 select-none">
                      {step.num}
                    </div>
                    {/* Mobile indicator */}
                    <div className="lg:hidden flex bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
                      Step {step.num}
                    </div>

                    {/* Left Column (Text for left-side, image for right-side) */}
                    <div
                      className={`w-full lg:w-[45%] flex flex-col justify-center text-center lg:text-left ${
                        isLeft
                          ? "order-1 lg:order-1 lg:pr-20"
                          : "order-2 lg:order-1"
                      }`}
                    >
                      {isLeft ? (
                        <div className="space-y-4 max-w-lg mx-auto lg:mr-auto lg:ml-0">
                          <div className="flex items-center justify-center lg:justify-start space-x-2">
                            <div className="bg-purple-50 dark:bg-slate-900 p-2.5 rounded-full border border-purple-100 dark:border-purple-900 shadow-sm animate-pulse-slow">
                              {step.icon}
                            </div>
                            <h3 className="text-xl font-black text-purple-900 dark:text-purple-100">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-justify">
                            {step.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center w-full group">
                          <img
                            src={step.img}
                            alt={step.title}
                            className="max-h-[300px] object-contain drop-shadow-2xl animate-float group-hover:scale-103 group-hover:rotate-1 transition-all duration-700"
                          />
                        </div>
                      )}
                    </div>

                    {/* Timeline Middle Spacing */}
                    <div className="hidden lg:block w-[10%]"></div>

                    {/* Right Column (Image for left-side, text for right-side) */}
                    <div
                      className={`w-full lg:w-[45%] flex flex-col justify-center text-center lg:text-left ${
                        isLeft
                          ? "order-2 lg:order-3"
                          : "order-1 lg:order-3 lg:pl-20"
                      }`}
                    >
                      {!isLeft ? (
                        <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                          <div className="flex items-center justify-center lg:justify-start space-x-2">
                            <div className="bg-purple-50 dark:bg-slate-900 p-2.5 rounded-full border border-purple-100 dark:border-purple-900 shadow-sm animate-pulse-slow">
                              {step.icon}
                            </div>
                            <h3 className="text-xl font-black text-purple-900 dark:text-purple-100">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-justify">
                            {step.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center w-full group">
                          <img
                            src={step.img}
                            alt={step.title}
                            className="max-h-[300px] object-contain drop-shadow-2xl animate-float-delay group-hover:scale-103 group-hover:-rotate-1 transition-all duration-700"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <section
        id="reviews"
        className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden relative"
      >
        {/* Soft edge gradient fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40 z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40 z-10 pointer-events-none"></div>

        <div className="w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
              {t("reviews.title")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t("reviews.subtitle")}
            </p>
          </div>

          <div className="space-y-8 w-full">
            {/* First Row: Scrolls Left to Right */}
            <div className="flex overflow-hidden w-full">
              <div className="animate-marquee-right flex space-x-6 py-2">
                {duplicatedRow1.map((item, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="bg-slate-50/70 dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-100 dark:border-purple-950/20 hover:shadow-xl transition-all duration-300 w-[350px] md:w-[380px] shrink-0 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-purple-600 font-serif text-5xl leading-none font-bold block mb-2">
                        “
                      </span>
                      <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.quote}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-purple-100/30 dark:border-purple-950/25">
                      <div className="bg-purple-100 dark:bg-purple-950 p-2.5 rounded-full text-purple-600 dark:text-purple-400">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                          {item.relation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row: Scrolls Right to Left */}
            <div className="flex overflow-hidden w-full">
              <div className="animate-marquee-left flex space-x-6 py-2">
                {duplicatedRow2.map((item, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="bg-slate-50/70 dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-100 dark:border-purple-950/20 hover:shadow-xl transition-all duration-300 w-[350px] md:w-[380px] shrink-0 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-purple-600 font-serif text-5xl leading-none font-bold block mb-2">
                        “
                      </span>
                      <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.quote}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-purple-100/30 dark:border-purple-950/25">
                      <div className="bg-purple-100 dark:bg-purple-950 p-2.5 rounded-full text-purple-600 dark:text-purple-400">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                          {item.relation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section (Overlapping Smartphone Mockups and Grandparents Illustration) */}
      <section className="py-28 bg-white dark:bg-slate-900 relative transition-colors duration-300 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-24 lg:pt-36">
          {/* Overlapping smartphone images on the left overflowing top */}
          <div className="absolute left-6 md:left-12 -top-16 md:-top-28 lg:-top-36 flex items-end space-x-[-3rem] md:space-x-[-5rem] z-20 pointer-events-none">
            <img
              src={iMockup1}
              alt="Daily check-in smartphone mockup 1"
              className="h-[240px] md:h-[340px] lg:h-[430px] object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] animate-float"
            />
            <img
              src={iMockup2}
              alt="Daily check-in smartphone mockup 2"
              className="h-[200px] md:h-[285px] lg:h-[360px] object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] animate-float-delay"
            />
          </div>

          {/* Grandparents illustration on the top right overflowing top */}
          <div className="absolute right-6 md:right-12 -top-14 md:-top-24 lg:-top-32 w-36 md:w-56 lg:w-72 z-20 pointer-events-none">
            <img
              src={aboutSystemImg}
              alt="Elderly couple illustration"
              className="w-full object-contain animate-float"
            />
          </div>

          {/* Purple Container with visible curves (rounded-[3rem]), colored #E0C1FB, no border */}
          <div className="bg-[#E0C1FB] dark:bg-purple-950/60 rounded-[3rem] py-16 lg:py-20 px-8 md:px-16 shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10 relative">
              {/* Left Placeholder for absolute positioned phone mockups */}
              <div className="hidden lg:block lg:col-span-5 h-[120px] lg:h-[200px]"></div>

              {/* Right Column: Text & CTA Buttons */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left lg:pl-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-purple-900 dark:text-purple-100 leading-snug">
                  {t("cta.title")}
                </h3>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/login"
                    className="bg-white dark:bg-slate-900 text-purple-900 dark:text-purple-200 px-10 py-3.5 rounded-2xl font-bold shadow-md hover:shadow-lg hover:bg-purple-50/50 dark:hover:bg-slate-800 transition-all duration-200 text-center min-w-[140px]"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#8800FF] hover:bg-[#7700EE] text-white px-10 py-3.5 rounded-2xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center min-w-[140px]"
                  >
                    {t("cta.button")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section
        id="faq"
        className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
              {t("faq.title")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-purple-100 dark:border-purple-950/50 rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 dark:text-white hover:bg-purple-50/20 dark:hover:bg-slate-800/40 transition-colors text-sm"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-purple-600 transition-transform duration-300 ${
                      activeFaq === idx ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-5 pt-0 border-t border-purple-100/30 dark:border-purple-900/20 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with logoImg */}
      <footer className="bg-[#E0C1FB] dark:bg-purple-900/80 text-purple-950 dark:text-purple-200/90 pt-16 pb-8 rounded-t-[3rem] border-t border-purple-300/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-300/40 dark:border-purple-800/40">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src={logoImg}
                  alt="Elderly Care Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-purple-900 dark:text-white font-black text-lg">
                  {t("nav.brand")}
                </span>
              </div>
              <p className="text-xs text-purple-900 dark:text-purple-300 leading-relaxed max-w-sm">
                {t("about.desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:col-span-4 text-xs">
              <div className="space-y-3">
                <h4 className="text-purple-950 dark:text-white font-extrabold tracking-wider uppercase">
                  {t("footer.product")}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-purple-900 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white transition-colors"
                    >
                      {t("footer.dashboard")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-purple-900 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white transition-colors"
                    >
                      {t("footer.telegramAlerts")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-purple-900 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white transition-colors"
                    >
                      {t("footer.pricing")}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-purple-950 dark:text-white font-extrabold tracking-wider uppercase">
                  {t("footer.company")}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-purple-900 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white transition-colors"
                    >
                      {t("footer.aboutSystem")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-purple-900 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white transition-colors"
                    >
                      {t("footer.securityRules")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-purple-900 hover:text-purple-950 dark:text-purple-300 dark:hover:text-white transition-colors"
                    >
                      {t("footer.support")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-purple-900 dark:text-white font-extrabold tracking-wider uppercase text-xs">
                {t("footer.stayInformed")}
              </h4>
              <p className="text-xs text-purple-900 dark:text-purple-300 leading-relaxed">
                {t("footer.subscribeDesc")}
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex space-x-2"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className="bg-white/80 dark:bg-purple-900 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-white text-xs rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-800/70 dark:placeholder-purple-400/70"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-purple-900 dark:text-purple-400 gap-4">
            <div className="flex space-x-6">
              <a
                href="#"
                className="hover:text-purple-950 dark:hover:text-purple-300"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="hover:text-purple-900 dark:hover:text-purple-300"
              >
                {t("footer.terms")}
              </a>
              <a
                href="#"
                className="hover:text-purple-900 dark:hover:text-purple-300"
              >
                {t("footer.cookies")}
              </a>
            </div>
            <span>
              &copy; {new Date().getFullYear()} {t("nav.brand")}. All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
