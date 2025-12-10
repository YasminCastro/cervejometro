"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-400 py-4">
      <div className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yas Castro™. Todos os direitos reservados.
      </div>
    </footer>
  );
}

