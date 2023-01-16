import React from "react";
import { BrowseContainer } from "../containers/browse";
import { useContent } from "../hooks";
import { selectionFilter } from "../utils";

export default function Browse() {
  const { series } = useContent("series");
  const slides = selectionFilter({ series });

  return <BrowseContainer slides={slides} />;
}
