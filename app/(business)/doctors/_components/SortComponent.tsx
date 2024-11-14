"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const SortComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // console.log("------searchParams------", searchParams.get("sort"));

  return (
    <div className="mb-3">
      <Select
        onValueChange={(value) => {
          // searchParams.set("sort", value);
          router.push(`?sort=${value}`);
        }}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue
            placeholder={searchParams.get("sort") ?? "Select a sort"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="cursor-pointer" value="firstName-asc">
            Firstname <ArrowUp className="w-4 h-4 inline-block" />
          </SelectItem>
          <SelectItem className="cursor-pointer" value="firstName-desc">
            Firstname <ArrowDown className="w-4 h-4 inline-block" />
          </SelectItem>

          <SelectItem className="cursor-pointer" value="lastName-asc">
            Lastname <ArrowUp className="w-4 h-4 inline-block" />
          </SelectItem>
          <SelectItem className="cursor-pointer" value="lastName-desc">
            Lastname <ArrowDown className="w-4 h-4 inline-block" />
          </SelectItem>

          <SelectItem className="cursor-pointer" value="specialty-asc">
            Specialty <ArrowUp className="w-4 h-4 inline-block" />
          </SelectItem>
          <SelectItem className="cursor-pointer" value="specialty-desc">
            Specialty <ArrowDown className="w-4 h-4 inline-block" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
