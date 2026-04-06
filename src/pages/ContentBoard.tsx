import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Plus, MoreVertical, MessageSquare, Linkedin, Twitter, Mail, ExternalLink, AlertCircle, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';
import { ContentPiece, ContentStatus } from '../types';

const columns: { id: ContentStatus; label: string }[] = [
  { id: 'draft', label: 'DRAFT' },
  { id: 'approved', label: 'APPROVED' },
  { id: 'scheduled', label: 'SCHEDULED' },
  { id: 'posted', label: 'LIVE' },
];

export function ContentBoard() {
  const [content, setContent] = useState<ContentPiece[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [pendingMove, setPendingMove] = useState<{ id: string; status: ContentStatus } | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('omega_content');
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      // Initial mock data if nothing saved
      const mockData: ContentPiece[] = [
        {
          id: '1',
          product_id: 'p1',
          type: 'REDDIT POST',
          title: 'How I automated my entire client onboarding with free tools',
          body: '...',
          platform: 'reddit',
          framework: 'PAS',
          aida_stage: 'awareness',
          status: 'draft',
        },
        {
          id: '4',
          product_id: 'p1',
          type: 'LINKEDIN POST',
          title: 'Stop wasting 3 hours on emails — here\'s my AI fix',
          body: '...',
          platform: 'linkedin',
          framework: 'BAB',
          aida_stage: 'interest',
          status: 'approved',
        },
      ];
      setContent(mockData);
      localStorage.setItem('omega_content', JSON.stringify(mockData));
    }
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      if (source.droppableId === 'draft' && destination.droppableId === 'approved') {
        setPendingMove({ id: draggableId, status: 'approved' });
        setIsReviewModalOpen(true);
        setHasReviewed(false);
        return;
      }

      const newContent = content.map(item => {
        if (item.id === draggableId) {
          return { ...item, status: destination.droppableId as ContentStatus };
        }
        return item;
      });
      setContent(newContent);
      localStorage.setItem('omega_content', JSON.stringify(newContent));
    }
  };

  const confirmMove = () => {
    if (!pendingMove || !hasReviewed) return;
    const newContent = content.map(item => {
      if (item.id === pendingMove.id) {
        return { ...item, status: pendingMove.status };
      }
      return item;
    });
    setContent(newContent);
    localStorage.setItem('omega_content', JSON.stringify(newContent));
    setIsReviewModalOpen(false);
    setPendingMove(null);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'reddit': return <MessageSquare className="w-4 h-4 text-red-500" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-500" />;
      case 'twitter': return <Twitter className="w-4 h-4 text-sky-400" />;
      case 'medium': return <ExternalLink className="w-4 h-4 text-text" />;
      case 'email': return <Mail className="w-4 h-4 text-accent" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Board</h1>
          <p className="text-muted mt-1">Drag cards between columns · Approved cards auto-schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-surface transition-colors font-medium">
            <Filter className="w-4 h-4" /> FILTER
          </button>
          <button className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-md font-bold hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> GENERATE BATCH
          </button>
        </div>
      </header>

      {/* First Win Banner */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-accent/10 rounded-full">
            <Rocket className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="font-medium text-accent">First win goal: <span className="text-text">Approve one post today. Drag the top Reddit card to "Approved" to get started.</span></p>
          </div>
        </div>
        <button className="text-accent font-mono text-xs uppercase tracking-widest hover:underline">
          SHOW ME
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-350px)]">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">{column.label}</span>
                <span className="text-muted text-xs">{content.filter(c => c.status === column.id).length}</span>
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex-1 bg-surface/50 border border-border rounded-lg p-3 space-y-3 overflow-y-auto transition-colors",
                      snapshot.isDraggingOver && "bg-surface border-accent/30"
                    )}
                  >
                    {content
                      .filter((item) => item.status === column.id)
                      .map((item, index) => (
                        // @ts-ignore - key is required by React but not in DraggableProps
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "bg-surface border border-border p-4 rounded-md shadow-sm hover:border-accent/50 transition-all group",
                                snapshot.isDragging && "rotate-2 scale-105 shadow-xl border-accent z-50"
                              )}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  {getPlatformIcon(item.platform)}
                                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{item.type}</span>
                                </div>
                                <MoreVertical className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                              </div>
                              <h3 className="text-sm font-medium leading-snug mb-4 line-clamp-2">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="bg-muted/20 text-muted px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">
                                  {item.framework}
                                </span>
                                <span className="text-muted text-[9px] font-bold tracking-widest uppercase">
                                  {item.aida_stage}
                                </span>
                              </div>
                              {item.status === 'posted' && (
                                <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2">
                                  <div className="text-center p-1 rounded bg-accent/5 border border-accent/10">
                                    <div className="text-accent font-bold text-xs">{item.clicks || 0}</div>
                                    <div className="text-[8px] text-muted uppercase tracking-widest">Clicks</div>
                                  </div>
                                  <div className="text-center p-1 rounded bg-secondary/5 border border-secondary/10">
                                    <div className="text-secondary font-bold text-xs">{item.conversions || 0}</div>
                                    <div className="text-[8px] text-muted uppercase tracking-widest">Sales</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                    
                    {column.id === 'draft' && (
                      <div className="border border-dashed border-border rounded-md p-4 flex items-center justify-center text-muted text-xs">
                        ← Drag here to revert to draft
                      </div>
                    )}
                    {column.id === 'approved' && (
                      <div className="border border-dashed border-border rounded-md p-4 flex items-center justify-center text-muted text-xs">
                        Drag a Draft here to approve it ↓
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-border rounded-lg w-full max-w-md p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3 text-orange-400">
                <AlertCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">Human Review Required</h2>
              </div>
              
              <p className="text-muted text-sm leading-relaxed">
                Reddit and LinkedIn ban AI-sounding posts. Please edit the content to add your unique voice before approving.
              </p>

              <label className="flex items-start gap-3 p-4 bg-background border border-border rounded-md cursor-pointer group hover:border-accent transition-colors">
                <input 
                  type="checkbox" 
                  checked={hasReviewed}
                  onChange={(e) => setHasReviewed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent bg-surface"
                />
                <span className="text-sm font-medium group-hover:text-text transition-colors">
                  I have reviewed this content and added my own voice to ensure it doesn't sound like generic AI.
                </span>
              </label>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-md border border-border font-medium hover:bg-surface transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={confirmMove}
                  disabled={!hasReviewed}
                  className="flex-1 bg-accent text-background py-3 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  CONFIRM APPROVAL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
