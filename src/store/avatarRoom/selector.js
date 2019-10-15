import { namespace } from './reducer'

const getTargetPosition = state => state.targetPosition

const getTeamAHp = state => state.teamAHp
const getTeamBHp = state => state.teamBHp

const getGameOver = state => state.gameOver

const getTeamAAvatarIsHit = index => state => state.targetPositionListA[`avatar${index}`].isHit
const getTeamBAvatarIsHit = index => state => state.targetPositionListB[`avatar${index}`].isHit

export {
  getTargetPosition,
  getTeamAHp,
  getTeamBHp,
  getGameOver,
  getTeamAAvatarIsHit,
  getTeamBAvatarIsHit,
}
