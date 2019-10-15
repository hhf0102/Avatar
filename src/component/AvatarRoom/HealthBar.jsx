import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Graphics, Text } from '@inlet/react-pixi'
import { TextStyle } from 'pixi.js'
import { useSelector, useDispatch } from 'react-redux'

import { getTeamAHp, getTeamBHp } from '../../store/avatarRoom/selector'
import { setGameOver } from '../../store/avatarRoom/action'

const textStyle = new TextStyle({
  fill: 'white',
  fontSize: 12,
})

const HealthBar = ({ position, healthHeight, angle = 0, setGameOverState }) => {
  const dispatch = useDispatch()

  const hp = useSelector(position.x < 750 ? getTeamAHp : getTeamBHp)
  const totalHp = 10000
  const healthInnerWidth = 280
  const healthOuterWidth = (hp / totalHp) * healthInnerWidth
  const textHp = `${hp} / ${totalHp}`

  const drawCbInner = (g) => {
    g.beginFill(0x800000)
    g.drawRect(0, 0, healthInnerWidth, healthHeight)
    g.endFill()
  }

  const drawCbOuter = (g) => {
    g.clear()
    g.beginFill(0xff0000)
    g.drawRect(0, 0, healthOuterWidth, healthHeight)
    g.endFill()
  }

  const commonProps = {
    x: position.x,
    y: position.y,
    angle,
  }

  const textPosition = angle === 180
    ? { x: commonProps.x - healthInnerWidth / 2, y: commonProps.y - healthHeight / 2 }
    : { x: commonProps.x + healthInnerWidth / 2, y: commonProps.y + healthHeight / 2 }


  useEffect(() => {
    if (hp === 0) {
      setGameOverState(true)
      dispatch(setGameOver())
    }
  }, [hp])

  return (
    <Fragment>
      <Graphics draw={drawCbInner} {...commonProps} />
      <Graphics draw={drawCbOuter} {...commonProps} />
      <Text text={textHp} anchor={0.5} style={textStyle} x={textPosition.x} y={textPosition.y} />
    </Fragment>
  )
}

HealthBar.propTypes = {
  position: PropTypes.object,
  healthHeight: PropTypes.number,
  angle: PropTypes.number,
  setGameOverState: PropTypes.func,
}

export default HealthBar
