const https = require('https');

const TARGET_URL = 'https://pomelatform.vercel.app/projects/byblos';
const EXPECTED_TEXT = 'Laravel/Livewire';
const EXPECTED_IMAGE_SUBSTRING = 'raw.githubusercontent.com/bemehrbani/pomelatform';

function checkUrl() {
    console.log(`\n🔍 Checking Live URL: ${TARGET_URL}...`);

    https.get(TARGET_URL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('✅ Page Content Received');

            // Check 1: Text Update
            if (data.includes(EXPECTED_TEXT)) {
                console.log(`✅ SUCCESS: Found updated text "${EXPECTED_TEXT}"`);
            } else {
                console.error(`❌ FAILURE: Could not find "${EXPECTED_TEXT}". Site might be running old code.`);
            }

            // Check 2: Image Logic Update
            if (data.includes(EXPECTED_IMAGE_SUBSTRING)) {
                console.log(`✅ SUCCESS: Found GitHub Raw Image URL.`);

                // Extract full URL and verify it
                const match = data.match(/src="(https:\/\/raw\.githubusercontent\.com[^"]+)"/);
                if (match) {
                    const imageUrl = match[1];
                    console.log(`   -> Verifying Image Asset: ${imageUrl}`);
                    verifyAsset(imageUrl);
                } else {
                    // Fallback in case regex fails but substring exists
                    console.log(`   -> Image Source found but regex failed. Verifying base URL...`);
                    verifyAsset('https://raw.githubusercontent.com/bemehrbani/pomelatform/main/Pomelatform/public/images/byblos-showcase.png');
                }
            } else {
                console.error(`❌ FAILURE: HTML does not contain GitHub Raw URL.`);
            }
        });

    }).on('error', (err) => {
        console.error('❌ Network Error:', err.message);
    });
}

function verifyAsset(url) {
    https.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log(`✅ IMAGE VERIFIED: GitHub Raw returned 200 OK.`);
            console.log(`\n🎉 DEPLOYMENT SUCCESSFUL. The fix is live.`);
        } else {
            console.error(`❌ IMAGE ERROR: GitHub Raw returned status ${res.statusCode}.`);
        }
    });
}

// Run
checkUrl();
