import { getCurrentUser } from "@/actions/user";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import React, { PropsWithChildren } from "react";

const BusinessLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await getCurrentUser();

  return (
    <div>
      <Header userId={userId} />
      {children}
      <Footer />
    </div>
  );
};

export default BusinessLayout;
