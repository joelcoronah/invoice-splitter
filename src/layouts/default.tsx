export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container mx-auto max-w-7xl px-6 grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <a
          className="flex items-center gap-1 text-current hover:underline"
          href="https://joelcornah.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Joel's homepage"
        >
          <span className="text-muted-foreground">Powered by</span>
          <p className="text-primary">Joel Corona</p>
        </a>
      </footer>
    </div>
  );
}
