"use client";
import { CopyOverride } from "@/context/LangContext";
import { LB_COPY } from "@/i18n/local-business";

// Wraps the business page: every section inside shows this page's wording in the visitor's language.
export default function LocalCopy({ children }: { children: React.ReactNode }) {
  return <CopyOverride copyByLang={LB_COPY}>{children}</CopyOverride>;
}
