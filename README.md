# CatalogFlow AI MVP

Cloudflare Pages + Functions starter for importing a product catalog, generating channel-specific listing copy, reviewing edits, and publishing/exporting to Etsy, TikTok Shop, Instagram/Meta Commerce, and Pinterest.

## Working now
- Import JSON or simple CSV.
- Generate four channel-specific listing packages through the OpenAI Responses API.
- Safe local template fallback when AI is not configured.
- Review and edit each platform's content.
- Create Etsy draft listings after credentials and shop IDs are configured.
- Submit Pinterest catalog item batches after credentials and public image/product URLs are configured.
- Build normalized TikTok Shop and Meta payloads while approvals and category mappings are completed.
- Save work locally and export JSON.

## Deploy
1. Put this folder in a GitHub repository.
2. Connect it to Cloudflare Pages.
3. Leave the build command blank; output directory is `/`.
4. Add `OPENAI_API_KEY` as a Cloudflare secret.
5. Add marketplace credentials only after each developer app is approved.

## Product JSON shape
```json
{
  "id": "lion-of-judah",
  "name": "Lion of Judah Tee",
  "collection": "Premium",
  "price": 35,
  "colors": ["Black", "Navy"],
  "sizes": ["S", "M", "L", "XL", "2XL", "3XL"],
  "frontDesign": "Crowned Lion of Judah artwork",
  "backDesign": "Biblical context on the back",
  "scripture": "Revelation 5:5",
  "image": "https://public-image-url.example/mockup.png",
  "productUrl": "https://novanity33.com/product/lion-of-judah"
}
```

The MVP intentionally creates Etsy drafts rather than activating them immediately, protecting the shop while images, variations, taxonomy, shipping profiles, and required marketplace fields are verified.


## V2 listing quality update
Etsy generation now targets long-form, structured marketplace copy (normally 500-900 words when product data supports it), exactly 13 Etsy tags, stronger SEO phrases, and channel-specific copy for TikTok Shop, Instagram, and Pinterest. The generator is instructed not to invent unsupported product specifications, shipping claims, scripture references, or care details.
