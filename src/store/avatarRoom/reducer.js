import { handleActions } from 'redux-actions'

import { setTargetPosition, setMyPosition, setTargetReset, setTeamAHP, setTeamBHP, setGameOver } from './action'

export const namespace = 'avatarRoom'

export const defaultState = {
  gameOver: false,
  teamAHp: 10000,
  teamBHp: 10000,
  myPositionA: [],
  myPositionB: [],
  targetPositionListA: {
    avatar0: { isHit: false },
    avatar1: { isHit: false },
    avatar2: { isHit: false },
    avatar3: { isHit: false },
    avatar4: { isHit: false },
    avatar5: { isHit: false },
    avatar6: { isHit: false },
    avatar7: { isHit: false },
    avatar8: { isHit: false },
    avatar9: { isHit: false },
    avatar10: { isHit: false },
    avatar11: { isHit: false },
    avatar12: { isHit: false },
    avatar13: { isHit: false },
    avatar14: { isHit: false },
    avatar15: { isHit: false },
    avatar16: { isHit: false },
    avatar17: { isHit: false },
    avatar18: { isHit: false },
    avatar19: { isHit: false },
    avatar20: { isHit: false },
    avatar21: { isHit: false },
    avatar22: { isHit: false },
    avatar23: { isHit: false },
    avatar24: { isHit: false },
  },
  targetPositionListB: {
    avatar0: { isHit: false },
    avatar1: { isHit: false },
    avatar2: { isHit: false },
    avatar3: { isHit: false },
    avatar4: { isHit: false },
    avatar5: { isHit: false },
    avatar6: { isHit: false },
    avatar7: { isHit: false },
    avatar8: { isHit: false },
    avatar9: { isHit: false },
    avatar10: { isHit: false },
    avatar11: { isHit: false },
    avatar12: { isHit: false },
    avatar13: { isHit: false },
    avatar14: { isHit: false },
    avatar15: { isHit: false },
    avatar16: { isHit: false },
    avatar17: { isHit: false },
    avatar18: { isHit: false },
    avatar19: { isHit: false },
    avatar20: { isHit: false },
    avatar21: { isHit: false },
    avatar22: { isHit: false },
    avatar23: { isHit: false },
    avatar24: { isHit: false },
  },
}

export default handleActions(
  {
    [setTargetPosition]: (state, action) => {
      const { targetPosition } = action.payload

      const index = targetPosition[0] < 600 ?
        state.myPositionA.findIndex(
          position => position[0] === targetPosition[0] && position[1] === targetPosition[1]
        ) :
        state.myPositionB.findIndex(position => position[0] === targetPosition[0] && position[1] === targetPosition[1])

      if (targetPosition[0] < 600) {
        return { ...state, targetPositionListA: { ...state.targetPositionListA, [`avatar${index}`]: { isHit: true } } }
      } else {
        return { ...state, targetPositionListB: { ...state.targetPositionListB, [`avatar${index}`]: { isHit: true } } }
      }
    },
    [setMyPosition]: (state, action) => {
      const { position, index } = action.payload
      if (position[0] < 600) {
        return { ...state, myPositionA: [...state.myPositionA, position] }
      } else {
        return { ...state, myPositionB: [...state.myPositionB, position] }
      }
    },
    [setTargetReset]: (state, action) => {
      const { position, index } = action.payload
      if (position[0] < 600) {
        return { ...state, targetPositionListA: { ...state.targetPositionListA, [`avatar${index}`]: { isHit: false } } }
      } else {
        return { ...state, targetPositionListB: { ...state.targetPositionListB, [`avatar${index}`]: { isHit: false } } }
      }
    },
    [setTeamAHP]: (state, action) => {
      const { hp } = action.payload
      return {
        ...state,
        teamAHp: state.teamAHp > 0 ? state.teamAHp - hp : 0,
      }
    },
    [setTeamBHP]: (state, action) => {
      const { hp } = action.payload
      return {
        ...state,
        teamBHp: state.teamBHp > 0 ? state.teamBHp - hp : 0,
      }
    },
    [setGameOver]: state => ({
      ...state,
      gameOver: true,
    }),
  },
  defaultState
)
