import "./globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "../providers/react-query-provider";
import { TasksProvider } from "../providers/fake-api-provider";
import { DefaultPageLayout } from "../ui";

export const metadata: Metadata = {
  title: "Subframe Next.js Starter",
  description: "Your starter kit for integrating Subframe into Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <DefaultPageLayout>
          <ReactQueryProvider>
            <TasksProvider>
              {children}
            </TasksProvider>
          </ReactQueryProvider>
        </DefaultPageLayout>
      </body>
    </html>
  );
}
