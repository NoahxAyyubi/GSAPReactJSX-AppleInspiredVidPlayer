import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const videos = [
  "3209828-uhd_3840_2160_25fps.mp4",
  "4167404-uhd_2160_2880_24fps.mp4",
];

const VideoPlayer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const progressDotsRef = useRef([]);
  const progressBarsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      gsap.to(container, {
        x: `-${currentVideoIndex * 100}%`,
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  }, [currentVideoIndex]);

  const handleTimeUpdate = () => {
    const video = videoRefs.current[currentVideoIndex];
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      gsap.to(progressBarsRef.current[currentVideoIndex], {
        width: `${progress}%`,
        duration: 0.1
      });
    }
  };

  const handlePlay = () => {
    gsap.to(progressDotsRef.current[currentVideoIndex], {
      width: '60px',
      height: '20px',
      borderRadius: '50px',
      duration: 0.5
    });
  };

  const handleEnded = () => {
    gsap.to(progressBarsRef.current[currentVideoIndex], {
      width: '0%', // Resets progress bar width
      duration: 0.3
    });

    gsap.to(progressDotsRef.current[currentVideoIndex], {
      width: '20px',
      height: '20px',
      duration: 0.5
    });

    setCurrentVideoIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % videos.length;
      return nextIndex;
    });
  };

  return (
    <div className="video-container">
      <h4> This is a video carousel demo inspired by Apple.</h4>
      <div className="videos-wrapper" ref={containerRef}>
        {videos.map((video, index) => (
          <video
            key={index}
            ref={el => (videoRefs.current[index] = el)}
            onTimeUpdate={handleTimeUpdate}
            onPlay={handlePlay}
            onEnded={handleEnded}
            controls
            width="100%"
            
            style={{ borderRadius: '55px', flex: '0 0 100%' }} // Ensure full width and maintain aspect ratio
            src={video}
          >
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      <div className="progress-container">
        <div className="progress-dots">
          {videos.map((_, index) => (
            <div
              key={index}
              className="progress-dot"
              ref={el => (progressDotsRef.current[index] = el)}
            >
              <div
                ref={el => (progressBarsRef.current[index] = el)}
                className="progress-bar"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
