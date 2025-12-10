"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-400 py-4">
      <div className="text-center text-sm text-muted-foreground">
        <a
          href="https://yascastro.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors cursor-pointer"
        >
          © {new Date().getFullYear()} Yas Castro™.
        </a>
      </div>
    </footer>
  );
}
