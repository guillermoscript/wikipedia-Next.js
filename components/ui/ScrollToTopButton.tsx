"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowBigUpDash } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given amount
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div id="scrolll" className="scroll-to-top">
      {isVisible && (
        <Button 
            className="fixed bottom-4 right-4 rounded-full shadow-lg"
            onClick={scrollToTop}>
          <ArrowBigUpDash className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
