import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink } from "lucide-react";
import { ApplicationInformationData } from "./types";

type Props = Pick<ApplicationInformationData, "submission" | "contacts">;

export default function SubmissionContactsSection({ submission, contacts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      {/* Submission */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-3">
            {submission.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">{submission.description}</p>
        </CardContent>
      </Card>

      {/* Contacts */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 hover:text-[#862633] transition-colors mb-3">
            {contacts.title}
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">{contacts.students_union.title}</h4>
            <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
              <a href={`mailto:${contacts.students_union.email}`} className="inline-flex items-center gap-2">
                <Mail size={14} /> {contacts.students_union.email}
              </a>
            </Button>
          </div>

          <h4 className="font-semibold text-gray-900 border-t pt-3 mb-4">{contacts.faculty_councils_title}</h4>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
            {contacts.faculty_councils.map((fc, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-ehk-light-red hover:shadow-md transition-all group flex flex-row items-center justify-between">
                <h4 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-[#862633] transition-colors flex-1">{fc.faculty}</h4>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                    <a href={fc.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${fc.faculty} website`} className="flex justify-center items-center gap-1.5 text-xs font-semibold">
                      <ExternalLink size={12} />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                    <a href={`mailto:${fc.email}`} aria-label={`Email ${fc.faculty}`} title={fc.email} className="flex justify-center items-center gap-1.5 text-xs font-semibold">
                      <Mail size={12} />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
