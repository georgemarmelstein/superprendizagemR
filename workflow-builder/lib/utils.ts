import { type ClassValue, clsx } from 'clsx';

// Utility for merging class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Parse checkpoint response to extract options
export function parseCheckpointResponse(response: string): {
  title: string;
  positives: string[];
  negatives: string[];
  redFlags: string[];
}[] {
  const options: {
    title: string;
    positives: string[];
    negatives: string[];
    redFlags: string[];
  }[] = [];

  // Try to parse structured response
  // Expected format:
  // OPÇÃO 1: Title
  // PONTOS POSITIVOS:
  // - point 1
  // - point 2
  // PONTOS NEGATIVOS:
  // - point 1
  // RED FLAGS:
  // - flag 1

  const optionMatches = response.matchAll(/(?:OPÇÃO|OPTION)\s*(\d+):\s*([^\n]+)/gi);

  for (const match of optionMatches) {
    const optionNum = parseInt(match[1]);
    const title = match[2].trim();

    // Find the section for this option
    const optionPattern = new RegExp(
      `(?:OPÇÃO|OPTION)\\s*${optionNum}:[\\s\\S]*?(?=(?:OPÇÃO|OPTION)\\s*\\d+:|$)`,
      'i'
    );
    const optionSection = response.match(optionPattern)?.[0] || '';

    // Extract positives
    const positivesMatch = optionSection.match(/PONTOS POSITIVOS:?\s*([\s\S]*?)(?=PONTOS NEGATIVOS|PONTOS DE ATENÇÃO|RED FLAGS|$)/i);
    const positives = positivesMatch
      ? positivesMatch[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-') || line.startsWith('•'))
          .map(line => line.replace(/^[-•]\s*/, ''))
          .filter(Boolean)
      : [];

    // Extract negatives
    const negativesMatch = optionSection.match(/(?:PONTOS NEGATIVOS|PONTOS DE ATENÇÃO):?\s*([\s\S]*?)(?=RED FLAGS|PONTOS POSITIVOS|$)/i);
    const negatives = negativesMatch
      ? negativesMatch[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-') || line.startsWith('•'))
          .map(line => line.replace(/^[-•]\s*/, ''))
          .filter(Boolean)
      : [];

    // Extract red flags
    const redFlagsMatch = optionSection.match(/RED FLAGS:?\s*([\s\S]*?)(?=OPÇÃO|OPTION|$)/i);
    const redFlags = redFlagsMatch
      ? redFlagsMatch[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-') || line.startsWith('•'))
          .map(line => line.replace(/^[-•]\s*/, ''))
          .filter(Boolean)
      : [];

    options.push({
      title,
      positives,
      negatives,
      redFlags,
    });
  }

  // If no options found, create a simple fallback
  if (options.length === 0) {
    options.push({
      title: 'Opção 1',
      positives: ['Análise gerada pelo Claude'],
      negatives: [],
      redFlags: [],
    });
  }

  return options;
}

// Format context for Claude API
export function formatContextForClaude(
  tasks: any[],
  currentTaskIndex: number,
  accumulatedContext: string
): string {
  let context = accumulatedContext;

  // Add previous task results
  for (let i = 0; i < currentTaskIndex; i++) {
    const task = tasks[i];
    if (task.result) {
      context += `\n\n=== ${task.description} ===\n${task.result}`;
    }
  }

  return context;
}
