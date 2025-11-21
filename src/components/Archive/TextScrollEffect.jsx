import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';
import './ArchivePage.css';

export default function TextScrollEffect({ children, className = '' }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  // 문자열을 단어로 분리하고, 줄바꿈을 처리
  const processText = (text) => {
    if (typeof text !== 'string') return [];
    
    // 줄바꿈을 특별한 마커로 변환
    const lines = text.split('\n');
    const result = [];
    
    lines.forEach((line, lineIndex) => {
      const words = line.trim().split(/\s+/).filter(w => w.length > 0);
      words.forEach((word, wordIndex) => {
        result.push({ word, isNewLine: lineIndex > 0 && wordIndex === 0 });
      });
    });
    
    return result;
  };

  const processedWords = processText(children);
  
  return (
    <div 
      ref={container}         
      className={`text-scroll-effect ${className}`}
    >
      {processedWords.map((item, i) => {
        const start = i / processedWords.length;
        const end = start + (1 / processedWords.length);
        return (
          <React.Fragment key={i}>
            {item.isNewLine && <br />}
            <Word progress={scrollYProgress} range={[start, end]}>{item.word}</Word>
          </React.Fragment>
        );
      })}
    </div>
  );
}

const Word = ({ children, progress, range }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;
  
  return (
    <span className="text-scroll-effect__word">
      {children.split("").map((char, i) => {
        const start = range[0] + (i * step);
        const end = range[0] + ((i + 1) * step);
        return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>;
      })}
      <span className="text-scroll-effect__space"> </span>
    </span>
  );
};

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className="text-scroll-effect__char">
      <span className="text-scroll-effect__shadow">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

