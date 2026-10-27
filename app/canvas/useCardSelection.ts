import { useReducer } from "react";

type State = { selected: string; order: Record<string, number>; top: number };

/**
 * Intent:  Root owner of which card is selected and which card is in front.
 *          Changes when selection or stacking rules change.
 * Boundary: in  — nothing. out — selected, select(slug), zIndexOf(slug).
 * State modeling: useReducer, because one action changes two dependent pieces (selected, stacking).
 *          `top` only ever grows, so a newly selected card always gets the highest order.
 * Update surface: select(slug).
 * Hidden complexity: monotonic stacking counter.
 * Composition: select is handed to useCardGestures and the Layers pane; zIndexOf to the canvas.
 * Test notes: the reducer is a pure (state, slug) -> state function.
 */
function reducer(state: State, slug: string): State {
  const top = state.top + 1;
  return { selected: slug, order: { ...state.order, [slug]: top }, top };
}

export function useCardSelection() {
  const [state, select] = useReducer(reducer, { selected: "about", order: { about: 1 }, top: 1 });
  return { selected: state.selected, select, zIndexOf: (slug: string) => state.order[slug] ?? 0 };
}
