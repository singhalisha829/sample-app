'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { path: '/file-structure', label: 'File Structure', icon: '📁' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-[20%]'
      }`}
    >
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-end mb-4 hover:bg-gray-700 p-2 rounded"
        >
          {isCollapsed ? '→' : '←'}
        </button>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center ${
                    pathname === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  {!isCollapsed && <span>{item.label}</span>}
                  {isCollapsed && <span>{item.icon}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 