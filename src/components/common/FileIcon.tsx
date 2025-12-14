import { FileText } from "lucide-react";

interface FileIconProps {
  extension: string;
}

export default function FileIcon({ extension }: FileIconProps) {
  const iconClass = "h-6 w-6";
  switch (extension) {
    case "pdf":
      return <FileText className={`${iconClass} text-red-500`} />;
    case "doc":
    case "docx":
      return <FileText className={`${iconClass} text-blue-500`} />;
    case "xls":
    case "xlsx":
      return <FileText className={`${iconClass} text-green-500`} />;
    case "ppt":
    case "pptx":
      return <FileText className={`${iconClass} text-orange-500`} />;
    default:
      return <FileText className={`${iconClass} text-gray-500`} />;
  }
}
