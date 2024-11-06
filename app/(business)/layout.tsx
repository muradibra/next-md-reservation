import { getCurrentUserFromClerk, getCurrentUserFromDb } from "@/actions/user";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import React, { PropsWithChildren } from "react";
import "sweetalert2/src/sweetalert2.scss";

const BusinessLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await getCurrentUserFromClerk();
  const currentUser = userId ? await getCurrentUserFromDb(userId) : null;

  return (
    <div>
      <Header
        userId={userId}
        role={
          typeof currentUser === "string" ? "USER" : currentUser?.role ?? "USER"
        }
      />
      {children}
      <Footer />
    </div>
  );
};

export default BusinessLayout;
