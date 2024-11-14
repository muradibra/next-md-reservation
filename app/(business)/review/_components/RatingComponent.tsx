import React from "react";
import { Rating } from "primereact/rating";

type Props = {
  value: number;
  setValue: (value: number) => void;
};

export const RatingComponent = ({ value, setValue }: Props) => {
  return (
    <div className="">
      <Rating value={value} onChange={(e) => setValue(e.value ?? 0)} />
    </div>
  );
};
