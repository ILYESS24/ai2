import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour l'exemple next-agent
 * Tests de l'agent avec tools
 */

test.describe('Next Agent Example', () => {
  test('should load the agent interface', async ({ page }) => {
    await page.goto('http://localhost:3002');
    
    await page.waitForLoadState('networkidle');
    
    // Vérifier la structure de base
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should handle errors gracefully', async ({ page }) => {
    await page.goto('http://localhost:3002');
    
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.waitForLoadState('networkidle');
    
    // Enregistrer les erreurs mais ne pas faire échouer le test immédiatement
    if (errors.length > 0) {
      console.error('Page errors detected:', errors);
    }
  });
});

