// import { test, expect } from '@playwright/test';

// test.describe('Signup Page', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:3000/signup');
//   });

//   test('has a heading "Sign up"', async ({ page }) => {
//     const heading = await page.$('h2');
//     expect(await heading?.innerText()).toBe('Sign up');
//   });

//   test('can fill and submit the signup form', async ({ page }) => {
//     await page.fill('[name="email"]', 'test@example.com');
//     await page.fill('[name="password"]', 'testpassword');
//     await page.click('button[type="submit"]');

//     // Verify the expected console log
//     await page.waitForFunction(() =>
//       window.console.log.mock.calls.find(([message]) => message === 'Data that would be sent to the API:')
//     );
//   });
// });
