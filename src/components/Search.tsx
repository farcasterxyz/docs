"use client";

import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

export default function Search() {
  return (
    <DocSearch
      appId="ADFEMXTYRR"
      apiKey="53a9b47bf4d93ee8fa655fec4274538b"
      indexName="farcaster"
    />
  );
}
