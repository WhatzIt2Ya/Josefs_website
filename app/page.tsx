"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function Portfolio() {

  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [visibleReply, setVisibleReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [boxHeight, setBoxHeight] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(480);
  const [expanded, setExpanded] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
  setLoading(true);
  setVisibleReply("");
  setBoxHeight(0);
  setError("");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok) {
      let errorMessage = "Something went wrong.";

      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Request failed with status ${res.status}`;
      }

      if (res.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }

      setError(errorMessage);
      setLoading(false);
      return;
    }

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);

    } catch (err) {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

    // Double rAF ensures React has painted the new reply into the hidden div
  useEffect(() => {
  if (!reply || loading || error) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!measureRef.current) return;

      const height = measureRef.current.scrollHeight;
      const width = measureRef.current.scrollWidth;
      const nextWidth = Math.max(480, Math.min(width + 48, 640));

      if (boxHeight > 0) {
        setBoxHeight(0);

        setTimeout(() => {
          if (expanded) {
            setBoxWidth(nextWidth);
          }
          setBoxHeight(height);
          setTimeout(() => setVisibleReply(reply), 420);
        }, 420);
      } else {
        if (expanded) {
          setBoxWidth(nextWidth);
        }
        setBoxHeight(height);
        setTimeout(() => setVisibleReply(reply), 420);
      }
    });
  });
}, [reply, loading, boxWidth]);

  const works = [
    {
      title: "Self - employed (family business)",
      role: "Automation & Data Tranformation, Nakhon Pathom, Thailand, Jun 2025 - Present",
      description: "Looking over my parents` rental apartment business\nDigitised and automated monthly tenant billing process using Python scripts and spreadsheet macros, reducing manual workload\nGenerated visual graphs and performance indicators of YoY performance in LibreOffice Draw and Calc",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777701923/e20260326_130547_nbxykz.jpg",
    },
    {
      title: "Fujifilm MicroChannel (Thailand)",
      role: "Software Developer Intern, Bangkok, Thailand, Jan 2025 - Apr 2025",
      description: "Developed AI Copilot agents using Microsoft Copilot Studio to automate internal business processes\nIntegrated agents with Dataverse and Power Automate for dynamic data retrieval and workflow execution\nDesigned conversational interfaces for enterprise systems, improving accessibility of business operations\nBuilt and tested automation flows to streamline internal tasks and reduce manual workload\nDocumented development practices and trained staff on building and customising Copilot agent",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777701847/Image_lkgnjp.jpg",
    },
  ];

  const projects = [
    {
      title: "AYA (Are You Awake?) Application",
      role: "Application Owner, Dec 2025 - Present",
      description: "Application made to easily check if family members` are awake or winding down for the day including the ability to request GPS locations, and share status updates between family members",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777695352/Screenshot_2026-05-02_134840_aenxf6.png",
      link: "https://github.com/WhatzIt2Ya/AYA",
    },
    {
      title: "Elderly Motion Tracking System with AI-Enabled Edge Computing",
      role: "Front-end Engineer & Deployment Engineer, Aug 2023 - Dec 2024",
      description: "Copilot Studio bot for managing employee onboarding workflows.",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777695495/Screenshot_2024-03-15_225247_kfrxow.png",
      link: "https://ieeexplore.ieee.org/abstract/document/10480059",
    },
    {
      title: "Physiotherapy Motion Tracking System using Machine Learning",
      role: "Software Engineer & Software Tester, Jan 2024 - Dec 2024",
      description: "Copilot Studio bot for managing employee onboarding workflows.",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777695495/Screenshot_2023-11-23_151701_hce5cy.png",
    },
    {
      title: "A Simple Fuel Economy Calculator",
      role: "Application Owner, Feb 2023 - Dec 2024",
      description: "Developed a lightweight mobile application using Dart and Flutter to calculate and track fuel efficiency for low-end aftermarket Chinese Android car head units",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777695351/Screenshot_2024-08-23_133545_apa3ov.png",
      link: "https://github.com/WhatzIt2Ya/simplefueleco",
    },
  ];

  const hobby = [
    {
      title: "Photography",
      description: "I enjoy taking photos of landscapes, streets, and travel destinations. I have experience with photo editing software in Adobe Lightroom and Photoshop, Google Snapseed to enhance my photos.",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777701535/DSC05917_isshpt.jpg",
      link: "https://500px.com/p/justaflyer_au?view=photos",
    },
    {
      title: "Content Creator",
      description: "As an aviation enthusisast, I like to capture and share photos and videos of airplanes, airports, and aviation events as a personal journal. I primarily share my video content on YouTube. I have experience with video editing software Adobe Premiere Pro to create engaging content for social media platforms.",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777695428/20220403_141722_fvopou.jpg",
      link: "https://www.youtube.com/@justaflyer",
    },
    {
      title: "Game Artist",
      description: "Fueled by boredom during the pandemic lockdown, I designed painted templates/liveries for different aircraft models according to real-life airliners for simulation software; Microsoft Flight Simulator 2020. Used Nvidia texture tools, Blender, and Adobe Photoshop to complete 1:1 copy of airline liveries.",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777695352/Screenshot_2026-05-02_135443_lmjouq.png",
      link: "https://flightsim.to/profile/WhatzIt2Ya/",
    },
    {
      title: "IT technician",
      description: "I build and repair tech gadgets for myself, friends and family, not limited to desktops, laptops, smartphones, network, smart home CCTVs, IoT devices etc. Self-taught diagnosing tech issues such as malware detection and abnormal traffic analysis. Optimise performance for various devices by debloating software, removing telemetry software tracking services in vendors, operating systems, and browsers etc.",
      image: "https://res.cloudinary.com/deykyyo9z/image/upload/v1777701422/Screenshot_20260502_155442_Gallery_i4iedc.jpg",
    },
  ];

  return (
  <div>

    {/* HEADER */}
    <div className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md text-white">
    <div className="flex justify-between items-center py-4 px-6 text-sm font-medium">

      {/* Left nav */}
      <div className="flex gap-8">
        <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
          Work
        </button>

        <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
          Projects
        </button>

        <button onClick={() => document.getElementById("photos")?.scrollIntoView({ behavior: "smooth" })}>
          Photography
        </button>

        <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Contact
        </button>
      </div>

      {/* Right GitHub button */}
      <a
        href="https://github.com/WhatzIt2Ya/Josefs_website.git"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        View GitHub Repo
      </a>

    </div>
  </div>

    {/* HERO SECTION */}
    <div className="relative h-[100vh] w-full overflow-hidden">

    {/* Chatbot Floating UI */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mt-20">
        
        <div
          ref={chatboxRef}
          className="pointer-events-auto bg-black/40 backdrop-blur-md p-6 rounded-2xl text-white"
          style={{
            width: expanded ? boxWidth : "fit-content",
            minWidth: expanded ? 480 : "auto",
            maxWidth: 640,
            transition: expanded
              ? "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >

          <h2 className="text-lg font-bold mb-3 text-center">
            Hi, I'm an AI agent created by Josef.
            <br />
            Ask anything about me!
          </h2>

           <div className="flex items-center gap-2 mt-3 justify-center">
              <input
                value={input}
                onFocus={() => {
                  if (expanded) return;

                  setExpanded(true);

                  // Step 1: lock current width (prevents jump)
                  if (chatboxRef.current) {
                    const currentWidth = chatboxRef.current.offsetWidth;
                    setBoxWidth(currentWidth);

                    // Step 2: next frame → animate to target
                    requestAnimationFrame(() => {
                      const targetWidth = 640;
                      setBoxWidth(targetWidth);
                    });
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAsk(); }}
                placeholder="Type here..."
                className="border border-gray-400 bg-transparent text-white placeholder-gray-400 p-3 rounded-lg w-72 outline-none"
              />
              <button
                onClick={handleAsk}
                className="bg-white text-black px-4 py-3.5 text-sm rounded-lg border border-gray-500 hover:bg-gray-300 transition"
              >
                Ask
              </button>
            </div>

            {/* Measuring + animation wrapper */}
            <div style={{ position: "relative" }}>

          {/* Hidden div — invisibly holds the reply text so we can measure its height */}
              <div
                ref={measureRef}
                  className="text-white whitespace-pre-wrap text-sm"
                  style={{
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                    width: boxWidth,
                    minWidth: 0,
                    padding: "0.5rem 0",
                }}
              >
                {reply}
              </div>

              {/* Animated height container */}
              <div
                style={{
                  height: loading ? 28 : error ? 40 : boxHeight,
                  overflow: "hidden",
                  transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  marginTop: loading || boxHeight > 0 ? "1rem" : "0",
                }}
              >
              {loading && (
                <div className="text-gray-300 animate-pulse flex justify-center">
                  Thinking...
                </div>
              )}

              {error ? (
                <div className="text-red-400 text-sm text-center mt-2">
                  {error}
                </div>
              ) : (
                <div
                  className="text-white whitespace-pre-wrap text-sm"
                  style={{
                    opacity: visibleReply ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    padding: "0.5rem 0",
                  }}
                >
                  {visibleReply}
                </div>
              )}
              </div>

          </div>

        </div>

      </div>

      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      />

      {/* Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />

      {/* Hero Content */}
      <div className="relative z-10 flex justify-center text-center text-white pt-44">
        <h1 className="text-4xl font-bold mb-2">Welcome to Josef Ranc's <br />
          Portfolio and Website</h1>
      </div>
    </div>

    {/* CONTENT SECTION */}
    <div className="bg-gray-900 text-white p-6">

    {/* Work Experience Section */}
    <div id="work" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>

      <div className="flex flex-col gap-10">

        {works.map((work, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={work.image}
              className="w-full md:w-1/2 h-64 object-contain rounded-2xl"
              alt={work.title}
            />

            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold">{work.title}</h3>
              <h3 className="text-white font-semibold">{work.role}</h3>
              <ul className="mt-2 text-gray-300 list-disc pl-5 space-y-1">
              {work.description.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}

      </div>
    </div>

    {/* Projects Section */}
    <div id="projects" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>

      <div className="flex flex-col gap-10">

        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={project.image}
              className="w-full md:w-1/2 h-64 object-contain rounded-2xl"
              alt={project.title}
            />

            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <h3 className="text-white font-semibold">{project.role}</h3>
              <p className="text-gray-300 mt-2">{project.description}</p>
              {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
                  >
                    Click here to view my work →
                  </a>
                )}
            </div>
          </div>
        ))}

      </div>
    </div>

          {/* Hobby Section */}
          <div id="hobby" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Hobbies</h2>

          <div className="flex flex-col gap-10">

            {hobby.map((hobby, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={hobby.image}
                  className="w-full md:w-1/2 h-64 object-contain rounded-2xl"
                  alt={hobby.title}
                />

                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold">{hobby.title}</h3>
                  <p className="text-gray-300 mt-2">{hobby.description}</p>
                  {hobby.link && (
                  <a
                    href={hobby.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
                  >
                    Click here to view my work →
                  </a>
                )}
                </div>
              </div>
            ))}

          </div>
        </div>

          {/* Contact Section */}
    <div id="contact" className="text-center scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <Button
        className="rounded-2xl border-2 border-white text-white hover:bg-white transition hover:text-black transition"
        onClick={() => setShowContact(!showContact)}
      >
        Contact Me
      </Button>

      <div
        className={`mt-4 text-gray-300 space-y-1 transition-all duration-500 ease-in-out ${
          showContact
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
      <p>📧 {process.env.NEXT_PUBLIC_EMAIL}</p>
      <p>📞 {process.env.NEXT_PUBLIC_PHONE}</p>
      </div>
    </div>
    <footer className="text-center text-gray-400 text-sm py-6">
    <p>© {new Date().getFullYear()} Josef Ranc. All rights reserved.</p>

    <p className="mt-2">
      Built with Next.js
      <a
        href="https://github.com/WhatzIt2Ya/Josefs_website"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline ml-1"
      >
        View Source Code
      </a>
    </p>
  </footer>
  </div>
  </div>
  );
}