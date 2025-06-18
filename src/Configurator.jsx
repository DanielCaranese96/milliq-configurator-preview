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
    volumetric: true
  },
  {
    name: "Milli-Q EQ 7000",
    tier: 2,
    supports: ["Type I"],
    compliance: ["FDA", "EU"],
    volume: Infinity,
    applications: ["HPLC", "ELISA"],
    install: ["Modular", "Bench", "Wall"],
    volumetric: true
  },
  {
    name: "Milli-Q CLX 7000",
    tier: 3,
    supports: ["Type II", "Type III"],
    compliance: ["CLSI"],
    volume: 3000,
    applications: ["Clinical Analyzers"],
    install: ["Bench", "Wall"],
    volumetric: false
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

  const volumeToNumber = v => {
    switch (v) {
      case "<50":
        return 50;
      case "50–200":
        return 200;
      case "200–1000":
        return 1000;
      case ">1000":
        return 1001;
      default:
        return 0;
    }
  };

  const handleRecommend = () => {
    const match = systems.find(
      s =>
        s.supports.includes(waterType) &&
        s.compliance.includes(compliance) &&
        s.applications.includes(application) &&
        s.volume >= volumeToNumber(volume) &&
        s.install.includes(install) &&
        (!volumetric || s.volumetric === volumetric)
    );

    const fallback = systems.find(s => s.tier === (match?.tier - 1));
    setResult({ match, fallback });
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-gradient-to-br from-[#003366] to-[#3399FF] text-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Merck Milli-Q Configurator</h1>

      {/* Water Type */}
      <Label className="text-white">Required Water Type</Label>
      <select
        value={waterType}
        onChange={e => setWaterType(e.target.value)}
        className="mb-4 text-black"
      >
        <option>Type I</option>
        <option>Type II</option>
        <option>Type III</option>
      </select>

      {/* Application */}
      <Label className="text-white">Application</Label>
      <select
        value={application}
        onChange={e => setApplication(e.target.value)}
        className="mb-4 text-black"
      >
        <option>HPLC</option>
        <option>ICP-MS</option>
        <option>ELISA</option>
        <option>Clinical Analyzers</option>
      </select>

      {/* Compliance */}
      <Label className="text-white">Compliance Requirement</Label>
      <select
        value={compliance}
        onChange={e => setCompliance(e.target.value)}
        className="mb-4 text-black"
      >
        <option>FDA</option>
        <option>EU</option>
        <option>ISO</option>
        <option>CLSI</option>
      </select>

      {/* Daily Volume */}
      <Label className="text-white">Total Daily Volume of Water Use</Label>
      <select
        value={volume}
        onChange={e => setVolume(e.target.value)}
        className="mb-4 text-black"
      >
        <option>&lt;50</option>
        <option>50–200</option>
        <option>200–1000</option>
        <option>&gt;1000</option>
      </select>

      {/* Install Requirements */}
      <Label className="text-white">Special Install Requirements</Label>
      <select
        value={install}
        onChange={e => setInstall(e.target.value)}
        className="mb-4 text-black"
      >
        <option>Bench</option>
        <option>Wall</option>
        <option>Modular</option>
        <option>Desktop</option>
      </select>

      {/* Volumetric */}
      <Label className="text-white">Volumetric Dispensing Required?</Label>
      <select
        value={volumetric}
        onChange={e => setVolumetric(e.target.value === "true")}
        className="mb-6 text-black"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <Button
        onClick={handleRecommend}
        className="w-full bg-white text-blue-900 hover:bg-gray-200"
      >
        Recommend System
      </Button>

      {result && (
        <div className="mt-6">
          {/* Recommended */}
          <Card className="mb-4 bg-white text-black">
            <CardContent>
              <h2 className="font-semibold">Recommended System</h2>
              <p>{result.match ? result.match.name : "No match found"}</p>
            </CardContent>
          </Card>

          {/* Budget Alternative */}
          <Card className="bg-white text-black">
            <CardContent>
              <h2 className="font-semibold">Budget-Conscious Alternative</h2>
              <p>
                {result.fallback ? result.fallback.name : "No fallback available"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Configurator;