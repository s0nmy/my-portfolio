import { useState } from "react";
import { clampCardSize } from "./cardLayout";
import type { Point, Size } from "./types";

/**
 * Intent:  Root owner of where each card is and how big it is during this visit.
 *          Changes when the layout rules (limits, persistence of arrangement) change.
 * Boundary: in  — nothing. out — positions, sizes (only cards the visitor moved or resized), moveCard, resizeCard.
 * State modeling: two records keyed by card slug; absence means "use the default". The sizes record
 *          is only written through resizeCard, which clamps, so no out-of-limit size can be stored.
 * Update surface: moveCard(slug, point), resizeCard(slug, size).
 * Hidden complexity: size limits per card kind.
 * Composition: written by useCardGestures; read by CanvasPortfolio to build card props and focus targets.
 * Test notes: clampCardSize is pure (cardLayout.ts); the hook itself is two setters.
 */
export function useCardLayout() {
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [sizes, setSizes] = useState<Record<string, Size>>({});

  function moveCard(slug: string, position: Point) {
    setPositions((current) => ({ ...current, [slug]: position }));
  }

  function resizeCard(slug: string, size: Size) {
    const clamped = clampCardSize(slug, size);
    setSizes((current) => ({ ...current, [slug]: clamped }));
  }

  return { positions, sizes, moveCard, resizeCard };
}
