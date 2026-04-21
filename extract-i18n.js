const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const startStr = 'const translations = {';
const endStr = 'function setLanguage';

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    let translationsStr = html.substring(startIndex + 'const translations = '.length, endIndex);
    translationsStr = translationsStr.trim().replace(/;$/, '');
    
    // Evaluate safely
    const translations = eval('(' + translationsStr + ')');
    
    // Add SEO Title and Description
    const seoData = {
        en: { seo_title: "Brush Jjaemu Game Online - Play Cat Brush Game Full Screen" },
        vi: { seo_title: "Trò Chơi Brush Jjaemu Online - Chơi Game Chải Lông Mèo Toàn Màn Hình" },
        ar: { seo_title: "لعبة Brush Jjaemu على الإنترنت - العب لعبة فرشاة القط بملء الشاشة" },
        zh: { seo_title: "Brush Jjaemu 在线游戏 - 全屏畅玩解压撸猫小游戏" },
        ja: { seo_title: "Brush Jjaemu オンラインゲーム - 全画面で遊べる癒やし系猫の毛づくろいゲーム" },
        ko: { seo_title: "브러쉬 째무 온라인 게임 - 전체 화면 고양이 빗질 게임 플레이" },
        fr: { seo_title: "Jeu Brush Jjaemu en ligne - Jouez au jeu de brosse pour chat en plein écran" },
        lo: { seo_title: "ເກມ Brush Jjaemu ອອນໄລນ໌ - ຫຼິ້ນເກມແປງຂົນແມວເຕັມໜ້າຈໍ" }
    };

    for (const lang in translations) {
        if (seoData[lang]) {
            translations[lang].seo_title = seoData[lang].seo_title;
        }
    }

    fs.writeFileSync('i18n.json', JSON.stringify(translations, null, 4));
    console.log("Extracted to i18n.json");
} else {
    console.log("Could not find start or end index.");
}
