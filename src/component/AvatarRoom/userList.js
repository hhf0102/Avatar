import pikachu from './images/pikachu.svg'
import bulbasaur from './images/bulbasaur.svg'
import squirtle from './images/squirtle.svg'
import eevee from './images/eevee.svg'
import gengar from './images/gengar.svg'
import charmander from './images/charmander.svg'
import jigglypuff from './images/jigglypuff.svg'
import meowth from './images/meowth.svg'

const iconList = [pikachu, bulbasaur, squirtle, eevee, gengar, charmander, jigglypuff, meowth]

const generateUserList = () => {
  const userList = [...Array(100)].map((user, idx) => ({
    user: idx,
    avatar: iconList[Math.floor(Math.random() * iconList.length)],
    gift: Math.floor(Math.random() * 1000),
  }))
  return userList
}

const userListAWithSorted = generateUserList().sort((a, b) => b.gift - a.gift)
const userListBWithSorted = generateUserList().sort((a, b) => b.gift - a.gift)

export { userListAWithSorted, userListBWithSorted }
