import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] background-images">
      <h1 className="typing-animation">
        Welcome, I'm Mike Guerrero
      </h1>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:opacity-50 hover:scale-120 transition-all duration-300"
          href="https://github.com/mikxvii"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          My Github
        </a>
        <a
          className="flex items-center gap-2 hover:opacity-50 hover:scale-120 transition-all duration-300"
          href="https://www.linkedin.com/in/mikxvii/"          
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="Linkedin icon"
            width={20}
            height={20}
          />
          My LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:opacity-50 hover:scale-120 transition-all duration-300"
          href="/mike_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          My Resume
        </a>
      </footer>
    </div>
  );
}
