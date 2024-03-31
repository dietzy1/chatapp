import "./loading.css";

import BackgroundWrapper from "@/components/BackgroundWrapper";

function Authentication() {
  return (
    <>
      <BackgroundWrapper>
        <span className="loader h-16" />
        <div className="text mb-10  font-sans text-3xl font-bold">
          Does authentication work today?
        </div>

        <div className="mb-4 font-sans font-semibold">Perhabs...</div>
      </BackgroundWrapper>
    </>
  );
}

export default Authentication;
