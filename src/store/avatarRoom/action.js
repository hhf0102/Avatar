import { createActions } from 'redux-actions'

export const {
  setTargetPosition,
  setMyPosition,
  setTargetReset,
  setTeamAHP,
  setTeamBHP,
  setGameOver,
} = createActions(
  {
    SET_TARGET_POSITION: targetPosition => ({
      targetPosition,
    }),
    SET_MY_POSITION: (position, index) => ({
      position,
      index,
    }),
    SET_TARGET_RESET: (position, index) => ({
      position,
      index,
    }),
    SET_TEAM_A_H_P: hp => ({
      hp,
    }),
    SET_TEAM_B_H_P: hp => ({
      hp,
    }),
  },
  'SET_GAME_OVER'
)

export default {}
