const RULES={
  etsy:`ETSY: Create a polished, conversion-focused Etsy listing. Title must be natural, search-friendly, and no more than 140 characters. Description should normally be 500-900 words when the supplied product facts support that length. Use clear readable section headings and include: an opening sales paragraph; design story and Biblical meaning based ONLY on supplied scripture/design facts; product details; available colors and sizes; fit/sizing guidance only when supplied; production/shipping details only when supplied; care instructions only when supplied; gift/audience ideas; No Vanity 33 brand/mission language when supplied; and a strong closing CTA. Never pad with invented facts. Return EXACTLY 13 distinct Etsy tags, each concise and relevant. SEO keywords should include useful long-tail phrases without keyword stuffing.`,
  tiktok:`TIKTOK SHOP: Create a mobile-first, conversion-focused product listing. Lead with the strongest benefit/message, then concise scannable details, available colors/sizes, design meaning, and CTA. Keep it substantially shorter than Etsy. Do not invent product specs or shipping claims.`,
  instagram:`INSTAGRAM: Create a polished commerce title and an engaging social-shopping description/caption. Make it warm, Christ-centered, easy to scan, and suitable for Instagram. Include the design meaning, key supplied product details, a natural CTA, and relevant searchable terms without spam.`,
  pinterest:`PINTEREST: Create a search-friendly Pin/product title and useful description built for discovery. Include the Christian design theme, supplied product details, audience/gift relevance, natural keywords, and CTA without keyword stuffing.`
};
export async function onRequestPost({request,env}){try{const{product,channels=[]}=await request.json();if(!product?.name)return Response.json({error:'Product name is required.'},{status:400});if(!env.OPENAI_API_KEY)return Response.json({error:'OPENAI_API_KEY is not configured.'},{status:503});const schema={type:'object',additionalProperties:false,properties:{listings:{type:'object',additionalProperties:{type:'object',additionalProperties:false,properties:{title:{type:'string'},description:{type:'string'},keywords:{type:'string'},tags:{type:'array',items:{type:'string'}},cta:{type:'string'}},required:['title','description','keywords','tags','cta']}}},required:['listings']};const prompt=`You are the senior marketplace copywriter for No Vanity 33. Create channel-specific product listings that are ready for a human review before publishing.

NON-NEGOTIABLE ACCURACY RULES:
- Use only facts present in the product object.
- Never invent materials, fabric weight, garment brand/model, print method, fulfillment/processing times, shipping times, free-shipping promises, scripture references, certifications, fit claims, care instructions, charitable percentages, or product features.
- If a useful section is not supported by product data, omit that claim/section rather than guessing.
- Do not make medical, guaranteed, or unverifiable claims.
- Keep the voice Christ-centered, sincere, confident, community-minded, and focused on the meaning of the design rather than vanity.
- Avoid robotic repetition and keyword stuffing.
- Each channel must be genuinely adapted to that marketplace, not the same paragraph copied four times.

ETSY QUALITY STANDARD:
When Etsy is requested, write the most complete listing. Aim for roughly 500-900 words only when enough supplied facts exist. Use plain-text section headings and short paragraphs/bullets for readability. Explain Biblical symbolism only from the supplied design/scripture information. Include EXACTLY 13 Etsy tags.

Product data:
${JSON.stringify(product,null,2)}

Requested channel requirements:
${channels.map(c=>RULES[c]||c).join('\n\n')}`;const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:env.OPENAI_MODEL||'gpt-5-mini',store:false,input:prompt,text:{format:{type:'json_schema',name:'catalog_listings',strict:true,schema}}})});const d=await r.json();if(!r.ok)throw new Error(d.error?.message||'OpenAI request failed.');return Response.json(JSON.parse(d.output_text))}catch(e){return Response.json({error:e.message||'Generation failed.'},{status:500})}}