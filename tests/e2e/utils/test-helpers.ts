/**
 * Helpers utilitaires pour les tests Playwright
 */

import { Page } from '@playwright/test';

/**
 * Attend que la page soit complètement chargée et vérifie les erreurs
 */
export async function waitForPageLoad(page: Page, timeout = 10000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Vérifie qu'il n'y a pas d'erreurs dans la console
 */
export async function checkConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return errors;
}

/**
 * Teste une injection XSS dans un champ de saisie
 */
export async function testXSSVulnerability(
  page: Page,
  selector: string,
  payload: string
): Promise<boolean> {
  const input = page.locator(selector);
  if (await input.count() === 0) {
    return false; // Pas de champ trouvé
  }

  await input.fill(payload);
  const content = await page.content();
  
  // Vérifier que le payload n'est pas exécuté
  return !content.includes(payload);
}

/**
 * Vérifie qu'aucune clé API n'est exposée dans le HTML
 */
export function checkAPIKeyExposure(content: string): string[] {
  const apiKeyPatterns = [
    /sk-[a-zA-Z0-9]{20,}/g, // OpenAI keys
    /AIza[a-zA-Z0-9_-]{32,}/g, // Google keys
    /sk-ant-[a-zA-Z0-9_-]{32,}/g, // Anthropic keys
  ];

  const foundKeys: string[] = [];
  
  for (const pattern of apiKeyPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      foundKeys.push(...matches);
    }
  }

  return foundKeys;
}

