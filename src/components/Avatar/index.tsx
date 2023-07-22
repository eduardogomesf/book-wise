import { ImageProps } from "next/image"
import { AvatarContainer } from "./styles"

type AvatarParams = ImageProps

export function Avatar(props: AvatarParams) {
  return (
    <AvatarContainer {...props} quality={100} />
  )
}
