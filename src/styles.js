import { StyleSheet } from 'react-native'

export const PRIMARY_COLOR = '#3D6F8C' // FIXME: Primary color

export const BACKGROUND_GRADIENT_1 = 'rgb(219,226,133)'
export const BACKGROUND_GRADIENT_2 = 'rgb(61,111,140)'
export const LINEAR_GRADIENT_BACKGROUND = [
  'rgb(219,226,133)',
  'rgb(61,111,140)',
]
export const DELETE_BACKGROUND_COLOR = '#c03314'
export const ITEM_BACKGROUND_COLOR = '#FFFFFF99'
export const ITEM_BORDER_COLOR = '#FFFFFF55'
export const ITEM_BORDER_WIDTH = 0
export const ITEM_BORDER_BOTTOM_WIDTH = 1
export const ITEM_MARGIN = 10
export const BORDER_RADIUS = 15

export const CARD_MODE = 'contained'

export const PRIMARY_TEXT_COLOR = '#ffffff' // FIXME: Primary text color
export const SECONDARY_COLOR = '#5eaad6' // FIXME: Secondary color
export const SECONDARY_TEXT_COLOR = '#294D62' // FIXME: Secondary text color
export const INACTIVE_COLOR = 'gray' // FIXME: Inactive color
export const PRIMARY_BUTTON_COLOR = '#2D6981' // FIXME: Card button color
export const BACKGROUNG_FORMS = '#D9D9D9' // FIXME: Background FORMS

export const NAVIGATION_SCHEDULES_TAB_ICON = 'ios-calendar'
export const NAVIGATION_CARDS_TAB_ICON = 'folder'

export const SUCCESS_BANNER_BACKGROUND = 'green'
export const SUCCESS_BANNER_ICON = 'check-bold'
export const SUCCESS_BANNER_ELEVATION = '4'

export const STYLES = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingTop: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: ITEM_BACKGROUND_COLOR,
    borderColor: ITEM_BORDER_COLOR,
    borderWidth: ITEM_BORDER_WIDTH,
    borderBottomWidth: ITEM_BORDER_BOTTOM_WIDTH,
    marginBottom: ITEM_MARGIN,
  },
  card: {
    backgroundColor: ITEM_BACKGROUND_COLOR,
    borderColor: ITEM_BORDER_COLOR,
    borderWidth: ITEM_BORDER_WIDTH,
    borderBottomWidth: ITEM_BORDER_BOTTOM_WIDTH,
    marginLeft: ITEM_MARGIN,
    marginRight: ITEM_MARGIN,
    marginBottom: ITEM_MARGIN,
    borderRadius: BORDER_RADIUS,
    actions: {
      paddingTop: 0,
      marginBottom: 5,
    },
  },
  button: {
    borderRadius: BORDER_RADIUS,
  },
  divider: {
    height: 1,
    margin: 15,
  },
  form: {
    padding: 10,
  },
})

export const THEMES = {
  divider: {
    colors: { outlineVariant: '#bbb' },
  },
}
