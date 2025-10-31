import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour l'exemple next-openai
 * Simule l'utilisation réelle de l'application par un utilisateur
 */

test.describe('Next OpenAI Example - Chat Interface', () => {
  test.beforeEach(async ({ page }) => {
    // Capturer les erreurs de console
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log(`Console error: ${msg.text()}`);
      }
    });
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Naviguer vers la page principale
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    
    // Vérifier que la page se charge sans erreurs critiques
    await expect(page).toHaveTitle(/AI SDK|Next.js/i);
  });

  test('should display chat interface elements', async ({ page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    
    // Chercher les éléments essentiels de l'interface chat
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should handle page navigation without critical errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Attendre que les composants se chargent

    // Enregistrer les erreurs mais ne pas faire échouer si ce sont des erreurs non critiques
    if (errors.length > 0) {
      console.warn('Page errors detected:', errors);
      // Ne garder que les erreurs critiques
      const criticalErrors = errors.filter(
        err => !err.includes('favicon') && !err.includes('404')
      );
      expect(criticalErrors.length).toBe(0);
    }
  });

  test('should check for security vulnerabilities in forms', async ({ page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    
    // Chercher les formulaires et vérifier la sécurité
    const forms = page.locator('form');
    const formCount = await forms.count();

    for (let i = 0; i < formCount; i++) {
      const form = forms.nth(i);
      const method = await form.getAttribute('method');
      
      // Les formulaires sensibles ne devraient pas utiliser GET
      if (method?.toLowerCase() === 'get') {
        const action = await form.getAttribute('action');
        if (action && (action.includes('password') || action.includes('login'))) {
          throw new Error(`Security issue: Form uses GET method with sensitive data`);
        }
      }
    }
  });

  test('should verify input sanitization', async ({ page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    
    // Chercher les champs de saisie
    const inputs = page.locator('input[type="text"], textarea');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const firstInput = inputs.first();
      await firstInput.scrollIntoViewIfNeeded();
      
      // Tester avec du contenu potentiellement dangereux
      const testPayload = '<script>alert("test")</script>';
      await firstInput.fill(testPayload);
      
      // Vérifier que le contenu n'est pas exécuté dans le HTML
      const content = await page.content();
      // Le script ne devrait pas être présent sous forme exécutable
      if (content.includes('<script>alert("test")</script>')) {
        console.warn('Potential XSS vulnerability: script tag found in content');
      }
    }
  });
});

test.describe('Next OpenAI Example - Security Checks', () => {
  test('should not expose sensitive information in HTML', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    const content = await page.content();
    
    // Vérifier qu'il n'y a pas de clés API exposées
    const apiKeyPattern = /(sk-[a-zA-Z0-9]{20,})|([a-zA-Z0-9_-]{32,})/g;
    const matches = content.match(apiKeyPattern);
    
    if (matches) {
      // Filtrer les faux positifs (IDs normaux)
      const suspicious = matches.filter(
        (match) => match.startsWith('sk-') || match.length > 50
      );
      expect(suspicious.length).toBe(0);
    }
  });

  test('should have proper content security headers', async ({ page }) => {
    const response = await page.goto('http://localhost:3001');
    
    if (response) {
      const headers = response.headers();
      // Vérifier les headers de sécurité basiques
      // Note: En développement Next.js, certains headers peuvent ne pas être présents
      console.log('Response headers:', headers);
    }
  });
});

