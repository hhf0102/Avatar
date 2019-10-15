import React, { useState, Fragment } from 'react'
import { Stage, Container } from '@inlet/react-pixi'
import { ReactReduxContext } from 'react-redux'

import Avatar from './Avatar'
import HealthBar from './HealthBar'
import { userListAWithSorted, userListBWithSorted } from './userList'
import ContextBridge from './ContextBridge'

const options = {
  width: 1500,
  height: 450,
  transparent: false,
}

const AvatarRoom = () => {
  const avatarAmountListA = 25
  const avatarAmountListB = 25
  const avatarListARow = 5
  const avatarListACol = 5
  const avatarOffsetX = 75
  const avatarOffsetY = 75
  const avatarListAPosition = [0, 0]
  const avatarListBPosition = [0, 0]
  const avatarListA = [...Array(avatarAmountListA)]
  const avatarListB = [...Array(avatarAmountListB)]
  const avatarListOffsetY = 100

  const avatarListAAvatarX = idx => avatarOffsetX * avatarListACol - avatarOffsetX * Math.floor(idx / avatarListARow)
  const avatarListAAvatarY = idx => avatarListOffsetY + avatarOffsetY * (idx % avatarListACol)

  const avatarListBAvatarX = idx => options.width - avatarListAAvatarX(idx)
  const avatarListBAvatarY = idx => avatarListAAvatarY(idx)

  const healthHeight = 20
  const healthBarAPosition = { x: 70, y: 20 }
  const healthBarBPosition = { x: options.width - 75, y: healthHeight + 20 }

  const [gameOverA, setGameOverA] = useState(false)
  const [gameOverB, setGameOverB] = useState(false)

  const commonProps = {
    avatarOffsetX,
    avatarOffsetY,
    avatarListARow,
    avatarListACol,
    options,
    avatarListOffsetY,
  }

  return (
    <ContextBridge Context={ReactReduxContext} render={children => (<Stage options={options}>{children}</Stage>)}>
      <Fragment>
        <HealthBar position={healthBarAPosition} healthHeight={healthHeight} setGameOverState={setGameOverA} />
        <Container position={avatarListAPosition} alpha={gameOverA ? 0.5 : 1}>
          {avatarListA.map((avatar, idx) => (
            <Avatar
              key={idx}
              index={idx}
              avatarIcon={userListAWithSorted[idx].avatar}
              avatarX={avatarListAAvatarX(idx)}
              avatarY={avatarListAAvatarY(idx)}
              gameOverA={gameOverA}
              gameOverB={gameOverB}
              {...commonProps}
            />
          ))}
        </Container>
      </Fragment>
      <Fragment>
        <HealthBar
          position={healthBarBPosition}
          healthHeight={healthHeight}
          angle={180}
          setGameOverState={setGameOverB}
        />
        <Container position={avatarListBPosition} alpha={gameOverB ? 0.5 : 1}>
          {avatarListB.map((avatar, idx) => (
            <Avatar
              key={idx}
              index={idx}
              avatarIcon={userListBWithSorted[idx].avatar}
              avatarX={avatarListBAvatarX(idx)}
              avatarY={avatarListBAvatarY(idx)}
              gameOverA={gameOverA}
              gameOverB={gameOverB}
              {...commonProps}
            />
          ))}
        </Container>
      </Fragment>
    </ContextBridge>
  )
}

export default AvatarRoom
