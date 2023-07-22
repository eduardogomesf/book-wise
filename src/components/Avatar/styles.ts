import Image from "next/image";
import { styled } from "../../styles";

export const AvatarContainer = styled(Image, {
  borderRadius: '$full',

  border: '1px solid $gradient-vertical',
})
