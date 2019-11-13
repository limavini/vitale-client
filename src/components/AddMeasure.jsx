import React, { useState } from "react";
import { Button } from "./Button";

export const AddMeasure = () => {

    return (<Button
        onClick={() => alert("a")}
        background="#71B340"
        hover="#3E6223"
      >
        Nova Medida
      </Button>)
}