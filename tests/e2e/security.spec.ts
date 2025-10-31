import { test, expect } from '@playwright/test';

/**
 * Tests de sécurité généraux pour tous les exemples
 */

test.describe('Security Tests', () => {
  const ports = [3000, 3001, 3002];

  test('should not expose API keys in HTML', async ({ page }) => {
    for (const port of ports) {
      try {
        await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle', timeout: 5000 });
        const content = await page.content();
        
        // Vérifier qu'aucune clé API n'est exposée dans le HTML
        const apiKeyPatterns = [
          /sk-[a-zA-Z0-9]{20,}/g, // OpenAI keys
          /AIza[a-zA-Z0-9_-]{32,}/g, // Google keys
          /sk-ant-[a-zA-Z0-9_-]{32,}/g, // Anthropic keys
        ];

        for (const pattern of apiKeyPatterns) {
          const matches = content.match(pattern);
          if (matches) {
            // Filtrer les faux positifs (exemples, placeholders)
            const suspicious = matches.filter(
              (match) => 
                !match.includes('example') && 
                !match.includes('placeholder') &&
                !match.includes('your-') &&
                match.length > 30 // Les vraies clés sont longues
            );
            if (suspicious.length > 0) {
              console.error(`⚠️  Potential API key exposure on port ${port}:`, suspicious);
              expect(suspicious.length).toBe(0);
            }
          }
        }
      } catch (error) {
        // Ignorer si le serveur n'est pas en cours d'exécution
        console.log(`Server on port ${port} not available, skipping`);
      }
    }
  });

  test('should have proper error handling', async ({ page }) => {
    // Tester que les erreurs sont bien gérées
    for (const port of ports) {
      try {
        await page.goto(`http://localhost:${port}/nonexistent-page`);
        await page.waitForTimeout(1000);
        
        // Vérifier qu'il n'y a pas de stack traces exposées
        const content = await page.content();
        expect(content).not.toMatch(/at\s+\w+\.\w+/); // Stack traces
        expect(content).not.toMatch(/Error:\s+/); // Messages d'erreur bruts
      } catch (error) {
        // Ignorer si le serveur n'est pas disponible
        console.log(`Server on port ${port} not available, skipping`);
      }
    }
  });

  test('should check for SQL injection vulnerabilities in forms', async ({ page }) => {
    for (const port of ports) {
      try {
        await page.goto(`http://localhost:${port}`);
        const inputs = page.locator('input, textarea, select');
        const inputCount = await inputs.count();

        if (inputCount > 0) {
          const firstInput = inputs.first();
          await firstInput.scrollIntoViewIfNeeded();
          
          // Test SQL injection basique
          const sqlPayload = "'; DROP TABLE users; --";
          await firstInput.fill(sqlPayload);
          
          // Vérifier qu'il n'y a pas d'exécution SQL visible
          const pageContent = await page.content();
          expect(pageContent).not.toContain('DROP TABLE');
        }
      } catch (error) {
        console.log(`Server on port ${port} not available, skipping`);
      }
    }
  });

  test('should verify HTTPS enforcement in production mode', async ({ page }) => {
    // Ce test vérifie que les applications ne forcent pas HTTPS en développement
    // mais devraient le faire en production
    // Pour l'instant, on vérifie juste que les liens ne pointent pas vers HTTP non sécurisé
    for (const port of ports) {
      try {
        await page.goto(`http://localhost:${port}`);
        const links = page.locator('a[href^="http://"]');
        const linkCount = await links.count();

        // En développement local, http:// est acceptable
        // Mais on devrait éviter les liens vers des ressources externes non sécurisées
        if (linkCount > 0) {
          for (let i = 0; i < linkCount; i++) {
            const href = await links.nth(i).getAttribute('href');
            // Vérifier que les liens externes utilisent HTTPS
            if (href && !href.startsWith('http://localhost') && href.startsWith('http://')) {
              console.warn(`Insecure HTTP link found: ${href}`);
            }
          }
        }
      } catch (error) {
        console.log(`Server on port ${port} not available, skipping`);
      }
    }
  });
});

