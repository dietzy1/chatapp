import Footer from "./Footer";
import { BackgroundBeams } from "./ui/background-beams";

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex  h-screen w-full flex-col items-center  bg-neutral-950 antialiased ">
        <div className="flex h-full  grow flex-col items-center justify-center">
          {children}
        </div>
        <Footer />
        <BackgroundBeams />
      </div>
    </>
  );
}

export default BackgroundWrapper;
