// // 'use client';

// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { ArrowUpRight } from 'lucide-react';
// // import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// // export default function ProjectsSection() {
// //   const customEvents = [
// //     {
// //       category: 'Custom Events',
// //       title: 'Event Management Platform',
// //       image: '/assets/Shaping-the1.png',
// //     },
// //     {
// //       category: 'Custom Events',
// //       title: 'Digital Event Experience',
// //       image: '/assets/Unlocking-Agility.png',
// //     },
// //   ];

// //   const videos = [
// //     {
// //       category: 'Videos',
// //       title: 'Interactive Learning Platform',
// //       videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
// //     },
// //     {
// //       category: 'Videos',
// //       title: 'Environmental Impact Dashboard',
// //       videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
// //     },
// //   ];
// //   const customLeftRef = useScrollAnimation({
// //     animationClass: 'animate-fade-in-left',
// //     initialTransform: 'translateX(-40px)',
// //     threshold: 0.12,
// //     // once: false,
// //   });

// //   const customRightRef = useScrollAnimation({
// //     animationClass: 'animate-fade-in-right',
// //     initialTransform: 'translateX(40px)',
// //     threshold: 0.12,
// //     // once: false,
// //   });

// //   const videoLeftRef = useScrollAnimation({
// //     animationClass: 'animate-fade-in-left',
// //     initialTransform: 'translateX(-40px)',
// //     threshold: 0.12,
// //     // once: false,
// //   });

// //   const videoRightRef = useScrollAnimation({
// //     animationClass: 'animate-fade-in-right',
// //     initialTransform: 'translateX(40px)',
// //     threshold: 0.12,
// //     // once: false,
// //   });

// //   return (
// //     <section className="project-section">
// //       <div className="project-container">

// //         {/* HEADER */}

// //         <div className="project-heading">
// //           <h2 className="project-title">
// //             Our Work <span>Highlights.</span>
// //           </h2>
// //         </div>

// //         {/* CUSTOM EVENTS */}

// //         <div className="project-top-bar">
// //           <h6 className="project-subtitle">
// //             ⬢ Custom Event Platforms
// //           </h6>

// //           <Link href="/" className="projects-btn">
// //             <span>More Events</span>

// //             <div className="projects-btn-icon">
// //               <ArrowUpRight size={18} />
// //             </div>
// //           </Link>
// //         </div>

// //         <div className="project-grid">

// //           {customEvents.map((item, index) => (
// //             <div key={index} className="project-card">

// //               <div className="project-image-wrap">
// //                 <Image
// //                   src={item.image}
// //                   alt={item.title}
// //                   fill
// //                   className="project-image"
// //                 />
// //               </div>

// //               <div className="project-overlay">

// //                 <span className="project-category">
// //                   {item.category}
// //                 </span>

// //                 <div className="project-content">
// //                   <h3>{item.title}</h3>
// //                 </div>

// //               </div>
// //             </div>
// //           ))}

// //         </div>

// //         {/* VIDEO SECTION */}

// //         {/* <div className="project-divider-text">
// //           Featured Video Experiences
// //         </div> */}

// //         <div className="project-top-bar">
// //           <h6 className="project-subtitle">
// //             ⬢ Video Showcase
// //           </h6>

// //           <Link href="/" className="projects-btn">
// //             <span>More Video</span>

// //             <div className="projects-btn-icon">
// //               <ArrowUpRight size={18} />
// //             </div>
// //           </Link>
// //         </div>

// //         <div className="project-grid">

// //           {videos.map((item, index) => (
// //             <div key={index} className="project-card">

// //               <div className="project-video-wrap">
// //                 <iframe
// //                   src={`${item.videoUrl}?rel=0`}
// //                   title={item.title}
// //                   loading="lazy"
// //                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                   allowFullScreen
// //                 />
// //               </div>

// //               <div className="project-overlay">

// //                 <span className="project-category">
// //                   {item.category}
// //                 </span>

