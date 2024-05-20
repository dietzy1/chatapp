import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useIsMobile from "@/hooks/useIsMobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AnimatedTooltip from "@/components/ui/animated-tooltip";
import { User } from "@/types/user";
import useRandomEmoji from "@/hooks/useRandomEmoji";

export interface RegisterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

//this can be made into a slideshow component for the emoji selection later
function RegisterDialog({ open, setOpen }: RegisterDialogProps) {
  const isMobile = useIsMobile();

  const [selectedEmoji, getRandomEmoji] = useRandomEmoji();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign up</DialogTitle>
            <DialogDescription>
              Come up with a username and select your avatar!
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 flex justify-center border-b pb-4">
            <AnimatedTooltip
              classname="h-24 w-24"
              onClick={getRandomEmoji}
              user={
                {
                  username: "Bob",
                  iconSrc: `https://emojicdn.elk.sh/${selectedEmoji}`,
                } as User
              }
            />
          </div>

          <RegisterForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>

        <RegisterForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default RegisterDialog;

function RegisterForm({}: React.ComponentProps<"form">) {
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(20, {
        message: "Username must be less than 20 characters.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Bob" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Create account
          </Button>
        </form>
      </Form>
    </>
  );
}
