import React from "react";
import InfoBar from "../components/WatchLecture/InfoBar";
import { Info } from "lucide-react";

function WatchLecture() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full gap-10">
        <InfoBar />
      </div>
    </div>
  );
}

export default WatchLecture;
