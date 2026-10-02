"use client";
import { useEffect, useState } from "react";

export function Header() {
 const [isHeroVisible, setHeroVisible] = useState(true);
 useEffect(() => {
   const hero = document.querySelector(".hero");
   if (!hero) return;
   const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { rootMargin: "-64px 0px 0px 0px" });
   observer.observe(hero);
   return () => observer.disconnect();
 }, []);
 return (
<header className={`header ${isHeroVisible ? "hidden-on-hero" : "scrolled"}`}>
        <div className="header-content">
            <div className="logo">
                <h1>Miyu Sone</h1>
                <p className="subtitle">ENGINEER PORTFOLIO</p>
            </div>
            <nav className="nav">
                <a href="#profile" className="nav-link">プロフィール</a>
                <a href="#skills" className="nav-link">スキル</a>
                <a href="#projects" className="nav-link">プロジェクト</a>
                <a href="#activity" className="nav-link">活動</a>
            </nav>
        </div>
    </header>
 );
}
