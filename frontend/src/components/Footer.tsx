/* import { User } from "@/types/user";
import AnimatedTooltip from "./ui/animated-tooltip";

function Footer() {
  const github: User = {
    userId: "1",
    username: "Github.com/dietzy1",
    description: "Aspiring Software Engineer",
    icon: {
      iconId: "1",
      kind: "github",
      link: "data:image/png;base64,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",
    },
    joinDate: "2021-09-01T00:00:00.000Z",
    verified: true,
  };

  const linkedin: User = {
    userId: "2",
    username: "Martin Vad",
    description: "University student",
    icon: {
      iconId: "2",
      kind: "linkedin",
      link: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB2UlEQVR4nO2aPU/DMBBAvbRIdAUxsjHQIhATAz+Ijd+BUKtW5UOCoUICBvgJfKzsQFUmFmYG2kowFB6y8MDgBKdxaZzcW7rc2ZeXuyiNrJQgCIIgCIIjwArQAh6BIdNnaGppAjU1KYAZ4AD4JLuMgD2gPImLvyUcbrxKAA4Jj7bPmf8kPPQ4VH0IaBEuDR8CuoTLgw8BA8Kl70NA0Py3gBP94AFmzW+HAgnoROR3iiKgGpFfoyACKhH5FQoiYC0if5WCCLiMyD+jIAI0F7oTTNvrO3/KlPlvAZlDBKSF6fAF3JkXqx3gCLjPvADlmP9H3DmwFBGzCTzlWcC2Qz3zQC+PAvYT1LRhxiRXAkoJ67rJlQANsAAcA6/6v7x5r1hUFoCtXAngZ7afLeEvwJwlfj1vAvZilt61xM/lTUA3ZumeJb6UNwEfMUu/j1tbSAJiEQEW4pVFi0sECXDNH2cfEWBBOsABlRYS4Jo/zj7SARakAxxQaSEBrvnj7CMdYEE6wAGVFgLHh4A+4fLmQ0CXgh+RaRIudR8CaubIWWjompdTC3D4XJVVWsoXQBm4Jhyukn5md5XQzvg4jMzBTr8X/xtz+quhn7AZOUM4MLXUvc28IAiCIAiqCHwDURfpHYrEI8EAAAAASUVORK5CYII=",
    },
    joinDate: "2021-09-01T00:00:00.000Z",
    verified: true,
  };

  return (
    <>
      <footer className=" w-[90%] grow p-4 text-center text-white ">
        <div className=" mb-4 flex gap-6">
          <a className="z-10 " href="https://github.com/dietzy1">
            <AnimatedTooltip user={github} />
          </a>
          <a
            className="z-10"
            href="https://linkedin.com/in/martin-vad-88472b269"
          >
            <AnimatedTooltip user={linkedin} />
          </a>
          <div className="hidden">
            <a href="https://icons8.com/icon/YSWCDCSF4H3N/github">GitHub</a>
            icon by <a href="https://icons8.com">Icons8</a>
          </div>
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

export default Footer; */
