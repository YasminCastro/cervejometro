"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-400 py-4">
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <div>
          <a
            href="https://yascastro.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            © {new Date().getFullYear()} Yas Castro™.
          </a>
        </div>
        <div>2.0</div>
      </div>
    </footer>
  );
}
