'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { CheckpointOption } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CheckpointModalProps {
  isOpen: boolean;
  options: CheckpointOption[];
  onDecision: (optionIndex?: number, customDecision?: string) => void;
}

const optionColors = [
  { bg: 'bg-blue-500/10', border: 'border-blue-500/50', text: 'text-blue-400', button: 'bg-blue-600 hover:bg-blue-700' },
  { bg: 'bg-purple-500/10', border: 'border-purple-500/50', text: 'text-purple-400', button: 'bg-purple-600 hover:bg-purple-700' },
  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/50', text: 'text-emerald-400', button: 'bg-emerald-600 hover:bg-emerald-700' },
  { bg: 'bg-orange-500/10', border: 'border-orange-500/50', text: 'text-orange-400', button: 'bg-orange-600 hover:bg-orange-700' },
];

export function CheckpointModal({ isOpen, options, onDecision }: CheckpointModalProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [customDecision, setCustomDecision] = useState('');

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleChooseOption = (index: number) => {
    onDecision(index);
  };

  const handleCustomDecision = () => {
    if (customDecision.trim()) {
      onDecision(undefined, customDecision.trim());
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="⚠️ Checkpoint Decisório"
      size="6xl"
      headerColor="bg-red-900/50"
      showCloseButton={false}
    >
      <div className="space-y-6">
        <p className="text-zinc-300 text-lg">
          Claude analisou o contexto e gerou as seguintes opções. Escolha a que melhor se adequa:
        </p>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option, index) => {
            const isExpanded = expandedIndex === index;
            const colors = optionColors[index % optionColors.length];

            return (
              <div
                key={index}
                className={cn(
                  'border-2 rounded-xl overflow-hidden transition-all',
                  colors.border,
                  colors.bg
                )}
              >
                {/* Header - Always Visible */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-black/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn('text-xl font-bold', colors.text)}>
                      Opção {index + 1}
                    </span>
                    <span className="text-white font-medium">{option.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className={colors.text} size={24} />
                  ) : (
                    <ChevronDown className={colors.text} size={24} />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-6 pt-0 space-y-4">
                    {/* Positives */}
                    {option.positives.length > 0 && (
                      <div>
                        <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                          ✅ PONTOS POSITIVOS
                        </h4>
                        <ul className="space-y-1">
                          {option.positives.map((positive, i) => (
                            <li key={i} className="text-zinc-300 text-sm flex gap-2">
                              <span>•</span>
                              <span>{positive}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Negatives */}
                    {option.negatives.length > 0 && (
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                          ⚠️ PONTOS NEGATIVOS
                        </h4>
                        <ul className="space-y-1">
                          {option.negatives.map((negative, i) => (
                            <li key={i} className="text-zinc-300 text-sm flex gap-2">
                              <span>•</span>
                              <span>{negative}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Red Flags */}
                    {option.redFlags.length > 0 && (
                      <div>
                        <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                          🚩 RED FLAGS
                        </h4>
                        <ul className="space-y-1">
                          {option.redFlags.map((flag, i) => (
                            <li key={i} className="text-zinc-300 text-sm flex gap-2">
                              <span>•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Choose Button */}
                    <div className="pt-4 border-t border-zinc-700">
                      <button
                        onClick={() => handleChooseOption(index)}
                        className={cn(
                          'w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors shadow-lg',
                          colors.button
                        )}
                      >
                        ✓ Escolher esta opção
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Decision */}
        <div className="pt-6 border-t border-zinc-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={20} />
            Ou escreva sua própria análise/decisão:
          </h3>
          <textarea
            value={customDecision}
            onChange={(e) => setCustomDecision(e.target.value)}
            placeholder="Digite sua decisão personalizada..."
            rows={4}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="mt-3 flex justify-end">
            <Button
              variant="primary"
              onClick={handleCustomDecision}
              disabled={!customDecision.trim()}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
            >
              Confirmar Decisão Personalizada
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
