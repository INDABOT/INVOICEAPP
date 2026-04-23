import React, { useState, useEffect } from 'react';

export default function Sidebar() {
  // Check local storage for theme preference, default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Whenever the theme changes, update the HTML class and LocalStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <aside className="fixed top-0 left-0 z-50 flex h-[72px] w-full items-center justify-between bg-dark-surface lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-3xl">
       {/* Brand Logo Box */}
       <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-r-3xl bg-primary lg:h-[103px] lg:w-[103px]">
          <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-tl-3xl bg-primary-hover"></div>
          <div className="z-10 h-8 w-8 rounded-full border-4 border-white lg:h-10 lg:w-10 border-r-transparent overflow-hidden">
             <div className="w-full h-1/2 bg-white mt-4"></div>
          </div> 
       </div>

       {/* Theme Toggle & User Avatar */}
       <div className="flex h-full items-center gap-6 pr-6 lg:w-full lg:flex-col lg:justify-end lg:gap-8 lg:pb-8 lg:pr-0">
         
         {/* Theme Toggle Button */}
         <button 
           onClick={toggleTheme}
           className="text-ink-purple transition-colors hover:text-ink-blueish"
           aria-label="Toggle Dark Mode"
         >
            {theme === 'light' ? (
              // Moon Icon
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"/>
              </svg>
            ) : (
              // Sun Icon
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.889 15.111a5.222 5.222 0 110-10.444 5.222 5.222 0 010 10.444zm0-1.889a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM9.889 2.833a.944.944 0 01.944-.944V.944a.944.944 0 11-1.889 0v.945c0 .521.423.944.945.944zm0 14.334a.944.944 0 01-.945.944v.945a.944.944 0 111.889 0v-.945a.944.944 0 01-.944-.944zM2.833 9.889a.944.944 0 01-.944-.945H.944a.944.944 0 110 1.889h.945a.944.944 0 01.944-.944zm14.334 0a.944.944 0 01.944.945h.945a.944.944 0 110-1.889h-.945a.944.944 0 01-.944.944zM4.889 4.889a.944.944 0 01-1.336 0l-.668-.668a.944.944 0 111.336-1.336l.668.668a.944.944 0 010 1.336zm10.222 10.222a.944.944 0 011.336 0l.668.668a.944.944 0 11-1.336 1.336l-.668-.668a.944.944 0 010-1.336zM4.889 14.889a.944.944 0 010 1.336l-.668.668a.944.944 0 11-1.336-1.336l.668-.668a.944.944 0 011.336 0zm10.222-10.222a.944.944 0 010-1.336l.668-.668a.944.944 0 111.336 1.336l-.668.668a.944.944 0 01-1.336 0z"/>
              </svg>
            )}
         </button>
         
         <div className="h-full w-[1px] bg-dark-border lg:h-[1px] lg:w-full"></div>
         
         <div className="h-8 w-8 overflow-hidden rounded-full bg-ink-gray lg:h-10 lg:w-10">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="User Avatar" />
         </div>
       </div>
    </aside>
  );
}