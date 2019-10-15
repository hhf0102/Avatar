import React, { useEffect, useRef, createRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Sprite, useApp } from '@inlet/react-pixi'
import { useDispatch, useSelector } from 'react-redux'

import {
  setTargetPosition,
  setMyPosition,
  setTargetReset,
  setTeamAHP,
  setTeamBHP,
} from '../../store/avatarRoom/action'
import pokeball from './images/pokeball.svg'
import { getTeamAAvatarIsHit, getTeamBAvatarIsHit } from '../../store/avatarRoom/selector'

const Avatar = ({
  index,
  avatarX,
  avatarY,
  avatarOffsetX,
  avatarOffsetY,
  avatarListARow,
  avatarListACol,
  options,
  avatarListOffsetY,
  avatarIcon,
  gameOverA,
  gameOverB,
}) => {
  const app = useApp()
  const dispatch = useDispatch()
  const actionDisabled = useRef(false)
  let targetAvatarPosition = []
  let shakeRate = 1

  const avatarWidth = 50
  const avatarHeight = 50
  const avatarRef = useRef([...Array(index + 1)].map(() => createRef()))
  const randomAngle = Math.round(Math.random() * 20 - 10)
  const isHit = useSelector(avatarX < options.width / 2 ? getTeamAAvatarIsHit(index) : getTeamBAvatarIsHit(index))

  const stuffWidth = 15
  const stuffHeight = 15
  const stuffRef = useRef([...Array(index + 1)].map(() => createRef()))

  const gameOverARef = useRef()
  const gameOverBRef = useRef()
  gameOverARef.current = gameOverA
  gameOverBRef.current = gameOverB

  const currentAvatarPosition = [avatarX, avatarY]

  const shake = idx => () => {
    const currentAvatar = avatarRef.current[idx].current
    currentAvatar.angle += shakeRate
    if (currentAvatar.angle > 15 || currentAvatar.angle < -15) {
      shakeRate *= -1
    }
  }

  const handleAction = idx => () => {
    actionDisabled.current = true
    const currentAvatar = avatarRef.current[idx].current
    const currentStuff = stuffRef.current[idx].current
    const stuffX = currentStuff.x
    const stuffY = currentStuff.y
    const jumpHeight = currentAvatar.y - 60
    currentAvatar.vy = 5
    currentStuff.alpha = 1

    if (currentAvatar.x > options.width / 2) {
      targetAvatarPosition = [
        avatarOffsetX * Math.floor(Math.random() * avatarListACol + 1),
        avatarListOffsetY + avatarOffsetY * Math.floor(Math.random() * avatarListARow),
      ]
    } else {
      targetAvatarPosition = [
        options.width - avatarOffsetX * Math.floor(Math.random() * avatarListACol + 1),
        avatarListOffsetY + avatarOffsetY * Math.floor(Math.random() * avatarListARow),
      ]
    }

    const jump = () => {
      currentAvatar.y -= currentAvatar.vy
      if (currentAvatar.y < jumpHeight) {
        currentAvatar.vy *= -1
      }
      if (currentAvatar.y >= avatarY) {
        currentAvatar.vy = 0
        currentAvatar.y = avatarY
        app.ticker.remove(jump)
      }
    }

    const shoot = (current, target) => () => {
      const damage = 100

      const stopShooting = () => {
        currentStuff.vx = 0
        currentStuff.vy = 0
        app.ticker.remove(shootWithParameter)
      }

      const reset = () => {
        currentStuff.x = stuffX
        currentStuff.y = stuffY
        currentStuff.alpha = 0
      }

      const isStuffArrived = (currentStuff.vx > 0 && currentStuff.x > targetAvatarPosition[0])
      || (currentStuff.vx < 0 && currentStuff.x < targetAvatarPosition[0])

      if (isStuffArrived) {
        actionDisabled.current = false
        dispatch(targetAvatarPosition[0] > options.width / 2 ? setTeamBHP(damage) : setTeamAHP(damage))
        dispatch(setTargetPosition(targetAvatarPosition))
        stopShooting()
        reset()
      }

      currentStuff.vx = (target[0] - current[0]) / 100
      currentStuff.vy = (target[1] - current[1]) / 100

      currentStuff.x += currentStuff.vx
      currentStuff.y += currentStuff.vy
    }

    app.ticker.add(jump)
    const shootWithParameter = shoot(currentAvatarPosition, targetAvatarPosition)
    app.ticker.add(shootWithParameter)
  }

  useEffect(() => {
    dispatch(setMyPosition(currentAvatarPosition, index))
    app.ticker.add(shake(index))
    setInterval(() => {
      if (!actionDisabled.current && !isHit && !(gameOverARef.current || gameOverBRef.current)) {
        handleAction(index)()
      }
    }, Math.floor(Math.random() * 60000 + 1000))
  }, [])

  useEffect(() => {
    const currentAvatar = avatarRef.current[index].current
    if (isHit) {
      if (currentAvatar.x < options.width / 2) {
        currentAvatar.angle = -90
      } else {
        currentAvatar.angle = 90
      }
      setTimeout(() => {
        dispatch(setTargetReset([avatarX, avatarY], index))
      }, 1000)
    }
  }, [isHit])

  return (
    <Fragment>
      <Sprite
        image={avatarIcon}
        width={avatarWidth}
        height={avatarHeight}
        anchor={0.5}
        angle={randomAngle}
        x={avatarX}
        y={avatarY}
        ref={avatarRef.current[index]}
      />
      <Sprite
        image={pokeball}
        width={stuffWidth}
        height={stuffHeight}
        anchor={0.5}
        alpha={0}
        x={avatarX}
        y={avatarY}
        ref={stuffRef.current[index]}
      />
    </Fragment>
  )
}

Avatar.propTypes = {
  index: PropTypes.number,
  avatarX: PropTypes.number,
  avatarY: PropTypes.number,
  avatarOffsetX: PropTypes.number,
  avatarOffsetY: PropTypes.number,
  avatarListARow: PropTypes.number,
  avatarListACol: PropTypes.number,
  options: PropTypes.object,
  avatarListOffsetY: PropTypes.number,
  avatarIcon: PropTypes.string,
  gameOverA: PropTypes.bool,
  gameOverB: PropTypes.bool,
}

export default Avatar

