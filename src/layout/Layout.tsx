import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { TitleBar } from "./components/titleBar";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-500">
        <Navbar />
      </div>
      <TitleBar title={title} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
