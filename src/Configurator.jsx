import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const systems = [
  {
    name: "Milli-Q IQ 7000",
    tier: 3,
    supports: ["Type I", "Type II"],
    compliance: ["FDA", "EU", "ISO"],
    volume: 200,
    applications: ["HPLC", "ICP-MS"],
    install: ["Modular", "Desktop"],
    volumetric: true,
  },
  {
    name: "Milli-Q EQ 7000",
    tier: 2,
    supports: ["Type I"],
    compliance: ["FDA", "EU"],
    volume: Infinity,
    applications: ["HPLC", "ELISA"],
    install: ["Modular", "Bench", "Wall"],
    volumetric: true,
  },
  {
    name: "Milli-Q CLX 7000",
    tier: 3,
    supports: ["Type II", "Type III"],
    compliance: ["CLSI"],
    volume: 3000,
    applications: ["Clinical Analyzers"],
    install: ["Bench", "Wall"],
    volumetric: false,
  }
];

function Configurator() {
  const [waterType, setWaterType] = useState("Type I");
  const [application, setApplication] = useState("HPLC");
  const [compliance, setCompliance] = useState("FDA");
  const [volume, setVolume] = useState("<50");
  const [install, setInstall] = useState("Bench");
  const [volumetric, setVolumetric] = useState(true);
  const [result, setResult] = useState(null);

  const volumeToNumber = (v) => {
    switch (v) {
      case "<50": return 50;
      case "50–200": return 200;
      case "200–1000": return 1000;
      case ">1000": return 1001;
      default: return 0;
    }
  };

  const handleRecommend = () => {
    const match = systems.find(
      (s) =>
        s.supports.includes(waterType) &&
        s.compliance.includes(compliance) &&
        s.applications.includes(application) &&
        s.volume >= volumeToNumber(volume) &&
        s.install.includes(install) &&
        (!volumetric || s.volumetric === volumetric)
    );

    const fallback = systems.find((s) => s.tier === (match?.tier - 1));
    setResult({ match, fallback });
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-gradient-to-br from-[#003366] to-[#3399FF] text-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Merck Milli-Q Configurator</h1>

      <Label className="text-white">Required Water
