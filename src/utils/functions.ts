import User from "../models/User"
import kleur from "kleur"

export const checkProfile = async function (user, bot = null) {
  let users = await User.find({
    user: user
  }).exec()
  if (users.length > 0) {
    return
  } else {
    let u = new User({
      user: user,
      summoningEyes: 0,
      zealotsKilled: 0,
      zealuck: 0,
      endermanPetLevel: 0
    })
    u.save()
    console.log(`Created a profile for ${kleur.green(user)}.`)
  }
}

export function isEventOccurring(chance: number): boolean {
  const randomNumber = Math.floor(Math.random() * chance);
  return randomNumber === 0;
}