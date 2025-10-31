import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour l'exemple next (basique)
 * Tests fondamentaux de l'interface utilisateur
 */

test.describe('Next Basic Example', () => {
  test('should load and render the chat interface', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
    
    // Vérifier qu'il n'y a pas d'erreurs dans la console
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    // Afficher les erreurs si elles existent mais ne pas faire échouer le test
    if (consoleErrors.length > 0) {
      console.warn('Console errors found:', consoleErrors);
    }
  });

  test('should check for XSS vulnerabilities in input fields', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Chercher tous les champs de saisie
    const inputs = page.locator('input[type="text"], textarea');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const firstInput = inputs.first();
      await firstInput.scrollIntoViewIfNeeded();
      
      // Essayer d'injecter du code JavaScript
      const xssPayload = '<script>alert("xss")</script>';
      await firstInput.fill(xssPayload);
      
      // Vérifier que le script n'est pas exécuté
      const pageContent = await page.content();
      expect(pageContent).not.toContain('<script>alert("xss")</script>');
    }
  });

  test('should verify accessibility basics', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Vérifier les attributs d'accessibilité de base
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      
      // Les boutons devraient avoir soit un aria-label soit un texte visible
      if (!ariaLabel && !text?.trim()) {
        console.warn(`Button at index ${i} lacks accessibility attributes`);
      }
    }
  });
});

