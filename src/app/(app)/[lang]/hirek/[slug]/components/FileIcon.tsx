"use client"

import { File, FileText } from "lucide-react"

interface FileIconProps {
  type?: string | null
  className?: string
}

export function FileIcon({ type, className = "w-4 h-4" }: FileIconProps) {
  const t = (type || "").toLowerCase()
  if (t.includes("pdf")) return <FileText className={`${className} text-red-500`} />
  if (t.includes("word") || t.includes("document") || t.includes("msword")) return <FileText className={`${className} text-blue-500`} />
  if (t.includes("excel") || t.includes("spreadsheet") || t.includes("sheet")) return <FileText className={`${className} text-green-500`} />
  return <File className={`${className} text-gray-500`} />
}
