import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

export function SettingsPage() {
  return (
    <Page
      title="Settings"
      description="Keep this minimal until real user preferences exist."
    >
      <div className="space-y-4">
        <Card>
          <h2 className="text-base font-semibold">Frontend starter notes</h2>
          <p className="mt-2 text-sm text-slate-600">
            Add environment configuration, API base URL and user preferences here later.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold">Current choices</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>Vite + React + TypeScript</li>
            <li>React Router</li>
            <li>Tailwind CSS</li>
            <li>Docker Compose dev workflow</li>
          </ul>
        </Card>
      </div>
    </Page>
  );
}