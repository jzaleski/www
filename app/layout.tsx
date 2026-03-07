import type { Metadata } from "next";

import "./globals.css";
import ModeSetter from "./components/ModeSetter";

export const metadata: Metadata = {
  title: "Jonathan W. Zaleski - Resume",
  description:
    "Highly skilled, versatile and reliable technical leader with a demonstrated history of working in the internet industry. Polyglot skilled in software development, scalability and agile methodologies. Dedicated leader and innovator who continuously strives for excellence. Bachelor of Arts (B.A.) focused in Computer Science, Environmental Science & Math from Westfield State University.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ModeSetter />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
