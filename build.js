const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const i18n = JSON.parse(fs.readFileSync('i18n.json', 'utf8'));
const baseHtml = fs.readFileSync('index.html', 'utf8');

const langs = ['en', 'vi', 'ar', 'zh', 'ja', 'ko', 'fr', 'lo'];

langs.forEach(lang => {
    // English is the base, we will overwrite index.html as well for the sake of completeness, 
    // but wait, we shouldn't overwrite the template unless we know what we are doing.
    // Actually, it's safe to generate the English one to the root index.html, but let's output to a dist folder to be safe.
    // Or we just generate /lang/index.html and leave the root index.html as English.
    
    if (lang === 'en') {
        // We already have index.html, but let's make sure it has the right canonical and texts just in case.
        // Actually, the current index.html IS English. We don't need to generate it, except maybe update canonical.
        return;
    }

    console.log(`Building for ${lang}...`);
    const $ = cheerio.load(baseHtml);
    const dict = i18n[lang];

    // 1. Update html lang and dir
    $('html').attr('lang', lang);
    if (lang === 'ar') {
        $('html').attr('dir', 'rtl');
    }

    // 2. Update SEO Title and Description
    if (dict.seo_title) {
        $('title').text(dict.seo_title);
        $('meta[property="og:title"]').attr('content', dict.seo_title);
        $('meta[name="twitter:title"]').attr('content', dict.seo_title);
    }
    if (dict.footer_seo_desc) {
        $('meta[name="description"]').attr('content', dict.footer_seo_desc);
        $('meta[property="og:description"]').attr('content', dict.footer_seo_desc);
        $('meta[name="twitter:description"]').attr('content', dict.footer_seo_desc);
    }
    
    // We didn't add seo_desc to the dictionary, but we can do it if needed. 
    // Wait, we didn't add it in extract-i18n.js. Let's just use the default or if we have it.
    
    // Update Canonical
    $('link[rel="canonical"]').attr('href', `https://brushjjaemu.fun/${lang}/`);

    // 3. Update Texts
    $('[data-i18n]').each((i, el) => {
        const key = $(el).attr('data-i18n');
        if (dict[key]) {
            $(el).html(dict[key]);
        }
    });

    $('[data-i18n-placeholder]').each((i, el) => {
        const key = $(el).attr('data-i18n-placeholder');
        if (dict[key]) {
            $(el).attr('placeholder', dict[key]);
        }
    });

    // 4. Update asset paths for subdirectory
    $('img[src="logo.png"]').attr('src', '../logo.png');
    $('img[src="brush-jjaemu.png"]').attr('src', '../brush-jjaemu.png');

    // 5. Save to subdirectory
    const dir = path.join(__dirname, lang);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(path.join(dir, 'index.html'), $.html());
});

console.log("Build complete!");
