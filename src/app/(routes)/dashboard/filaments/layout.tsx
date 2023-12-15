interface FilamentLayoutProps {
  children: React.ReactNode;
}

export default function FilamentLayout({ children }: FilamentLayoutProps) {
  return (
    <>
      <div className="container p-10 pb-16">
        {children}
      </div>
    </>
  );
}
