import React from "react";
import NavigationMenuDemo, { Products } from "./components/navbar";
import Voidpage from "./components/voidpage";
import Home from "./components/home";
import Snow from "./components/snow";
function page() {
  return (
    <div>
      <Voidpage />
      <Snow />
    </div>
  );
}

export default page;
