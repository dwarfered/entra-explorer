"use client";

import styles from "./page.module.css";
import {
  Body1,
  Caption1,
  Caption2,
  Divider,
  Link,
  Title1,
} from "@fluentui/react-components";

export default function Home() {
  return (
    <main className={styles.container}>
      <Title1>Entra Explorer</Title1>
      <Body1>
        <p>
          Entra Explorer is an open-source tool that helps administrators
          retrieve and visualize information from Microsoft Entra using the
          underlying Microsoft Graph API.
        </p>
      </Body1>
      <Caption1>
        Please note that Entra Explorer is not an official Microsoft product and
        is not affiliated with, endorsed, or sponsored by Microsoft.
      </Caption1>

      <h2>Solution Overview</h2>

      <Link style={{ padding: "20px" }} href="/entraexplorer.png">
        <div style={{ maxWidth: "600px" }}>
          {/* <Image
            src="/entraexplorer.png" // The path to your image
            alt="EntraExplorer Architecture"
            width={500} // Set the width as needed
            height={300} // Set the height as needed
            layout="responsive" // Can be 'fixed', 'responsive', 'intrinsic', or 'fill'
          /> */}
        </div>
      </Link>

      <p>
        Entra Explorer is a Single Page Application (SPA) hosted on GitHub
        Pages, developed using Next.js—a React framework—and styled with
        Microsoft&apos;s FluentUI. It uses the Microsoft Authentication Library (MSAL) for
        authentication, with all data requests to Microsoft Graph handled via
        client-side logic.
      </p>

      <div>
        <Caption1>
          GitHub Source:{" "}
          <Link
            target="_blank"
            href="https://github.com/dwarfered/entra-explorer"
          >
            https://github.com/dwarfered/entra-explorer
          </Link>
        </Caption1>
      </div>
      <div>
        <Caption1>
          Author:{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/chris-dymond/"
          >
            LinkedIn - Chris Dymond
          </Link>
        </Caption1>
      </div>

            <br/>

      <Divider />

      <Caption2>
        MIT License Copyright (c) 2024 Chris Dymond Permission is hereby
        granted, free of charge, to any person obtaining a copy of this software
        and associated documentation files (the "Software"), to deal in the
        Software without restriction, including without limitation the rights to
        use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions: The above
        copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED
        "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
        NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
        COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
        OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.
      </Caption2>
    </main>
  );
}
