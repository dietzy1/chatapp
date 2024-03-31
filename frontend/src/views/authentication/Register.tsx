import useCreateUser from "@/api/endpoints/user/createUser";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Register() {
  const mutate = useCreateUser();

  const handleCreateUser = async () => {
    try {
      await mutate.mutateAsync("testbob");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackgroundWrapper>
        <Card className="z-10 w-full max-w-lg">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Personalize your profile with a custom avatar and information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-center space-x-4">
              <div className="space-y-2">
                <div className="aspect-[1/1] overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-800">
                  <img
                    alt="Your avatar"
                    className="object-cover"
                    height="200"
                    src="https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                </div>
                <Button className="" variant="outline">
                  Choose Avatar
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="space-y-1.5">
                <div className="font-medium">Username</div>
                <div className="flex min-h-[36px] w-full items-center">
                  <Input id="username" placeholder="Enter your username" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="min-h-[50px]"
                id="description"
                placeholder="Enter a description about yourself"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateUser} className="w-full">
              Create
            </Button>
          </CardFooter>
        </Card>
      </BackgroundWrapper>
    </>
  );
}

export default Register;
