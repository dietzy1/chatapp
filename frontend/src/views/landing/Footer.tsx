import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <>
      <footer className=" w-[90%] p-4 text-center text-white">
        <div className=" mb-4 flex gap-4">
          <a href="https://github.com/dietzy1" className="z-10">
            <GitHubLogoIcon className="h-6 w-6 hover:text-gray-400 " />
          </a>
          <a
            href="https://www.linkedin.com/in/martin-vad-88472b269/"
            className="z-10"
          >
            <LinkedInLogoIcon className="h-6 w-6 hover:text-gray-400" />
          </a>
        </div>
        <div className="flex justify-center border-t border-gray-600 py-2">
          <p className="text-center text-sm text-neutral-400">
            Made with 😡 by Martin
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
