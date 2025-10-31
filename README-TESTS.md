# Tests E2E Playwright

Ce répertoire contient les tests end-to-end (E2E) utilisant Playwright pour simuler l'utilisation réelle des applications exemples.

## Structure

- `tests/e2e/` - Répertoire principal des tests E2E
  - `next-basic.spec.ts` - Tests pour l'exemple Next.js basique
  - `next-openai.spec.ts` - Tests pour l'exemple Next.js avec OpenAI
  - `next-agent.spec.ts` - Tests pour l'exemple Next.js avec agent
  - `security.spec.ts` - Tests de sécurité généraux
  - `playwright.config.examples.ts` - Configuration Playwright
  - `utils/test-helpers.ts` - Helpers utilitaires pour les tests

## Commandes

### Exécuter tous les tests E2E

```bash
pnpm run test:e2e
```

### Exécuter les tests en mode UI (interface graphique)

```bash
pnpm run test:e2e:ui
```

### Exécuter un test spécifique

```bash
cd tests/e2e
pnpm exec playwright test next-openai.spec.ts
```

## Tests de sécurité

Les tests incluent des vérifications pour :

- ✅ Exposition de clés API dans le HTML
- ✅ Vulnérabilités XSS dans les champs de saisie
- ✅ Injection SQL dans les formulaires
- ✅ Gestion appropriée des erreurs
- ✅ Validation des en-têtes de sécurité
- ✅ Vérification des formulaires (méthodes HTTP appropriées)

## CI/CD

Les tests E2E sont automatiquement exécutés dans le workflow GitHub Actions lors des push et pull requests.

## Configuration

Les tests sont configurés pour démarrer automatiquement les serveurs de développement nécessaires :
- Port 3000 : `@example/next`
- Port 3001 : `@example/next-openai`
- Port 3002 : `@example/next-agent`

## Notes

- En mode CI, les tests s'exécutent avec `retries: 2` pour gérer les problèmes de timing
- Les screenshots et vidéos sont générés uniquement en cas d'échec
- Les traces sont conservées en cas d'échec pour faciliter le débogage

