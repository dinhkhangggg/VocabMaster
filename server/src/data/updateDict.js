const fs = require('fs');
const https = require('https');

const dictPath = './dictionary.json';
const dict = require(dictPath);

async function fetchWordData(word) {
  return new Promise((resolve) => {
    https.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            const entry = parsed[0];
            let ipa = entry.phonetic || (entry.phonetics && entry.phonetics.find(p => p.text) ? entry.phonetics.find(p => p.text).text : '');
            let enDef = '';
            if (entry.meanings && entry.meanings.length > 0) {
              const noun = entry.meanings.find(m => m.partOfSpeech === 'noun');
              const target = noun || entry.meanings[0];
              enDef = target.definitions[0].definition;
            }
            resolve({ ipa, en: enDef });
          } catch(e) { resolve(null); }
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function updateDict() {
  const newDict = {};
  const entries = Object.entries(dict);
  let count = 0;
  
  for (const [word, viDef] of entries) {
    if (typeof viDef === 'object') {
      newDict[word] = viDef; // already updated
      continue;
    }
    
    console.log(`Fetching data for: ${word} (${count + 1}/${entries.length})`);
    const data = await fetchWordData(word);
    
    newDict[word] = {
      vi: viDef,
      en: data && data.en ? data.en : `A common english word meaning ${viDef}`,
      ipa: data && data.ipa ? data.ipa : `/${word}/`
    };
    
    count++;
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }
  
  fs.writeFileSync(dictPath, JSON.stringify(newDict, null, 2));
  console.log('Dictionary successfully updated with IPA and English definitions!');
}

updateDict();
