'use client';

import React, { useState, useRef } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Upload, File, X } from 'lucide-react';
import { CLAUDE_MODELS } from '@/lib/constants';
import { ClaudeModel } from '@/lib/types';

interface TaskConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: {
    description: string;
    prompt: string;
    model: ClaudeModel;
    attachment?: { filename: string; content: string };
  }) => void;
  initialConfig?: {
    description: string;
    prompt: string;
    model: ClaudeModel;
    attachment?: { filename: string; content: string };
  };
}

export function TaskConfigModal({
  isOpen,
  onClose,
  onSave,
  initialConfig,
}: TaskConfigModalProps) {
  const [description, setDescription] = useState(initialConfig?.description || '');
  const [prompt, setPrompt] = useState(initialConfig?.prompt || '');
  const [model, setModel] = useState<ClaudeModel>(
    initialConfig?.model || 'claude-sonnet-4-20250514'
  );
  const [attachment, setAttachment] = useState<{
    filename: string;
    content: string;
  } | undefined>(initialConfig?.attachment);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setAttachment({
          filename: file.name,
          content,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    onSave({
      description,
      prompt,
      model,
      attachment,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurar Tarefa" size="xl">
      <div className="space-y-6">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Descrição da Tarefa
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Análise de Documentos"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-zinc-500">
            💡 Você pode editar o nome padrão da tarefa
          </p>
        </div>

        {/* Prompt */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Prompt / Instruções
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva o que o Claude deve fazer nesta tarefa..."
            rows={6}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Modelo Claude
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CLAUDE_MODELS.map((modelConfig) => (
              <button
                key={modelConfig.value}
                onClick={() => setModel(modelConfig.value)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  model === modelConfig.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div className="font-medium text-white">{modelConfig.label}</div>
                <div className="text-xs text-zinc-400 mt-1">
                  {modelConfig.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Attachment */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Anexo (.txt)
          </label>
          {attachment ? (
            <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg">
              <File className="text-emerald-400" size={20} />
              <span className="flex-1 text-emerald-400 font-medium">
                {attachment.filename}
              </span>
              <button
                onClick={() => setAttachment(undefined)}
                className="p-1 hover:bg-emerald-500/20 rounded"
              >
                <X className="text-emerald-400" size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-300"
            >
              <Upload size={20} />
              <span>Clique para anexar arquivo .txt</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!description.trim() || !prompt.trim()}
          >
            {initialConfig ? 'Salvar Alterações' : 'Adicionar ao Fluxo'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
