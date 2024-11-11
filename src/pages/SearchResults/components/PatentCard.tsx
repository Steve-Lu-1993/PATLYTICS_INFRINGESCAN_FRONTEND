import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useLocalTime from "@/hooks/useLocalTime";
import { Patent } from "@/types/entities/patent";
import { formatName } from "@/utilis/nameFormatter";

type PatentCardType = {
  patent: Patent;
};

const PatentCard = ({ patent }: PatentCardType) => {
  const formattedInventors: string[] = Array.from(
    new Set(patent?.inventors?.map(formatName))
  );
  const investorString = formattedInventors.join(", ");

  return (
    <Card className="w-full" style={{ maxWidth: "916px" }}>
      <CardHeader>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{patent?.title}</h1>
          <div className="flex flex-row gap-2">
            <span className="text-sm text-neutral-400 pt-1">
              {patent?.publication_number}
            </span>
            <span className="text-sm text-neutral-400 pt-1">
              {useLocalTime(Number(patent?.publish_date), "d")}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="p-3 mb-1 bg-neutral-100 rounded-md shadow-sm">
            <p className="text-sm text-neutral-700 ">{patent?.abstract}</p>
          </div>
          <div className="text-sm text-neutral-700">
            Inventors: {investorString}
          </div>
          <div className="text-sm text-neutral-700">
            Assignee: {patent?.assignee}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatentCard;
