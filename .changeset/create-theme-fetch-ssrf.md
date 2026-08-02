---
"@presentation-md/create-theme": patch
---

Align brand CSS fetch SSRF checks with shared public-address policy.

Block localhost/internal hostnames and non-global unicast IPs before DNS/fetch, matching Studio/PDF network policy.
