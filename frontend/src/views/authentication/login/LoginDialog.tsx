import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import LoginForm from "./LoginForm";
import useRegisterOpenStore from "@/stores/RegisterOpenStore";
import useLoginOpenStore from "@/stores/LoginOpenStore";

function LoginDialog() {
  const { setOpen } = useRegisterOpenStore();
  const { setOpen: setLoginOpen } = useLoginOpenStore();

  const handleOpen = () => {
    setLoginOpen(false);
    setOpen(true);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>

      <LoginForm />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <span className="underline" onClick={handleOpen}>
          Sign up
        </span>
      </div>
    </DialogContent>
  );
}

export default LoginDialog;
