import User from "../models/User"
import { yellow, green, reset } from "kleur"

export const getTopSummoningEyes = async function () {
  let users = await User.find().exec()
  users.forEach(async user => {
    if (!user.totalEyes) user.totalEyes = user.summoningEyes
    await user.save()
  })
  users.sort(function (a, b) { return (b.totalEyes as number) - (a.totalEyes as number) })
  return users
}

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
      zealuckLevel: 0,
      totalEyes: 0,
      zealotsSinceLastEye: 0, 
      endermanPetLevel: 0,
    })
    await u.save()
    console.log(green("✓"), reset(`Created a profile for ${yellow(user)}.`))
  }
}

export function isEventOccurring(chance: number): boolean {
  const randomNumber = Math.floor(Math.random() * chance);
  return randomNumber === 0;
}