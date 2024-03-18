interface FilamentLayoutProps {
  children: React.ReactNode;
}

export default function FilamentLayout({ children }: FilamentLayoutProps) {
  return (
      <div className="container">
        {children}
      </div>
  );
}
