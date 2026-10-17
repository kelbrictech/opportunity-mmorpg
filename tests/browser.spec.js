import {test,expect} from '@playwright/test';
test('3D client loads and renders three-domain HUD',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8080/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#gameCanvas')).toBeVisible({timeout:30000});
 await expect.poll(()=>page.evaluate(()=>window.__OPPORTUNITY_READY__===true),{timeout:30000}).toBe(true);
 await expect(page.locator('#zone')).toContainText('Residential Area');
 await expect(page.locator('#stats')).toContainText('credits');
 await page.screenshot({path:'artifacts/residential.png',fullPage:true});
 await page.locator('#mapBtn').click();
 await expect(page.locator('#modal')).toBeVisible();
 await page.locator('[data-zone="city"]').click();
 await expect(page.locator('#zone')).toContainText('Big City');
 await page.screenshot({path:'artifacts/city.png',fullPage:true});
 await page.locator('#mapBtn').click();
 await page.locator('[data-zone="rural"]').click();
 await expect(page.locator('#zone')).toContainText('Rural Region');
 await page.screenshot({path:'artifacts/rural.png',fullPage:true});
 expect(errors).toEqual([]);
});
test('career shortcut must charge travel fare',async({page})=>{
 await page.goto('http://127.0.0.1:8080/');
 await expect.poll(()=>page.evaluate(()=>window.__OPPORTUNITY_READY__===true)).toBe(true);
 await page.locator('#careerBtn').click();
 await expect(page.locator('#goCity')).toContainText('15 credits');
 await page.locator('#goCity').click();
 await expect(page.locator('#zone')).toContainText('Big City');
 await expect(page.locator('#stats')).toContainText('1,225 credits');
});
