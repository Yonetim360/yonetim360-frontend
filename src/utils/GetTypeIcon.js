import {
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Presentation,
} from "lucide-react";

const getTypeIcon = (type) => {
  switch (type) {
    case "Telefon":
      return <Phone className="h-4 w-4 text-orange-500" />;
    case "E-posta":
      return <Mail className="h-4 w-4 text-blue-500" />;
    case "Toplantı":
      return <Presentation className="h-4 w-4 text-indigo-500" />;
    case "Yüz Yüze":
      return <Calendar className="h-4 w-4 text-green-500" />;
    case "Video Konferans":
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

export default getTypeIcon;