// //                 <div className="project-content">
// //                   <h3>{item.title}</h3>
// //                 </div>

// //               </div>
// //             </div>
// //           ))}

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// export default function ProjectsSection() {
//   const customEvents = [
//     {
//       category: 'Custom Events',
//       title: 'Event Management Platform',
//       image: '/assets/Shaping-the1.png',
//     },
//     {
//       category: 'Custom Events',
//       title: 'Digital Event Experience',
//       image: '/assets/Unlocking-Agility.png',
//     },
//   ];

//   const videos = [
//     {
//       category: 'Videos',
//       title: 'Interactive Learning Platform',
//       videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
//     },
//     {
//       category: 'Videos',
//       title: 'Environmental Impact Dashboard',
//       videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
//     },
//   ];

//   const customLeftRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//   });

//   const customRightRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//   });

//   const videoLeftRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//   });

//   const videoRightRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//   });

//   return (
//     <section className="project-section">
//       <div className="project-container">
//         {/* HEADER */}

//         <div className="project-heading">
//           <h2 className="project-title">
//             Our Work <span>Highlights.</span>
//           </h2>
//         </div>

//         {/* CUSTOM EVENTS */}

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">⬢ Custom Events</h6>

//           <Link href="/events" className="talk-btn">
//             <span>More Events</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>
//         </div>

//         <div className="project-grid">
//           {customEvents.map((item, index) => {
//             const slug = item.title
//               .toLowerCase()
//               .replace(/\s+/g, '-')
//               .replace(/[^a-z0-9-]/g, '');

//             return (
//               <Link key={index} href={`/events/${slug}`}>
//                 <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
//                   <div className="project-image-wrap">
//                     <Image src={item.image} alt={item.title} fill className="project-image" />
//                   </div>

//                   <div className="project-overlay">
//                     <span className="project-category">{item.category}</span>

//                     <div className="project-content">
//                       <h3>{item.title}</h3>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* VIDEO SECTION */}

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">⬢ Video Showcase</h6>

//           <Link href="/videos" className="talk-btn">
//             <span>More Videos</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>
//         </div>

//         <div className="project-grid">
//           {videos.map((item, index) => (
//             <div
//               key={index}
//               className="project-card"
//               ref={index === 0 ? videoLeftRef : videoRightRef}
//             >
//               <div className="project-video-wrap">
//                 <iframe
//                   src={`${item.videoUrl}?rel=0`}
//                   title={item.title}
//                   loading="lazy"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>

//               <div className="project-overlay">
//                 <span className="project-category">{item.category}</span>

//                 <div className="project-content">
//                   <h3>{item.title}</h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProjectsSection() {
  const customEvents = [
    {
      category: 'Custom Events',
      title: 'Event Management Platform',
      image: '/assets/Shaping-the1.png',
    },
    {
      category: 'Custom Events',
      title: 'Digital Event Experience',
      image: '/assets/Unlocking-Agility.png',
    },
  ];

  // const videos = [
  //   {
  //     category: 'Videos',
  //     title: 'Interactive Learning Platform',
  //     videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
  //   },
  //   {
  //     category: 'Videos',
  //     title: 'Environmental Impact Dashboard',
  //     videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
  //   },
  // ];

  const customLeftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
  });

  const customRightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
  });

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-heading">
          <h2 className="project-title">
            Our Work <span>Highlights.</span>
          </h2>
        </div>

        <div className="project-top-bar">
          <h6 className="project-subtitle">⬢ Custom Events</h6>

          <Link href="/events" className="talk-btn">
            <span>More Events</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="project-grid">
          {customEvents.map((item, index) => {
            const slug = item.title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '');

            return (
              <Link key={index} href={`/events/${slug}`}>
                <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
                  <div className="project-image-wrap">
                    <Image src={item.image} alt={item.title} fill className="project-image" />
                  </div>

                  <div className="project-overlay">
                    <span className="project-category">{item.category}</span>

                    <div className="project-content">
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
