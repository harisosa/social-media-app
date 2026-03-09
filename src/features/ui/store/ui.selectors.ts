import { RootState } from "@/lib/store"


export const selectActiveMeTab = (state: RootState) =>
  state.ui.activeMeTab

export const selectOverlayType = (state: RootState) =>
  state.ui.overlay.type

export const selectOverlayPayload = (state: RootState) =>
  state.ui.overlay.payload

export const selectOverlayIsOpen = (state: RootState) =>
  state.ui.overlay.isOpen

export const selectOverlayIsSize = (state: RootState) =>
  state.ui.overlay.size