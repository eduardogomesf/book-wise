import { Star } from "phosphor-react";
import { RatingBox } from "./styles";

type RatingProps = {
  rate: number;
}

export function Rating({ rate }: RatingProps) {
  return (
    <RatingBox>
      {
        Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={16} weight={(index + 1) <= rate ? "fill" : "regular"} />
        ))
      }
    </RatingBox>
  )
}
