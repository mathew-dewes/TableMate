"use client";

import { useState } from "react";
import BusinessForm from "./business/BusinessForm";
import HoursForm from "./hours/HoursForm";
import SettingsForm from "./settings/SettingsForm";
import TablesForm from "./tables/TablesForm";

type SetupStep =
    | "business"
    | "hours"
    | "settings"
    | "tables";

export default function SetupClient(){
    const [step, setStep] = useState<SetupStep>("settings");
 return (
  <>
    {step === "business" && (
      <BusinessForm />
    )}

    {step === "hours" && (
      <HoursForm />
    )}

    {step === "settings" && (
      <SettingsForm />
    )}

    {step === "tables" && (
      <TablesForm />
    )}
  </>
)

}