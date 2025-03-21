// CumulativeLeanChart.tsx
import React from "react";
import { LeanChart, ChartData } from "../../types/LeanChart";
import LongTermChartComponent from "./LongTermChartComponent";
import CumulativeShortTermChart from "./CumulativeShortTermChart";
import StandardLongTermInputTable from "./StandardLongTermInputTable";
import StandardShortTermInputTable from "./StandardShortTermInputTable";

interface Props {
  leanChart: LeanChart;
  onUpdateShortTerm: (chartData: ChartData, field: "value" | "target" | "comment", newValue: number | string) => void;
  onUpdateLongTerm: (chartData: ChartData, field: "value" | "target" | "comment", newValue: number | string) => void;
}

export const CumulativeLeanChart: React.FC<Props> = ({ leanChart, onUpdateShortTerm, onUpdateLongTerm }) => {
  return (
    <div key={leanChart.id} className="text-center">
      <div className="flex justify-center gap-4">
        <div className="w-1/4 bg-gray-100 rounded-md shadow p-4 border-1 border-gray-300">
          <LongTermChartComponent leanChart={leanChart} title="Trois derniers mois" />
        </div>
        <div className="w-3/4 bg-gray-100 rounded-md shadow p-4 border-1 border-gray-300">
          <CumulativeShortTermChart 
            leanChart={leanChart} 
            tickFormatter={(date) => date.split('-')[0]} // Affiche uniquement le jour
          />
        </div>
      </div>
      <div className="flex justify-center mt-2 gap-4 ">
        <div className="w-1/4 bg-gray-100 rounded-md shadow p-4 border-1 border-gray-300">
          <StandardLongTermInputTable
            leanChart={leanChart}
            onValueChange={(chartData, newValue) => onUpdateLongTerm(chartData, "value", newValue)}
            onTargetChange={(chartData, newTarget) => onUpdateLongTerm(chartData, "target", newTarget)}
            onCommentChange={(chartData, newComment) => onUpdateLongTerm(chartData, "comment", newComment)}
          />
        </div>
        <div className="w-3/4 bg-gray-100 rounded-md shadow p-4 border-1 border-gray-300">
          <StandardShortTermInputTable
            leanChart={leanChart}
            onValueChange={(chartData, newValue) => onUpdateShortTerm(chartData, "value", newValue)}
            onTargetChange={(chartData, newTarget) => onUpdateShortTerm(chartData, "target", newTarget)}
            onCommentChange={(chartData, newComment) => onUpdateShortTerm(chartData, "comment", newComment)}
          />
        </div>
      </div>
    </div>
  );
};
