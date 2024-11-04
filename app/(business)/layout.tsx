import { getCurrentUserFromClerk, getCurrentUserFromDb } from "@/actions/user";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import React, { PropsWithChildren } from "react";
import "sweetalert2/src/sweetalert2.scss";

const BusinessLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await getCurrentUserFromClerk();
  const { role } = await getCurrentUserFromDb(userId!);

  return (
    <div>
      <Header userId={userId} role={role} />
      {children}
      <Footer />
    </div>
  );
};

export default BusinessLayout;
