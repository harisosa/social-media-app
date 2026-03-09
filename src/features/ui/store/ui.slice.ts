import { DialogPanelSize } from "@/components/ui/dialog-panel"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type OverlayType =
  | "post-detail"
  | "likes"
  | "followers"
  | "following"
  | null

type OverlayPayload = Record<string, unknown> | null

type UiState = {
  activeMeTab: "feed" | "explore"
  overlay: {
    type: OverlayType
    payload: OverlayPayload
    isOpen: boolean
    size: DialogPanelSize
  }
}

const initialState: UiState = {
  activeMeTab: "feed",
  overlay: {
    type: null,
    payload: null,
    isOpen: false,
    size: 'lg',
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveMeTab: (state, action: PayloadAction<UiState["activeMeTab"]>) => {
      state.activeMeTab = action.payload
    },

    openOverlay: (
      state,
      action: PayloadAction<{
        type: Exclude<OverlayType, null>
        payload?: OverlayPayload,
        size: DialogPanelSize
      }>
    ) => {
      state.overlay.type = action.payload.type
      state.overlay.payload = action.payload.payload ?? null
      state.overlay.isOpen = true
      state.overlay.size = action.payload.size
    },

    closeOverlay: (state) => {
      state.overlay.type = null
      state.overlay.payload = null
      state.overlay.isOpen = false
    },
  },
})

export const { setActiveMeTab, openOverlay, closeOverlay } = uiSlice.actions

export default uiSlice.reducer