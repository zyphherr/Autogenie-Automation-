import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

@Injectable()
export class AutomationService {

  async submitLead(data: any) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Go to httpbin test form
      await page.goto('https://httpbin.org/forms/post');

      // Fill form fields (based on page input names)
      await page.fill('input[name="custname"]', data.customerName);
      await page.fill('input[name="custtel"]', data.phone);
      await page.fill('input[name="custemail"]', data.email);

      await page.fill('textarea[name="comments"]', data.vehicle);

      // Submit form
      await page.click('button[type="submit"]');

      // Wait for response page
      await page.waitForLoadState('networkidle');

      // Extract confirmation page content
      const pageContent = await page.textContent('body');

      return {
        status: 'SUCCESS',
        confirmationId: `HTTPBIN-${Date.now()}`,
        rawResponse: pageContent?.substring(0, 200), // just preview
      };

    } catch (error) {
      return {
        status: 'FAILED',
        error: error.message,
      };
    } finally {
      await browser.close();
    }
  }
}
