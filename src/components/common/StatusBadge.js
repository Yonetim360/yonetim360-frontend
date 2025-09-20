import { Badge } from "@/components/ui/badge";
import { getStatus } from "@/utils/StatusHelper";

export default function StatusBadge({ type, status }) {
  const { text, color } = getStatus(type, status);

  return <Badge className={color}>{text}</Badge>;
}
