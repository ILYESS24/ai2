#!/usr/bin/env tsx

/**
 * Script d'audit de sécurité pour vérifier les vulnérabilités communes
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface SecurityIssue {
  file: string;
  line: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
  type: string;
}

const issues: SecurityIssue[] = [];

// Patterns à rechercher pour les vulnérabilités
const securityPatterns = [
  {
    name: 'Hardcoded API Keys',
    pattern: /(?:api[_-]?key|apikey|secret[_-]?key|private[_-]?key)\s*[:=]\s*['"](sk-|AIza|sk-ant-)[a-zA-Z0-9_-]{20,}/i,
    severity: 'high' as const,
  },
  {
    name: 'Eval usage',
    pattern: /\beval\s*\(/,
    severity: 'high' as const,
  },
  {
    name: 'InnerHTML with user input',
    pattern: /\.innerHTML\s*=\s*.*\$?\{|\.innerHTML\s*=\s*[^'"]*\+/,
    severity: 'medium' as const,
  },
  {
    name: 'SQL Injection risk',
    pattern: /(?:query|sql|db\.(query|execute))\s*\(\s*[`'"][^`'"]*\$?\{[^}]*\}/i,
    severity: 'high' as const,
  },
  {
    name: 'Dangerous shell execution',
    pattern: /(?:exec|spawn|execSync)\s*\([^)]*\+/,
    severity: 'high' as const,
  },
  {
    name: 'Weak crypto',
    pattern: /(?:md5|sha1)\s*\(/i,
    severity: 'medium' as const,
  },
];

function scanFile(filePath: string): void {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      securityPatterns.forEach(({ name, pattern, severity }) => {
        if (pattern.test(line)) {
          // Vérifier si c'est dans un commentaire
          const commentIndex = Math.min(
            line.indexOf('//'),
            line.indexOf('/*'),
            line.indexOf('*')
          );
          const codeBeforeComment = commentIndex > 0 ? line.substring(0, commentIndex) : line;

          if (pattern.test(codeBeforeComment)) {
            issues.push({
              file: filePath,
              line: index + 1,
              severity,
              message: `Potential ${name} vulnerability`,
              type: name,
            });
          }
        }
      });
    });
  } catch (error) {
    // Ignorer les erreurs de lecture (fichiers binaires, etc.)
  }
}

function scanDirectory(dir: string, extensions = ['.ts', '.tsx', '.js', '.jsx']): void {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    // Ignorer les dossiers node_modules, .git, etc.
    if (entry === 'node_modules' || entry === '.git' || entry === 'dist' || entry === 'build') {
      continue;
    }

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, extensions);
    } else if (stat.isFile()) {
      const ext = entry.substring(entry.lastIndexOf('.'));
      if (extensions.includes(ext)) {
        scanFile(fullPath);
      }
    }
  }
}

// Scanner les répertoires principaux
console.log('🔍 Running security audit...\n');

const directoriesToScan = [
  './examples',
  './packages',
];

directoriesToScan.forEach(dir => {
  try {
    scanDirectory(dir);
  } catch (error) {
    console.warn(`⚠️  Could not scan ${dir}:`, error);
  }
});

// Afficher les résultats
if (issues.length === 0) {
  console.log('✅ No obvious security vulnerabilities found!\n');
  process.exit(0);
} else {
  console.log(`\n⚠️  Found ${issues.length} potential security issues:\n`);

  const grouped = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) {
      acc[issue.type] = [];
    }
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, SecurityIssue[]>);

  Object.entries(grouped).forEach(([type, typeIssues]) => {
    console.log(`\n${type} (${typeIssues.length} issues):`);
    typeIssues.forEach(issue => {
      console.log(`  ${issue.severity.toUpperCase()}: ${issue.file}:${issue.line} - ${issue.message}`);
    });
  });

  const highSeverity = issues.filter(i => i.severity === 'high').length;
  if (highSeverity > 0) {
    console.log(`\n❌ Found ${highSeverity} HIGH severity issues!`);
    process.exit(1);
  } else {
    console.log('\n⚠️  Found medium/low severity issues. Please review.');
    process.exit(0);
  }
}

