import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10); // blur when scrolled down a bit
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-30 transition backdrop-blur-sm ${
        isScrolled ? "backdrop-blur-md bg-zinc-900/80" : "bg-transparent"
      } border-b border-white/10 text-white`}>
      <div className="flex flex-col items-center py-4">
        <p className="text-4xl">Luminara Celestis</p>
        <p className="text-lg font-light italic">“The light of the heavens”</p>
      </div>
    </div>
  );
}
