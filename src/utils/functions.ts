import User from "../models/User"
import { yellow, green, reset } from "kleur"

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
      zealotsSinceLastEye: 0, 
      endermanPetLevel: 0
    })
    await u.save()
    console.log(green("✓"), reset(`Created a profile for ${yellow(user)}.`))
  }
}

export function isEventOccurring(chance: number): boolean {
  const randomNumber = Math.floor(Math.random() * chance);
  return randomNumber === 0;
}