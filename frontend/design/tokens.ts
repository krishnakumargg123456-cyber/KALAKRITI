import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { shadows } from "./shadows";
import { borders } from "./borders";
import { radii } from "./radii";
import { animations } from "./animations";
import { breakpoints } from "./breakpoints";

export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
  borders,
  radii,
  animations,
  breakpoints,
} as const;

export default tokens;
