import React, { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  children: ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onClick?: () => void;
  isActive?: boolean;
}

const Tab = ({ children, setPosition, onClick, isActive }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-2.5 md:text-sm font-medium ${
        isActive ? "text-white" : "text-white"
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className="absolute z-0 h-full rounded-full bg-foreground"
      style={{ top: 0 }}
    />
  );
};

export interface SlideTabItem {
  label: string;
  value: string;
}

interface SlideTabsProps {
  tabs: SlideTabItem[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export const SlideTabs = ({ tabs, activeTab, onTabChange, className }: SlideTabsProps) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({ ...pv, opacity: 0 }));
      }}
      className={`relative mx-auto flex w-fit rounded-full border border-border bg-card p-1 ${className ?? ""}`}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          setPosition={setPosition}
          onClick={() => onTabChange?.(tab.value)}
          isActive={activeTab === tab.value}
        >
          {tab.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};
