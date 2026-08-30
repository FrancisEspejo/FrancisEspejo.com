# francisespejo.com

![pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222)
![license](https://img.shields.io/badge/license-MIT-green)

Personal landing page. One screen with my social links and the way into my blog,
nothing else.

**[francisespejo.com](https://francisespejo.com)**

## What it is

A static site with no framework, no build step and no dependencies. Plain HTML,
CSS and JavaScript, served straight from GitHub Pages.

The whole thing is a single screen. Name, what I do, avatar, and a row of icons
pointing to X, my blog, Letterboxd, Goodreads, GitHub and email. If you are
looking for the long form writing, it lives at
[blog.francisespejo.com](https://blog.francisespejo.com).

I keep it deliberately small. A landing page that needs npm install is a landing
page that will break in two years when I am not looking.

## Stack

- HTML and CSS, no framework
- A little vanilla JavaScript for the entrance animation
- GitHub Pages for hosting, with HTTPS and a custom domain
- `sitemap.xml` and `robots.txt` for search engines

## Running it locally

No build step, so any static server works.

```bash
git clone https://github.com/FrancisEspejo/francisespejo.com.git
cd francisespejo.com
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

Push to `main` and GitHub Pages picks it up. The `CNAME` file holds the custom
domain, and the DNS lives in Cloudflare pointing at the GitHub Pages addresses.

## Related

- [blog.francisespejo.com](https://blog.francisespejo.com) is the blog, built with Astro
- [domainwalk](https://github.com/FrancisEspejo/Domainwalk) is a CLI I wrote that audits the public surface of a domain

## License

MIT, see [LICENSE](https://github.com/FrancisEspejo/francisespejo.com/blob/main/LICENSE).
