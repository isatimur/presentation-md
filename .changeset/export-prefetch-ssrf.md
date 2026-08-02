---
"@presentation-md/export": patch
---

Harden PPTX image prefetch against SSRF.

Block private/loopback hostnames before DNS/fetch, revalidate redirects, enforce timeouts and size checks on remote image fetches.
