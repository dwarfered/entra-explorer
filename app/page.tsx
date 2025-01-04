"use client";

import Image from "next/image";
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
          Entra Explorer is an open-source solution that leverages Microsoft
          Graph to help administrators retrieve and visualize data from
          Microsoft Entra.
        </p>
      </Body1>
      <Caption1>
        Please note that Entra Explorer is not an official Microsoft product and
        is in no way affiliated with, endorsed by, or sponsored by Microsoft.
      </Caption1>

      <h2>Solution Overview</h2>

      <div style={{ textAlign: "center" }}>
        <Link style={{ padding: "20px" }} href="/entra-explorer.png">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Image
              src="/entra-explorer.png"
              alt="Entra Explorer Architecture"
              width={500}
              height={300}
              layout="responsive"
            />
          </div>
        </Link>
      </div>

      <p>
        Entra Explorer is a single-page application (SPA) hosted on GitHub
        Pages, built with Next.js (a React framework) and styled using
        Microsoft&apos;s Fluent UI. It leverages the Microsoft Authentication Library
        (MSAL) for authentication, with all Microsoft Graph requests handled on
        the client side.
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

      <br />

      <Divider />

      <Caption2>
        MIT License Copyright (c) 2024 Chris Dymond Permission is hereby
        granted, free of charge, to any person obtaining a copy of this software
        and associated documentation files (the &quot;Software&quot;), to deal in the
        Software without restriction, including without limitation the rights to
        use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions: The above
        copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED
        &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
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
