const https = require('https');

const TARGET_URL = 'https://pomelatform.vercel.app/projects/byblos';
const EXPECTED_TEXT = 'Laravel/Livewire';
const EXPECTED_IMAGE_SUBSTRING = '/images/byblos-showcase.png';

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
                console.log(`✅ SUCCESS: Found Image Path "${EXPECTED_IMAGE_SUBSTRING}" in HTML.`);

                // Verify the asset itself works (using the full domain)
                const fullAssetUrl = 'https://pomelatform.vercel.app' + EXPECTED_IMAGE_SUBSTRING;
                console.log(`Verifying Asset Reachability: ${fullAssetUrl}`);
                verifyAsset(fullAssetUrl);
            } else {
                console.error(`❌ FAILURE: HTML does not contain "${EXPECTED_IMAGE_SUBSTRING}".`);
            }
        });

    }).on('error', (err) => {
        console.error('❌ Network Error:', err.message);
    });
}

function verifyAsset(url) {
    https.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log(`✅ IMAGE VERIFIED: Asset returned 200 OK.`);
            console.log(`\n🎉 DEPLOYMENT SUCCESSFUL. The image is reachable.`);
        } else {
            console.error(`❌ IMAGE ERROR: Asset returned status ${res.statusCode}.`);
        }
    });
}

// Run
checkUrl();
