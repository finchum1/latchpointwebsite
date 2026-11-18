import type { Metadata } from "next";
import Image from "next/image";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { BrowserFrame } from "@/components/realestate/frames";
import { Feature, CtaBand } from "@/components/subsite/parts";
import { GroupHeader, SAMPLE } from "@/components/realestate/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/your-day", "Your day: Latchpoint Real Estate", "Open one page and know what today looks like: your schedule in sync with Google Calendar, tasks, deal dates, and new inquiries.");

export default function RealEstateYourDay() {
  return (
    <>
      {/* ------------------------------ Your day -------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <GroupHeader
          h1
          id="home"
          icon={<CalendarBlank weight="regular" className="size-5" />}
          title="Your day"
          body="Open one page and know what today looks like."
        />

        <div className="mt-16">
          <Feature
            eyebrow="Home"
            title="Your day, hour by hour, in sync with Google Calendar."
            body="Connect your Google account and your calendars show up on the dashboard, in day, week, and month views. Block time for a task by dragging it onto the grid. Add or change an appointment here and it changes in Google Calendar, and the other way around."
            bullets={[
              "Pick which calendars to show; calendars you can only view stay view-only",
              "Tasks, deal dates, and appointments share one schedule, with a tray of tasks waiting for a time",
              "New website inquiries are waiting right below, with call, text, and email buttons",
              "Repeating tasks and a scorecard that tracks your year against your goal",
            ]}
            visual={
              <div className="relative pb-6 pr-0 sm:pr-24">
                <BrowserFrame
                  src="/realestate/dash-home-week.jpg"
                  alt="The week view of the schedule, with appointments, tasks, and deal dates on an hourly grid"
                  url="yourbrokerage.com/dashboard"
                  ratio="aspect-[16/10]"
                />
                <figure className="absolute -bottom-2 right-0 hidden w-[200px] overflow-hidden rounded-[14px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:block lg:w-[240px]">
                  <Image
                    src="/realestate/dash-add.jpg"
                    alt="Adding a task to the schedule with a start and end time"
                    width={1700}
                    height={1065}
                    className="h-auto w-full"
                    sizes="240px"
                  />
                </figure>
              </div>
            }
            caption={SAMPLE}
          />
        </div>
      </section>
      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
