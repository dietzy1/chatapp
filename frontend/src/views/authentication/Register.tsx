import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";

import useIsMobile from "@/hooks/useIsMobile";
import RegisterDialog from "./register/RegisterDialog";
import RegisterDrawer from "./register/RegisterDrawer";

export interface RegisterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Register({ open, setOpen }: RegisterProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <RegisterDialog />
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <RegisterDrawer />
    </Drawer>
  );
}

export default Register;
