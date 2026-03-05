import { Card, CardContent } from "@/components/ui/card";
import { ApplicationInformationData } from "./types";

type Props = Pick<ApplicationInformationData, "submission" | "contacts">;

export default function SubmissionContactsSection({ submission, contacts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors mb-3">
            {contacts.title}
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900">{contacts.students_union.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">website: </span>
              <a href={contacts.students_union.website} target="_blank" rel="noopener noreferrer" className="text-[#862633] hover:underline break-all">
                {contacts.students_union.website}
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">email: </span>
              <a href={`mailto:${contacts.students_union.email}`} className="text-[#862633] hover:underline">
                {contacts.students_union.email}
              </a>
            </p>
          </div>

          <h4 className="font-semibold text-gray-900 border-t pt-3 mb-2">{contacts.faculty_councils_title}</h4>
          <div className="space-y-2">
            {contacts.faculty_councils.map((fc, i) => (
              <div key={i} className="text-sm">
                <p className="font-medium text-gray-800">{fc.faculty}</p>
                <p className="text-gray-600">
                  <a href={fc.website} target="_blank" rel="noopener noreferrer" className="text-[#862633] hover:underline break-all">
                    {fc.website}
                  </a>
                </p>
                <p className="text-gray-600">
                  <a href={`mailto:${fc.email}`} className="text-[#862633] hover:underline">
                    {fc.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
