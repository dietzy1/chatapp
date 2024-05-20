import BackgroundWrapper from "@/components/BackgroundWrapper";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  return (
    <BackgroundWrapper>
      <div className="z-10 w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
        <div className="hidden  lg:block">
          <img
            src="https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your username below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <div
                    /* href="/forgot-password" */
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </div>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  console.log("hello");
                }}
              >
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <div /* href="#" */ className="underline">Sign up</div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default Login;
