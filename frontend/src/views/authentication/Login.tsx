import { Drawer } from "@/components/ui/drawer";
import useIsMobile from "@/hooks/useIsMobile";
import { Dialog } from "@radix-ui/react-dialog";
import LoginDialog from "./login/LoginDialog";
import LoginDrawer from "./login/LoginDrawer";

export interface LoginProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Login({ open, setOpen }: LoginProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <LoginDialog />
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <LoginDrawer />
    </Drawer>
  );
}

export default Login;
