import { ImageProps } from "next/image"
import { AvatarContainer } from "./styles"

type MakePropertyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AvatarParams = MakePropertyOptional<ImageProps, 'alt'>

export function Avatar(props: AvatarParams) {
  return (
    <AvatarContainer {...props} alt={"Profile picture"} quality={100} />
  )
}
