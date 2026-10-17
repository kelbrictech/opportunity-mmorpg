import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',testMatch:'browser.spec.js',use:{browserName:'chromium',headless:true},webServer:{command:'python3 -m http.server 8080 --bind 127.0.0.1',url:'http://127.0.0.1:8080/',reuseExistingServer:!process.env.CI,timeout:30000},retries:process.env.CI?1:0,reporter:'list'});
